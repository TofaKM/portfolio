import { describe, expect, it } from 'vitest'
import { LIMITS, validateContact, type ContactInput } from './contact'

const valid: ContactInput = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  subject: 'job',
  message: 'Hello — I have a role you might like.',
}

describe('validateContact', () => {
  it('accepts a complete, valid message', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('flags every missing field', () => {
    const errors = validateContact({ name: '', email: '', subject: '', message: '' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'subject'])
  })

  it('trims before checking lengths', () => {
    expect(validateContact({ ...valid, name: '   J   ' }).name).toBeDefined()
    expect(validateContact({ ...valid, message: '   short   ' }).message).toBeDefined()
  })

  it.each(['plainaddress', 'a@b', 'a@b.c', 'a b@c.com', '@example.com'])('rejects the email %s', email => {
    expect(validateContact({ ...valid, email }).email).toBeDefined()
  })

  it('rejects a subject that is not one of the options', () => {
    expect(validateContact({ ...valid, subject: 'spam' }).subject).toBeDefined()
    expect(validateContact({ ...valid, subject: 'toString' }).subject).toBeDefined()
  })

  it('enforces the maximum lengths', () => {
    expect(validateContact({ ...valid, name: 'x'.repeat(LIMITS.name.max + 1) }).name).toBeDefined()
    expect(validateContact({ ...valid, message: 'x'.repeat(LIMITS.message.max + 1) }).message).toBeDefined()
    expect(validateContact({ ...valid, message: 'x'.repeat(LIMITS.message.max) })).toEqual({})
  })
})
