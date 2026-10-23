/**
 * Contact-form rules shared by the browser (instant feedback) and the
 * /api/contact route (the check that actually counts).
 */

export const SUBJECTS = {
  job: 'Job Opportunity',
  freelance: 'Freelance Project',
  data: 'Data Engineering / Analytics Work',
  collab: 'Collaboration',
  hi: 'Just saying hi!',
} as const

export type SubjectKey = keyof typeof SUBJECTS

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  message: { min: 10, max: 5000 },
} as const

export interface ContactInput {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()

  if (name.length < LIMITS.name.min) errors.name = 'Please enter your name.'
  else if (name.length > LIMITS.name.max) errors.name = `Keep your name under ${LIMITS.name.max} characters.`

  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email)) errors.email = 'That email address doesn’t look right.'

  if (!(input.subject in SUBJECTS)) errors.subject = 'Please choose a subject.'

  if (message.length < LIMITS.message.min) errors.message = `Please write at least ${LIMITS.message.min} characters.`
  else if (message.length > LIMITS.message.max) errors.message = `Please keep your message under ${LIMITS.message.max} characters.`

  return errors
}
