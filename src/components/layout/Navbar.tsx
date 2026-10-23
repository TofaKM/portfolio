'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'
import { profile } from '@/data'
import { navLinks } from './navLinks'

/** White tile with a navy serif monogram — reads on the navy bar. */
function Monogram() {
  return (
    <span
      aria-hidden
      className="relative w-8 h-8 rounded-doc bg-white flex items-center justify-center shrink-0"
    >
      <span className="font-serif font-bold text-[13px] text-navy tracking-[-0.06em] -mt-0.5">TM</span>
      <span className="absolute bottom-[6px] left-[9px] right-[9px] h-px bg-accent" />
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu on any navigation (incl. back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  // Mobile menu: move focus into it on open; Escape closes and returns focus.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-navy text-white border-b border-white/10">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-white focus:text-navy focus:px-3 focus:py-1.5 focus:rounded-doc text-[13px] font-sans"
      >
        Skip to content
      </a>

      <div className="px-5 md:px-10">
      <div className="max-w-6xl mx-auto h-[var(--nav-h)] flex items-center gap-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${profile.name} — home`}>
          <Monogram />
          <span className="font-serif font-semibold text-[16px] leading-none">{profile.shortName}</span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden lg:flex items-stretch self-stretch">
          <ul className="flex items-stretch">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href} className="flex">
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex items-center px-3 text-[13.5px] font-sans transition-colors ${
                      active ? 'text-white font-semibold' : 'text-[#B7C4D2] hover:text-white'
                    }`}
                  >
                    {label}
                    {active && <span aria-hidden className="absolute left-3 right-3 bottom-0 h-[2px] bg-accent" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-doc border border-white/60 text-[11px] font-sans text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" aria-hidden />
            Open to work
          </span>
          {[
            { href: profile.github,   label: 'GitHub',   Icon: GithubGlyph },
            { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedinGlyph },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hidden sm:flex w-8 h-8 rounded-doc border border-white/20 items-center justify-center text-[#B7C4D2] hover:text-white hover:border-white/50 transition-colors"
            >
              <Icon size={15} />
            </a>
          ))}

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(o => !o)}
            className="lg:hidden w-9 h-9 -mr-1.5 flex items-center justify-center rounded-doc hover:bg-white/[0.08]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu — drops down under the bar */}
      {open && (
        <div
          ref={panelRef}
          id="mobile-nav"
          className="lg:hidden absolute top-full left-0 right-0 bg-navy border-t border-white/10 shadow-lg"
        >
          <nav aria-label="Primary" className="max-w-6xl mx-auto px-5 md:px-10 py-3">
            <ul>
              {navLinks.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center gap-3 py-2.5 text-[14px] font-sans border-l-2 pl-3 ${
                        active ? 'border-accent text-white font-semibold' : 'border-transparent text-[#B7C4D2] hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-[12.5px] font-sans text-[#B7C4D2]">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
              <span className="ml-auto inline-flex items-center gap-1.5 text-white text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-ok" aria-hidden /> Open to work
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
