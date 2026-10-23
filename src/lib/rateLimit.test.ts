import { describe, expect, it } from 'vitest'
import { CONTACT_LIMITS, checkContactRate, clientIp } from './rateLimit'

// Each test uses its own IPs and a far-apart clock so buckets don't collide.
let clock = 1_000_000_000_000
const later = (ms: number) => (clock += ms)

describe('checkContactRate', () => {
  it('allows the per-IP short limit, then blocks with a retry time', () => {
    const now = later(10 * 24 * 3_600_000)
    const { limit, windowMs } = CONTACT_LIMITS.perIpShort
    for (let i = 0; i < limit; i++) expect(checkContactRate('10.0.0.1', now).ok).toBe(true)

    const blocked = checkContactRate('10.0.0.1', now)
    expect(blocked.ok).toBe(false)
    if (!blocked.ok) expect(blocked.retryAfter).toBe(windowMs / 1000)
  })

  it('opens again once the window has passed', () => {
    const now = later(10 * 24 * 3_600_000)
    const { limit, windowMs } = CONTACT_LIMITS.perIpShort
    for (let i = 0; i < limit; i++) checkContactRate('10.0.0.2', now)
    expect(checkContactRate('10.0.0.2', now).ok).toBe(false)
    expect(checkContactRate('10.0.0.2', now + windowMs + 1).ok).toBe(true)
  })

  it('keeps visitors separate', () => {
    const now = later(10 * 24 * 3_600_000)
    for (let i = 0; i < CONTACT_LIMITS.perIpShort.limit; i++) checkContactRate('10.0.0.3', now)
    expect(checkContactRate('10.0.0.3', now).ok).toBe(false)
    expect(checkContactRate('10.0.0.4', now).ok).toBe(true)
  })

  it('caps the total across all visitors', () => {
    const now = later(10 * 24 * 3_600_000)
    const { limit } = CONTACT_LIMITS.global
    for (let i = 0; i < limit; i++) expect(checkContactRate(`10.1.${i >> 8}.${i & 255}`, now).ok).toBe(true)
    expect(checkContactRate('10.2.0.1', now).ok).toBe(false)
  })
})

describe('clientIp', () => {
  it('takes the first x-forwarded-for hop', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }))).toBe('203.0.113.7')
  })
  it('falls back to x-real-ip, then "unknown"', () => {
    expect(clientIp(new Headers({ 'x-real-ip': '203.0.113.8' }))).toBe('203.0.113.8')
    expect(clientIp(new Headers())).toBe('unknown')
  })
})
