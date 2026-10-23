import { Mail, Phone, type LucideIcon } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from './BrandGlyphs'
import { profile } from '@/data'

type GlyphLike = LucideIcon | typeof GithubGlyph

export interface SocialLink {
  label: string
  href: string
  /** Display text, e.g. the username on the contact page. */
  handle: string
  Icon: GlyphLike
  external: boolean
}

/** Every way to reach Tofa — one list, used by the navbar, footer, hero, floating buttons and contact page. */
export const socialLinks = {
  github:   { label: 'GitHub',   href: profile.github,             handle: 'TofaKM',        Icon: GithubGlyph,   external: true },
  linkedin: { label: 'LinkedIn', href: profile.linkedin,           handle: 'Tofa Mwangi',   Icon: LinkedinGlyph, external: true },
  email:    { label: 'Email',    href: `mailto:${profile.email}`,  handle: profile.email,   Icon: Mail,          external: false },
  phone:    { label: 'Phone',    href: profile.phoneHref,          handle: profile.phone,   Icon: Phone,         external: false },
} satisfies Record<string, SocialLink>

/** target/rel for links that leave the site; nothing for mailto:/tel:. */
export const linkTarget = (l: SocialLink) =>
  l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
