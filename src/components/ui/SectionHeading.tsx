'use client'
import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, x: align === 'center' ? 0 : -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className={`flex items-center gap-2.5 mb-3 ${align === 'center' ? 'justify-center' : ''}`}
        >
          {/* Accent line */}
          <motion.span
            className="h-px w-6 shrink-0"
            style={{ background: 'var(--accent)' }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
          />
          <p
            className="text-[11px] uppercase tracking-[.2em] font-medium font-sans"
            style={{ color: 'var(--accent-dark)' }}
          >
            {eyebrow}
          </p>
        </motion.div>
      )}

      <h2 className="font-serif font-semibold leading-tight mb-3 text-ink-900 text-3xl md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className={`text-ink-500 text-[15px] leading-relaxed font-sans ${
            align === 'center' ? 'max-w-xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
