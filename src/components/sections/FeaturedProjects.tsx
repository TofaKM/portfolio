import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Clock, FileText } from 'lucide-react'
import { GithubGlyph } from '@/components/icons/BrandGlyphs'
import { projects } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'
import { delay } from '@/lib/delay'

export default function FeaturedProjects() {
  const featured = projects.filter(p => p.featured)
  return (
    <section className="py-24 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
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
            const demo = p.demo && p.demo !== p.github ? p.demo : undefined
            return (
              <div
                key={p.id}
                style={delay(i * 80)}
                className={`reveal card ${p.image ? 'grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 items-start' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="tag capitalize">{p.category}</span>
                    <span className="text-[11px] text-ink-300 font-mono">{p.year}</span>
                    {inProgress && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-accent-dark ml-auto">
                        <Clock size={10} aria-hidden /> {p.statusNote ?? 'In Progress'}
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
                  <div className="flex flex-wrap gap-2.5">
                    {demo && (
                      <a href={demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-4 py-2 text-[12.5px]">
                        <ExternalLink size={12} aria-hidden /> Live Demo
                      </a>
                    )}
                    {p.caseStudy && (
                      <a href={p.caseStudy} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-4 py-2 text-[12.5px]">
                        <FileText size={12} aria-hidden /> Case Study &amp; Screens
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-4 py-2 text-[12.5px]">
                        <GithubGlyph size={12} /> Source
                      </a>
                    )}
                    {p.caseStudy && !p.github && (
                      <span className="text-[12px] text-ink-400 font-sans self-center">Source is private — walkthrough on request</span>
                    )}
                    {!p.github && !demo && !p.caseStudy && (
                      <span className="text-[12.5px] text-ink-300 font-sans px-1 py-2">Not yet published on GitHub</span>
                    )}
                  </div>
                </div>

                {p.image && (
                  <a
                    href={p.caseStudy ?? p.github ?? demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-doc border border-border bg-cream-100 p-1.5 hover:border-accent transition-colors"
                  >
                    <span className="block relative aspect-[16/11] overflow-hidden rounded-doc">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover object-top"
                      />
                    </span>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
