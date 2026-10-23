'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, LayoutGrid, X, ArrowUp } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'
import { profile } from '@/data'
import { navLinks } from './navLinks'

const small =
  'w-11 h-11 rounded-full bg-surface text-ink-900 border border-border flex items-center justify-center shadow-md shadow-navy/10 hover:border-accent hover:text-accent-dark transition-colors'

/**
 * Bottom-right stack on every page:
 * - a "pages" button opening a quick menu of every page (plus GitHub,
 *   LinkedIn and back-to-top) — the main way around the site on a phone;
 * - GitHub and LinkedIn as their own buttons from sm up (inside the menu on phones);
 * - the round navy "contact me" button (left out on /contact itself).
 */
export default function FloatingActions() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const rootRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close on navigation (incl. back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  // While open: Escape closes and returns focus; a click outside closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <nav
      ref={rootRef}
      aria-label="Quick links"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3"
    >
      {open && (
        <div
          id="quick-pages"
          className="enter w-56 rounded-doc border border-border bg-surface shadow-xl shadow-navy/15 overflow-hidden"
        >
          <p className="px-4 pt-3 pb-2 text-[10px] font-sans uppercase tracking-[.16em] text-accent-dark">Go to</p>
          <ul>
            {navLinks.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center px-4 py-2.5 text-[13.5px] font-sans border-l-2 ${
                      active
                        ? 'border-accent bg-cream-100 text-ink-900 font-semibold'
                        : 'border-transparent text-ink-700 hover:bg-cream-100 hover:text-ink-900'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="flex items-center gap-1 border-t border-border px-2 py-2">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-doc text-[12px] font-sans text-ink-700 hover:bg-cream-100">
              <GithubGlyph size={14} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-doc text-[12px] font-sans text-ink-700 hover:bg-cream-100">
              <LinkedinGlyph size={14} /> LinkedIn
            </a>
            <button
              type="button"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false) }}
              aria-label="Back to top"
              title="Back to top"
              className="w-9 flex items-center justify-center py-2 rounded-doc text-ink-700 hover:bg-cream-100"
            >
              <ArrowUp size={14} aria-hidden />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="quick-pages"
          aria-label={open ? 'Close page menu' : 'Open page menu'}
          title="Pages"
          className={`${small} ${open ? 'border-accent text-accent-dark' : ''}`}
        >
          {open ? <X size={18} aria-hidden /> : <LayoutGrid size={18} aria-hidden />}
        </button>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className={`${small} hidden sm:flex`}>
          <GithubGlyph size={18} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className={`${small} hidden sm:flex`}>
          <LinkedinGlyph size={18} />
        </a>
        {pathname !== '/contact' && (
          <Link
            href="/contact"
            aria-label="Contact me"
            title="Contact me"
            className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-navy/25 hover:bg-primary-hover transition-colors"
          >
            <Mail size={20} aria-hidden />
          </Link>
        )}
      </div>
    </nav>
  )
}
