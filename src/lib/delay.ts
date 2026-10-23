import type { CSSProperties } from 'react'

/** Stagger for `.enter` / `.reveal` / `.bar-fill` (see globals.css). */
export const delay = (ms: number, extra?: CSSProperties): CSSProperties =>
  ({ '--delay': `${ms}ms`, ...extra }) as CSSProperties
