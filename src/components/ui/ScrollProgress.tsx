'use client'
import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  // Direct scroll mapping — no spring, no lag
  const { scrollYProgress } = useScroll()

  // Sits on the bottom edge of the sticky navbar, full width at every breakpoint.
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 z-[51] h-[2px] origin-left"
      style={{
        top: 'calc(var(--nav-h) - 1px)',
        scaleX: scrollYProgress,
        background: 'var(--accent)',
        willChange: 'transform',
      }}
    />
  )
}
