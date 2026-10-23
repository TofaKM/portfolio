import Image from 'next/image'
import { ExternalLink, ArrowUpRight, Clock, FileText } from 'lucide-react'
import { GithubGlyph } from '@/components/icons/BrandGlyphs'
import { Project } from '@/types'
import { categoryLabels } from '@/data'
import { delay } from '@/lib/delay'

export default function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const inProgress = p.status === 'in-progress'
  // The whole card opens the best public link (case study → code → demo).
  const href = p.caseStudy ?? p.github ?? (p.demo !== p.github ? p.demo : undefined)

  return (
    <div style={delay(index * 60)} className="reveal card group relative flex flex-col h-full has-[h3_a:focus-visible]:outline has-[h3_a:focus-visible]:outline-2 has-[h3_a:focus-visible]:outline-accent">
      {/* Header: category / year / status */}
      <div className="flex items-center gap-2 mb-3">
        <span className="tag">{categoryLabels[p.category] ?? p.category}</span>
        <span className="text-[11px] text-ink-300 font-mono">{p.year}</span>
        {p.featured && !inProgress && (
          <span className="text-[10px] font-mono uppercase tracking-wide text-accent-dark ml-auto">Featured</span>
        )}
        {inProgress && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-accent-dark ml-auto">
            <Clock size={10} aria-hidden /> {p.statusNote ?? 'In Progress'}
          </span>
        )}
      </div>

      {p.image && (
        <div className="relative aspect-[16/10] -mx-2 mb-4 overflow-hidden rounded-doc border border-border bg-cream-100">
          <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-serif font-semibold text-[15px] text-ink-900 leading-snug group-hover:text-accent-dark transition-colors">
          {href ? (
            // Stretched link: its ::after covers the card, so the card is
            // clickable while the links below stay separately focusable.
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {p.title}
            </a>
          ) : p.title}
        </h3>
        {href && <ArrowUpRight size={14} className="text-ink-300 group-hover:text-accent transition-colors shrink-0 mt-0.5" aria-hidden />}
      </div>
      <p className="text-ink-500 text-[13px] leading-relaxed mb-4 font-sans">{p.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.tech.slice(0, 4).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
        {p.tech.length > 4 && <span className="tag">+{p.tech.length - 4}</span>}
      </div>

      {/* Links — pushed to the bottom of the card regardless of description length */}
      <div className="relative z-10 mt-auto pt-1 flex items-center gap-4">
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
        {p.caseStudy && (
          <a
            href={p.caseStudy}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium font-sans text-ink-700 hover:text-accent-dark transition-colors"
          >
            <FileText size={12} aria-hidden /> Case study
          </a>
        )}
        {!p.github && !p.demo && !p.caseStudy && (
          <span className="text-[12px] text-ink-300 font-sans">Not yet published on GitHub</span>
        )}
      </div>
    </div>
  )
}
