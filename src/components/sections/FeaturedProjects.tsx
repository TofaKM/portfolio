'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Clock } from 'lucide-react'
import { GithubGlyph } from '@/components/icons/BrandGlyphs'
import { projects } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'

export default function FeaturedProjects() {
  const featured = projects.filter(p => p.featured)
  return (
    <section className="py-24 px-8 md:px-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects I've shipped"
            subtitle="Full-stack applications and data engineering projects, from scratch to production."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-medium font-sans shrink-0 hover:gap-3 transition-all"
            style={{ color: 'var(--accent-dark)' }}
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-5">
          {featured.map((p, i) => {
            const inProgress = p.status === 'in-progress'
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: i * .08, ease: 'easeOut' }}
                className="card"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="tag capitalize">{p.category}</span>
                  <span className="text-[11px] text-ink-300 font-mono">{p.year}</span>
                  {inProgress && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-accent-dark ml-auto">
                      <Clock size={10} aria-hidden /> In Progress
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-semibold text-xl text-ink-900 mb-2.5 leading-snug">
                  {p.title}
                </h3>
                <p className="text-ink-500 text-[13.5px] leading-relaxed mb-5 font-sans max-w-2xl">{p.longDescription}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="flex gap-2.5">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-doc text-[12.5px] font-medium font-sans text-white hover:opacity-90 transition-opacity shadow-sm"
                      style={{ background: 'var(--accent-dark)' }}
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-doc border border-[#DCDFDD] text-ink-500 text-[12.5px] font-medium font-sans hover:text-ink-900 hover:border-[#A2793F] transition-all"
                    >
                      <GithubGlyph size={12} /> Source
                    </a>
                  )}
                  {!p.github && !p.demo && (
                    <span className="text-[12.5px] text-ink-300 font-sans px-1 py-2">Not yet published on GitHub</span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
