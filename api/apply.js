import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, whatsapp, email, position, location, pitch, portfolio } = req.body

  if (!process.env.SPREADSHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  try {
    const rawKey = process.env.GOOGLE_PRIVATE_KEY
    const privateKey = rawKey.replace(/\\n/g, '\n')

    console.log('key starts with:', privateKey.substring(0, 40))
    console.log('has newlines:', privateKey.includes('\n'))
    console.log('has literal \\n:', privateKey.includes('\\n'))

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
