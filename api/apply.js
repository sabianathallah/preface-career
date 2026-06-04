import { google } from 'googleapis'
import Busboy from 'busboy'
import { Readable } from 'stream'

export const config = { api: { bodyParser: false } }

const FOLDER_ID = '1UKvH-zMQ7Ka5CGd60atvW_RGHT8OTiY9'

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const fields = {}
    let fileBuffer = null
    let fileName = null
    let fileMime = null

    const bb = Busboy({ headers: req.headers })

    bb.on('field', (name, val) => { fields[name] = val })

    bb.on('file', (name, stream, info) => {
      fileName = info.filename
      fileMime = info.mimeType
      const chunks = []
      stream.on('data', chunk => chunks.push(chunk))
      stream.on('end', () => { fileBuffer = Buffer.concat(chunks) })
    })

    bb.on('finish', () => resolve({ fields, fileBuffer, fileName, fileMime }))
    bb.on('error', reject)

    // pipe request stream into busboy
    const readable = Readable.from(req)
    readable.pipe(bb)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!process.env.SPREADSHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  try {
    const { fields, fileBuffer, fileName, fileMime } = await parseForm(req)
    const { name, whatsapp, email, position, location, pitch } = fields

    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    })

    // Upload CV to Google Drive
    let cvUrl = ''
    if (fileBuffer && fileName) {
      const drive = google.drive({ version: 'v3', auth })
      const uploaded = await drive.files.create({
        requestBody: {
          name: `${name} - ${position} - ${fileName}`,
          parents: [FOLDER_ID],
        },
        media: {
          mimeType: fileMime,
          body: Readable.from(fileBuffer),
        },
        fields: 'id, webViewLink',
      })

      // Make file viewable by anyone with link
      await drive.permissions.create({
        fileId: uploaded.data.id,
        requestBody: { role: 'reader', type: 'anyone' },
      })

      cvUrl = uploaded.data.webViewLink
    }

    // Append to Google Sheets
    const sheets = google.sheets({ version: 'v4', auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
          name, whatsapp, email, position, location, pitch, cvUrl
        ]],
      },
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error:', err?.message || err)
    res.status(500).json({ error: err?.message || 'Failed to save application' })
  }
}
