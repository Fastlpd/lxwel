// pages/api/admin/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Password required' })

  if (password === process.env.ADMIN_PASSWORD) {
    // Simple token: base64 of secret + timestamp
    const token = Buffer.from(`${process.env.ADMIN_SECRET}:${Date.now()}`).toString('base64')
    return res.status(200).json({ success: true, token })
  }

  return res.status(401).json({ error: 'Incorrect password' })
}
