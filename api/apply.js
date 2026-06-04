import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, whatsapp, email, position, location, pitch, portfolio } = req.body

  // debug: check env vars exist
  if (!process.env.SPREADSHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return res.status(500).json({ error: 'Missing env vars', has: {
      spreadsheet: !!process.env.SPREADSHEET_ID,
      email: !!process.env.GOOGLE_CLIENT_EMAIL,
      key: !!process.env.GOOGLE_PRIVATE_KEY,
    }})
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim(),
      },
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
