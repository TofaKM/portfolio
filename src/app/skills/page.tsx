'use client'

import { motion } from 'framer-motion'
import {
  Palette,
  Server,
  Database,
  BarChart3,
  Wrench,
  Sprout,
  Workflow,
} from 'lucide-react'
import { skills } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'

/* One consistent accent (bronze) across every category. */
const catCfg = {
  frontend: {
    label: 'Frontend',
    Icon: Palette,
  },
  backend: {
    label: 'Backend',
    Icon: Server,
  },
  database: {
    label: 'Databases',
    Icon: Database,
  },
  'data-engineering': {
    label: 'Data Engineering',
    Icon: Workflow,
  },
  devops: {
    label: 'Data & Analytics',
    Icon: BarChart3,
  },
  tools: {
    label: 'Tools',
    Icon: Wrench,
  },
} as const

const order = [
  'frontend',
  'backend',
  'database',
  'data-engineering',
  'devops',
  'tools',
] as const

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-8 md:px-14">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Skills & Expertise"
            subtitle="Technologies and tools I use daily — from building UIs to designing and processing data pipelines."
            align="center"
            className="mb-20"
          />

          <div className="space-y-14">
            {order.map((cat, ci) => {
              const cfg = catCfg[cat]
              const catSkills = skills.filter(
                (s) => s.category === cat
              )

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: ci * 0.05,
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-7">
                    <cfg.Icon
                      size={17}
                      className="text-accent-dark"
                      aria-hidden
                    />

                    <h2 className="font-serif font-semibold text-lg text-accent-dark">
                      {cfg.label}
                    </h2>

                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catSkills.map((sk, si) => (
                      <motion.div
                        key={sk.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: si * 0.03,
                        }}
                        className="card"
                      >
                        <div className="flex justify-between items-baseline mb-3">
                          <h3 className="font-sans font-medium text-[13.5px] text-ink-900">
                            {sk.name}
                          </h3>

                          <span className="text-[11px] font-mono font-semibold text-accent-dark">
                            {sk.level}%
                          </span>
                        </div>

                        <div
                          className="h-[5px] rounded-full bg-cream-300 overflow-hidden"
                          role="progressbar"
                          aria-label={sk.name}
                          aria-valuenow={sk.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <motion.div
                            className="h-full w-full rounded-full origin-left bg-accent"
                            initial={{ scaleX: 0 }}
                            whileInView={{
                              scaleX: sk.level / 100,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.6,
                              delay: 0.05 + si * 0.02,
                              ease: 'easeOut',
                            }}
                          />
                        </div>

                        <div className="mt-2 text-right">
                          <span className="text-[10px] text-ink-300 font-sans">
                            {sk.level >= 85
                              ? 'Proficient'
                              : sk.level >= 70
                                ? 'Comfortable'
                                : 'Learning'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Currently learning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-16 card"
          >
            <h3 className="font-serif font-semibold text-[15px] text-ink-900 mb-2 flex items-center gap-2">
              <Sprout
                size={15}
                className="text-accent-dark"
                aria-hidden
              />

              Currently Learning
            </h3>

            <p className="text-ink-500 text-[13px] font-sans mb-5">
              Actively picking up new tools through the ALX Data Engineering
              Program and an in-progress Spark project — these aren&rsquo;t
              reflected in the proficiency bars above since they&rsquo;re not
              yet demonstrated in a completed project.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                'Java',
                'Spring Boot',
                'Apache Spark',
                'Apache Airflow',
                'Cloud Databases',
                'C++ Fundamentals',
              ].map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
