import Link from 'next/link'
import { socialLinks, linkTarget } from '@/components/icons/social'
import { profile } from '@/data'
import { navLinks } from './navLinks'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream-200 mt-auto px-5 md:px-10">
      <div className="max-w-6xl mx-auto py-10 flex flex-col md:flex-row gap-8 md:items-start justify-between">
        <div>
          <p className="font-serif font-semibold text-[15px] text-ink-900">{profile.name}</p>
          <p className="text-[12.5px] text-ink-500 font-sans mt-1">{profile.tagline} · {profile.location}</p>
          <div className="flex items-center gap-2 mt-4">
            {[socialLinks.github, socialLinks.linkedin, socialLinks.email].map(l => (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                {...linkTarget(l)}
                className="w-8 h-8 rounded-doc border border-border bg-surface flex items-center justify-center text-ink-500 hover:text-ink-900 hover:border-accent transition-colors"
              >
                <l.Icon size={14} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-[12.5px] font-sans text-ink-500 hover:text-ink-900">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Extra bottom space on phones so the floating buttons don't sit on the footer. */}
      <div className="max-w-6xl mx-auto pb-36 sm:pb-8">
        <p className="text-[11px] text-ink-400 font-sans">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}
