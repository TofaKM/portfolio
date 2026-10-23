'use client'
import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  /** Use 'h1' when this heading is the page title. */
  as?: 'h1' | 'h2'
  className?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', as: Tag = 'h2', className = '' }: Props) {
  const centered = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

      <Tag
        className={`font-serif font-semibold leading-tight mb-3 text-ink-900 ${
          Tag === 'h1' ? 'text-4xl md:text-5xl tracking-[-0.02em]' : 'text-3xl md:text-4xl'
        }`}
      >
        {title}
      </Tag>

      {subtitle && (
        <p
          className={`text-ink-500 text-[15px] leading-relaxed font-sans ${
            centered ? 'max-w-xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
