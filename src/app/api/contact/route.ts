import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { SUBJECTS, validateContact, type ContactInput, type SubjectKey } from '@/lib/contact'
import { checkContactRate, clientIp } from '@/lib/rateLimit'

// nodemailer needs Node APIs (net/tls), not the Edge runtime.
export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16 * 1024
/** A real person can't fill in name, email, subject and message this fast. */
const MIN_FILL_MS = 3000

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** For values that end up in mail headers (Subject, Reply-To): no line breaks or control characters. */
const headerSafe = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim()

const fail = (status: number, error: string, extra?: ResponseInit['headers']) =>
  NextResponse.json({ ok: false, error }, { status, headers: extra })

export async function POST(req: Request) {
  // 1. Same-site only: browsers always send Origin on a POST from fetch().
  const origin = req.headers.get('origin')
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (!origin || !host || new URL(origin).host !== host) {
    return fail(403, 'Forbidden.')
  }

  // 2. Shape and size of the request.
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return fail(415, 'Invalid request.')
  }
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return fail(413, 'Message too large.')
  }

  // 3. Rate limit before doing any work.
  const rate = checkContactRate(clientIp(req.headers))
  if (!rate.ok) {
    const minutes = Math.max(1, Math.ceil(rate.retryAfter / 60))
    return fail(429, `Too many messages — please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`, {
      'Retry-After': String(rate.retryAfter),
    })
  }

  let body: Record<string, unknown>
  try {
    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) return fail(413, 'Message too large.')
    body = JSON.parse(raw)
  } catch {
    return fail(400, 'Invalid request.')
  }

  // 4. Bot filters. Honeypot (a field hidden from people) and fill time —
  //    pretend success so bots don't retry, but send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }
  if (typeof body.elapsed !== 'number' || body.elapsed < MIN_FILL_MS) {
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
    return fail(503, 'The contact form isn’t set up yet.')
  }

  // 5. Values used in headers are stripped of line breaks.
  const name = headerSafe(input.name)
  const email = headerSafe(input.email)
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
    return fail(502, 'Your message couldn’t be sent.')
  }

  return NextResponse.json({ ok: true })
}
