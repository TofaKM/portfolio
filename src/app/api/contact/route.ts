import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { SUBJECTS, validateContact, type ContactInput, type SubjectKey } from '@/lib/contact'

// nodemailer needs Node APIs (net/tls), not the Edge runtime.
export const runtime = 'nodejs'

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: a field hidden from people. Bots fill it; pretend success so
  // they don't retry, but send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const input: ContactInput = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    subject: String(body.subject ?? ''),
    message: String(body.message ?? ''),
  }
  const errors = validateContact(input)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASS
  if (!user || !pass) {
    console.error('Contact form: GMAIL_USER / GMAIL_APP_PASS are not set')
    return NextResponse.json({ ok: false, error: 'The contact form isn’t set up yet.' }, { status: 503 })
  }

  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()
  const subject = SUBJECTS[input.subject as SubjectKey]

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio contact form" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email },
      subject: `[Portfolio] ${subject} — ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    })
  } catch (err) {
    console.error('Contact form: sending failed', err)
    return NextResponse.json({ ok: false, error: 'Your message couldn’t be sent.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
