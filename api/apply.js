import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, whatsapp, email, position, location, pitch, portfolio } = req.body

  if (!process.env.GOOGLE_CREDENTIALS || !process.env.SPREADSHEET_ID) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString('utf8')
    )

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
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
          name, whatsapp, email, position, location, pitch, portfolio ?? ''
        ]],
      },
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Sheets error:', err?.message || err)
    res.status(500).json({ error: err?.message || 'Failed to save application' })
  }
}
