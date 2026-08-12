'use client'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight, Clock } from 'lucide-react'
import { GithubGlyph } from '@/components/icons/BrandGlyphs'
import { Project } from '@/types'

export default function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const inProgress = p.status === 'in-progress'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="card group cursor-default flex flex-col h-full"
    >
      {/* Header: category / year / status */}
      <div className="flex items-center gap-2 mb-3">
        <span className="tag capitalize">{p.category}</span>
        <span className="text-[11px] text-ink-300 font-mono">{p.year}</span>
        {p.featured && !inProgress && (
          <span className="text-[10px] font-mono uppercase tracking-wide text-accent-dark ml-auto">Featured</span>
        )}
        {inProgress && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-accent-dark ml-auto">
            <Clock size={10} aria-hidden /> In Progress
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-serif font-semibold text-[15px] text-ink-900 leading-snug group-hover:text-[#7C5A2E] transition-colors">
          {p.title}
        </h3>
        <ArrowUpRight size={14} className="text-ink-300 group-hover:text-[#A2793F] transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-ink-500 text-[13px] leading-relaxed mb-4 font-sans">{p.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.tech.slice(0, 4).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
        {p.tech.length > 4 && <span className="tag">+{p.tech.length - 4}</span>}
      </div>

      {/* Links — pushed to the bottom of the card regardless of description length */}
      <div className="mt-auto pt-1 flex items-center gap-4">
        {p.github && (
          <a
            href={p.github}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium font-sans text-ink-700 hover:text-accent-dark transition-colors"
          >
            <GithubGlyph size={13} aria-hidden /> Code
          </a>
        )}
        {p.demo && p.demo !== p.github && (
          <a
            href={p.demo}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium font-sans text-ink-700 hover:text-accent-dark transition-colors"
          >
            <ExternalLink size={12} aria-hidden /> Demo
          </a>
        )}
        {!p.github && !p.demo && (
          <span className="text-[12px] text-ink-300 font-sans">Not yet published on GitHub</span>
        )}
      </div>
    </motion.div>
  )
}
