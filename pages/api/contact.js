// pages/api/contact.js — stores messages + sends email

if (!global.lxwelMessages) global.lxwelMessages = []

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, message, type } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message required' })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email' })

  const stored = { id: Date.now(), name, email, message, type: type||'General', date: new Date().toISOString(), read: false }
  global.lxwelMessages.unshift(stored)
  if (global.lxwelMessages.length > 200) global.lxwelMessages = global.lxwelMessages.slice(0,200)

  try {
    const nodemailer = require('nodemailer')
    const t = nodemailer.createTransporter({ host: process.env.SMTP_HOST||'smtp.gmail.com', port: 587, secure: false, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
    await t.sendMail({ from: `"Lxwel" <${process.env.SMTP_USER}>`, to: process.env.CONTACT_RECEIVER, subject: `[Lxwel] New message from ${name}`, text: `Name: ${name}\nEmail: ${email}\nType: ${type||'General'}\n\n${message}` })
    await t.sendMail({ from: `"Lawrence K - Lxwel" <${process.env.SMTP_USER}>`, to: email, subject: 'Got your message — Lxwel', text: `Thank you ${name}.\n\nYour message is received. I reply within 24 hours.\n\nBundle: selar.co/lxwel — ₦7,500\n\n— Lawrence K\nlaxwellremzy50@gmail.com` })
  } catch(e) { console.error('Email error:', e) }

  return res.status(200).json({ success: true })
}
