'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { skills } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'

const cats = [
  'frontend',
  'backend',
  'database',
  'data-engineering',
  'devops',
] as const

const labels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  'data-engineering': 'Data Engineering',
  devops: 'Data & Analytics',
}

const accentColors: Record<string, string> = {
  frontend: '#7C5A2E',
  backend: '#7C5A2E',
  database: '#A2793F',
  'data-engineering': '#7C5A2E',
  devops: '#7C5A2E',
}

const barColors: Record<string, string> = {
  frontend: 'var(--accent)',
  backend: 'var(--accent-dark)',
  database: 'var(--accent)',
  'data-engineering': 'var(--accent-dark)',
  devops: 'var(--accent-dark)',
}

export default function SkillsPreview() {
  return (
    <section
      className="py-24 px-8 md:px-14"
      style={{ background: 'var(--sidebar-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Expertise"
            title="Tools of the trade"
            subtitle="Technologies I use daily to build full-stack apps and data pipelines."
          />

          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-[13px] font-medium font-sans shrink-0 hover:gap-3 transition-all"
            style={{ color: 'var(--accent-dark)' }}
          >
            All skills <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {cats.map((cat, ci) => {
            const catSkills = skills
              .filter((s) => s.category === cat)
              .slice(0, 4)

            const accent = accentColors[cat]
            const bar = barColors[cat]

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: ci * 0.07,
                }}
                className="card hover:border-[#A2793F]/50"
              >
                <h3
                  className="text-[10px] font-semibold uppercase tracking-[.18em] mb-4 font-sans"
                  style={{ color: accent }}
                >
                  {labels[cat]}
                </h3>

                <ul className="space-y-3.5">
                  {catSkills.map((sk) => (
                    <li
                      key={sk.name}
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-[12px] text-ink-700 font-sans truncate">
                            {sk.name}
                          </span>

                          <span className="text-[10px] text-ink-300 font-mono ml-1 shrink-0">
                            {sk.level}%
                          </span>
                        </div>

                        <div className="h-[3px] rounded-full bg-[#DCDFDD] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${sk.level}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.55,
                              delay: 0.08 + ci * 0.05,
                              ease: 'easeOut',
                            }}
                            className="h-full rounded-full"
                            style={{ background: bar }}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
