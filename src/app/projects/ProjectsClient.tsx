'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categoryLabels } from '@/data'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionHeading from '@/components/ui/SectionHeading'

const cats = ['all', 'fullstack', 'data']

export default function ProjectsClient() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <div>
      <section className="pt-14 pb-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="Things I've built"
            subtitle="Full-stack applications and data engineering projects."
            className="mb-8"
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`px-4 py-2 rounded-doc text-[12.5px] font-medium font-sans capitalize transition-colors border ${
                  filter === c
                    ? 'bg-navy border-navy text-white'
                    : 'bg-white border-border text-ink-500 hover:text-ink-900 hover:border-accent'
                }`}
              >
                {c === 'all' ? 'All' : categoryLabels[c] ?? c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* initial={false}: cards present on first render (and in the
                server HTML) appear fully visible; only filter changes animate. */}
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: .96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: .96 }}
                  transition={{ duration: .25 }}
                >
                  <ProjectCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
