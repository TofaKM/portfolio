'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionHeading from '@/components/ui/SectionHeading'

const cats = ['all', 'fullstack', 'data']

export default function ProjectsClient() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="min-h-screen">
      <section className="py-20 px-8 md:px-14">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
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
                className={`px-4 py-2 rounded-doc text-[12.5px] font-medium font-sans capitalize transition-all border ${
                  filter === c
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white border-[#DCDFDD] text-ink-500 hover:text-ink-900 hover:border-[#A2793F]'
                }`}
                style={filter === c ? { background: 'var(--accent-dark)', borderColor: 'var(--accent-dark)' } : {}}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
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
