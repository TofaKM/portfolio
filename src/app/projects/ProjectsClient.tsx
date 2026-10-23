'use client'
import { useState } from 'react'
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
                    ? 'bg-primary border-primary text-on-primary'
                    : 'bg-surface border-border text-ink-500 hover:text-ink-900 hover:border-accent'
                }`}
              >
                {c === 'all' ? 'All' : categoryLabels[c] ?? c}
              </button>
            ))}
          </div>

          {/* Cards that appear when the filter changes fade in via .reveal
              (the inline script in layout.tsx picks up new nodes). */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
