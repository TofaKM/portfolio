/**
 * Small in-memory rate limiter for the contact form.
 *
 * On Vercel each server instance has its own memory, so these limits apply
 * per instance — a cheap first layer that stops a single script hammering a
 * warm instance. The Vercel Firewall rate-limit rule (see README) is the
 * layer that holds across every instance.
 */

interface Window { count: number; resetAt: number }

const buckets = new Map<string, Window>()

/** Count one hit against `key`; false when the limit for the window is used up. */
function hit(key: string, limit: number, windowMs: number, now: number): { ok: boolean; retryAfter: number } {
  const w = buckets.get(key)
  if (!w || w.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }
  if (w.count >= limit) return { ok: false, retryAfter: Math.ceil((w.resetAt - now) / 1000) }
  w.count++
  return { ok: true, retryAfter: 0 }
}

/** Drop expired windows so the map can't grow without bound. */
function sweep(now: number) {
  if (buckets.size < 500) return
  for (const [k, w] of buckets) if (w.resetAt <= now) buckets.delete(k)
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE

export const CONTACT_LIMITS = {
  perIpShort: { limit: 3, windowMs: 10 * MINUTE },
  perIpDay:   { limit: 10, windowMs: 24 * HOUR },
  // Gmail allows roughly 500 sends a day; keep well under it.
  global:     { limit: 40, windowMs: HOUR },
} as const

/** Apply all contact-form limits for one request. */
export function checkContactRate(ip: string, now = Date.now()): { ok: true } | { ok: false; retryAfter: number } {
  sweep(now)
  const { perIpShort, perIpDay, global } = CONTACT_LIMITS
  for (const [key, l] of [
    [`ip10m:${ip}`, perIpShort],
    [`ipday:${ip}`, perIpDay],
    ['global', global],
  ] as const) {
    const r = hit(key, l.limit, l.windowMs, now)
    if (!r.ok) return { ok: false, retryAfter: r.retryAfter }
  }
  return { ok: true }
}

/** Client IP as seen by Vercel's proxy (first x-forwarded-for hop). */
export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0].trim() || headers.get('x-real-ip') || 'unknown'
}
