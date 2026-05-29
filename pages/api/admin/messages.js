// pages/api/admin/messages.js
// Simple message store using Vercel's edge config or in-memory
// For production: replace with Vercel KV, PlanetScale, or Supabase

// Global in-memory store (persists during Vercel function warm state)
if (!global.lxwelMessages) {
  global.lxwelMessages = []
}

export default async function handler(req, res) {
  // Verify admin token
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const token = auth.replace('Bearer ', '')
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    if (!decoded.startsWith(process.env.ADMIN_SECRET)) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }

  if (req.method === 'GET') {
    return res.status(200).json({ messages: global.lxwelMessages })
  }

  if (req.method === 'POST') {
    const msg = {
      id: Date.now(),
      ...req.body,
      date: new Date().toISOString(),
      read: false,
    }
    global.lxwelMessages.unshift(msg)
    // Keep last 200 messages
    if (global.lxwelMessages.length > 200) global.lxwelMessages = global.lxwelMessages.slice(0, 200)
    return res.status(201).json({ success: true, message: msg })
  }

  if (req.method === 'PATCH') {
    const { id } = req.body
    const msg = global.lxwelMessages.find(m => m.id === id)
    if (msg) msg.read = true
    return res.status(200).json({ success: true })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    global.lxwelMessages = global.lxwelMessages.filter(m => m.id !== id)
    return res.status(200).json({ success: true })
  }

  return res.status(405).end()
}
