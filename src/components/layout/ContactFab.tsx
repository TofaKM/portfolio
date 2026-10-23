'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail } from 'lucide-react'

/** Round navy "contact me" button, bottom-right — hidden on the contact page itself. */
export default function ContactFab() {
  const pathname = usePathname()
  if (pathname === '/contact') return null

  return (
    <Link
      href="/contact"
      aria-label="Contact me"
      title="Contact me"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-lg shadow-navy/25 hover:bg-navy-2 transition-colors"
    >
      <Mail size={20} aria-hidden />
    </Link>
  )
}
