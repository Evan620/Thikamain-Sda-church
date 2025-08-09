import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

    const { messageId } = req.body || {}
    if (!messageId) return res.status(400).json({ ok: false, error: 'messageId required' })

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) return res.status(500).json({ ok: false, error: 'Missing Supabase env vars' })

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

    // Fetch message row
    const { data: msg, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', messageId)
      .single()
    if (error || !msg) return res.status(404).json({ ok: false, error: error?.message || 'Message not found' })

    // Compose email for leader
    const subject = `New Contact Form Message - ${msg.subject}`
    const text = `Hello ${msg.recipient_name},\n\n` +
      `You have received a new message through the church website contact form.\n\n` +
      `From: ${msg.sender_name} <${msg.sender_email}>\n` +
      (msg.sender_phone ? `Phone: ${msg.sender_phone}\n` : '') +
      (msg.department ? `Department: ${msg.department}\n` : '') +
      `\nMessage:\n${msg.message}\n\n` +
      `Please reply directly to ${msg.sender_email}.`

    const html = `<!DOCTYPE html><html><body>` +
      `<p>Hello <strong>${msg.recipient_name}</strong>,</p>` +
      `<p>You have received a new message through the church website contact form.</p>` +
      `<div style="background:#f9f9f9;padding:12px;border-left:4px solid #2d5a27;">` +
      `<p><strong>From:</strong> ${msg.sender_name} &lt;${msg.sender_email}&gt;</p>` +
      (msg.sender_phone ? `<p><strong>Phone:</strong> ${msg.sender_phone}</p>` : '') +
      (msg.department ? `<p><strong>Department:</strong> ${msg.department}</p>` : '') +
      `</div>` +
      `<div style="background:#fff;padding:12px;border:1px solid #eee;margin-top:12px;">` +
      `<p style="white-space:pre-wrap;">${msg.message}</p>` +
      `</div>` +
      `<p style="font-size:0.9em;color:#555">Please reply directly to <a href="mailto:${msg.sender_email}">${msg.sender_email}</a>.</p>` +
      `</body></html>`

    // Send via Gmail SMTP
    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASSWORD
    if (!user || !pass) return res.status(500).json({ ok: false, error: 'Missing Gmail SMTP env vars' })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    })

    try {
      // Send to leader
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL || user,
        to: msg.recipient_email,
        replyTo: `${msg.sender_name} <${msg.sender_email}>`,
        subject,
        text,
        html
      })

      // Optional: auto-acknowledgement to sender
      if (msg.sender_email) {
        const ackSubject = 'We received your message'
        const ackText = `Hello ${msg.sender_name},\n\nThank you for reaching out to ${msg.recipient_name} (${msg.recipient_role}). Your message has been received, and we will get back to you as soon as possible.\n\nSubject: ${msg.subject}\n\n-- Thika Main SDA Church`
        const ackHtml = `<!DOCTYPE html><html><body>` +
          `<p>Hello <strong>${msg.sender_name}</strong>,</p>` +
          `<p>Thank you for reaching out to <strong>${msg.recipient_name}</strong> (${msg.recipient_role}). Your message has been received, and we will get back to you as soon as possible.</p>` +
          `<p><strong>Subject:</strong> ${msg.subject}</p>` +
          `<p style=\"margin-top:16px;color:#555;font-size:0.9em\">-- Thika Main SDA Church</p>` +
          `</body></html>`
        try {
          await transporter.sendMail({
            from: process.env.FROM_EMAIL || user,
            to: msg.sender_email,
            subject: ackSubject,
            text: ackText,
            html: ackHtml
          })
        } catch (_) {
          // Ack failures are non-fatal
        }
      }

      await supabase
        .from('messages')
        .update({ status: 'sent', email_sent_at: new Date().toISOString(), email_error: null })
        .eq('id', messageId)

      return res.status(200).json({ ok: true, messageId: info.messageId })
    } catch (sendErr) {
      await supabase
        .from('messages')
        .update({ status: 'failed', email_error: String(sendErr) })
        .eq('id', messageId)

      return res.status(500).json({ ok: false, error: sendErr?.message || 'Send failed' })
    }
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || 'Unexpected error' })
  }
}

