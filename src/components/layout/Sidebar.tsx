'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import {
  Home, User, Briefcase, Zap, Award,
  FileText, Mail, Menu, X, MapPin,
} from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'

const navLinks = [
  { href: '/',               label: 'Home',           icon: Home },
  { href: '/about',          label: 'About',          icon: User },
  { href: '/projects',       label: 'Projects',       icon: Briefcase },
  { href: '/skills',         label: 'Skills',         icon: Zap },
  { href: '/certifications', label: 'Certifications', icon: Award },
  { href: '/cv',             label: 'CV',             icon: FileText },
  { href: '/contact',        label: 'Contact',        icon: Mail },
]

const socials = [
  { href: 'https://github.com/TofaKM',               icon: GithubGlyph,   label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/tofa-mwangi', icon: LinkedinGlyph, label: 'LinkedIn' },
  { href: 'mailto:mwangitofa@gmail.com',              icon: Mail,     label: 'Email' },
]

/* A single, restrained fade-up for the sidebar shell — no per-icon wiggle,
   no shimmer sweep, no infinite pulsing badge. Respects reduced-motion via
   the `animate` prop check below. */
const sidebarVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function SidebarContent({ onClose, animate = true }: { onClose?: () => void; animate?: boolean }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()

  const Wrap = animate && !reduced ? motion.div : 'div'
  const wrapProps = animate && !reduced
    ? { variants: sidebarVariants, initial: 'hidden', animate: 'show' }
    : {}

  return (
    <Wrap className="flex flex-col h-full bg-navy text-white" {...wrapProps}>
      {/* ── Profile section ── */}
      <motion.div variants={itemVariants} className="px-6 pt-8 pb-6">
        <h2 className="font-serif font-semibold text-[15px] leading-tight">Tofa Kimani Mwangi</h2>
        <p className="text-xs text-[#9FB2C4] mt-0.5 leading-snug font-sans"> BIG DATA  &amp; DATA ENGINEER &amp; FULL STACK DEV &amp; DATA ANALYST</p>
        <div className="flex items-center gap-1.5 mt-1.5 text-[#8FA6BA]">
          <MapPin size={10} />
          <span className="text-[11px] font-sans">Nairobi, Kenya</span>
        </div>

        <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-doc bg-white/[0.06] border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
          <span className="text-[10px] text-[#B7C4D2] font-medium font-sans">Open to work</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mx-6 h-px bg-white/10" />

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Primary">
        <ul className="space-y-0.5">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <motion.li key={href} variants={itemVariants}>
                <Link
                  href={href}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className={`
                    group relative flex items-center gap-3 px-3 py-2.5 rounded-doc text-[13.5px] font-sans
                    transition-colors duration-150
                    ${active ? 'nav-active' : 'text-[#9FB2C4] hover:text-white hover:bg-white/[0.06]'}
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-accent rounded-full" aria-hidden />
                  )}
                  <Icon size={15} className={active ? 'text-accent shrink-0' : 'text-[#7E97AC] group-hover:text-white shrink-0 transition-colors'} aria-hidden />
                  <span className="flex-1">{label}</span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <motion.div variants={itemVariants} className="mx-6 h-px bg-white/10" />

      {/* ── Socials + footer ── */}
      <motion.div variants={itemVariants} className="px-6 py-5">
        <p className="text-[10px] uppercase tracking-widest text-[#7E97AC] font-medium mb-3 font-sans">Connect</p>
        <div className="flex items-center gap-2">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-doc border border-white/15 flex items-center justify-center text-[#9FB2C4] hover:text-white hover:border-white/30 transition-colors duration-150"
            >
              <Icon size={13} aria-hidden />
            </a>
          ))}
        </div>
        <p className="text-[10px] text-[#5C7691] mt-4 font-sans">© {new Date().getFullYear()} Tofa Kimani Mwangi</p>
      </motion.div>
    </Wrap>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])
  useEffect(() => setMobileOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Desktop fixed sidebar ── */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 border-r border-white/10"
        style={{ width: 'var(--sidebar-w)' }}
      >
        {mounted && <SidebarContent animate />}
      </aside>

      {/* ── Mobile topbar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 h-16 bg-navy text-white border-b border-white/10">
        <span className="font-serif font-semibold text-[15px]">Tofa Kimani</span>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -mr-2"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={20} aria-hidden />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="sidebar-overlay md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed left-0 top-0 h-screen z-50 md:hidden border-r border-white/10"
              style={{ width: 'var(--sidebar-w)' }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-doc bg-white/[0.06] border border-white/15 flex items-center justify-center text-white z-10"
                aria-label="Close menu"
              >
                <X size={14} aria-hidden />
              </button>
              <SidebarContent onClose={() => setMobileOpen(false)} animate={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
