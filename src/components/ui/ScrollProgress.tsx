'use client'
import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  // Direct scroll mapping — no spring, no lag
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        left: 'var(--sidebar-w)',
        right: 0,
        background: 'var(--accent)',
        willChange: 'transform',
      }}
    />
  )
}
