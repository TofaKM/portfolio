'use client'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Testimonials() {
  return (
    <section className="py-24 px-8 md:px-14" style={{ background: 'var(--sidebar-bg)' }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Social Proof" title="What people say" align="center" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .45, delay: i * .09 }}
              className="card group relative overflow-hidden"
            >
              {/* Large decorative quote */}
              <Quote
                size={44}
                className="absolute top-4 right-4 transition-opacity duration-200"
                style={{ color: 'rgba(162,121,63,.18)' }}
              />

              <p className="text-ink-500 leading-relaxed mb-6 text-[14px] font-sans italic relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-serif font-bold text-[12px] shadow-sm"
                  style={{ background: 'var(--accent-dark)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-serif font-semibold text-[13px] text-ink-900">{t.name}</div>
                  <div className="text-[11px] text-ink-400 font-sans">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
