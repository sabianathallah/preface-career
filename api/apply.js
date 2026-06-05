import { google } from 'googleapis'
import Busboy from 'busboy'
import { put } from '@vercel/blob'
import { Readable } from 'stream'

export const config = { api: { bodyParser: false } }

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

    Readable.from(req).pipe(bb)
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

    // Upload CV to Vercel Blob
    let cvUrl = ''
    if (fileBuffer && fileName) {
      const blob = await put(
        `cvs/${Date.now()}-${name}-${position}-${fileName}`,
        fileBuffer,
        { access: 'public', contentType: fileMime }
      )
      cvUrl = blob.url
    }

    // Save to Google Sheets
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

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
