'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'
import { profile } from '@/data'

const small =
  'w-11 h-11 rounded-full bg-white text-navy border border-border flex items-center justify-center shadow-md shadow-navy/10 hover:border-accent hover:text-accent-dark transition-colors'

/**
 * Bottom-right stack on every page: GitHub and LinkedIn above the round navy
 * "contact me" button. The contact button is left out on /contact itself.
 */
export default function FloatingActions() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Quick links"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-center gap-3"
    >
      <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className={small}>
        <GithubGlyph size={18} />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className={small}>
        <LinkedinGlyph size={18} />
      </a>
      {pathname !== '/contact' && (
        <Link
          href="/contact"
          aria-label="Contact me"
          title="Contact me"
          className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-lg shadow-navy/25 hover:bg-navy-2 transition-colors"
        >
          <Mail size={20} aria-hidden />
        </Link>
      )}
    </nav>
  )
}
