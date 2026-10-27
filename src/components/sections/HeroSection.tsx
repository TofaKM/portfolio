import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { certifications, projects, profile } from '@/data'
import { delay } from '@/lib/delay'
import StatTile from '@/components/ui/StatTile'


/* One staggered CSS entrance on load (.enter in globals.css) — runs without
   JavaScript, then everything holds still. The <h1> is not animated so it
   paints immediately as the page's largest element. */

export default function HeroSection() {
  const stats = [
    { label: 'Projects',       value: String(projects.length),       note: 'Data & full-stack' },
    { label: 'Certifications', value: String(certifications.filter(c => c.status === 'completed').length), note: 'Cisco · IBM · ALX' },
    { label: 'Degree',         value: 'BSc',                         note: 'KCA University' },
  ]

  return (
    <section className="px-5 md:px-10">
      <div className="max-w-6xl mx-auto w-full pt-14 pb-16 md:pt-20 md:pb-24 grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <p className="enter eyebrow mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" aria-hidden />
            Available · {profile.location}
          </p>

          <h1
            className="font-serif font-semibold text-ink-900 leading-[1.08] tracking-[-0.015em] mb-4"
            style={{ fontSize: 'clamp(38px, 6.5vw, 64px)' }}
          >
            {profile.name}
          </h1>

          <p className="enter font-mono text-[13px] text-ink-500 mb-6" style={delay(60)}>
            {profile.roles.join('  ·  ')}
          </p>

          <p style={delay(120)} className="enter text-[15.5px] text-ink-500 max-w-xl leading-relaxed mb-8 font-sans">
            <strong className="text-ink-900 font-medium">Engineering software. Transforming data. Solving real problems.</strong>{' '}
            I&rsquo;m a software engineer who works across the whole stack — <strong className="text-ink-900 font-medium">web
            applications, backend services, AI and LLM integration, databases, data pipelines, analytics, IT support and deployment</strong>. My experience spans healthcare data, corporate governance analytics,
            e-commerce platforms, retail ERP and point of sale, and containerized data workflows — with a focus on turning complex requirements and
            messy data into <strong className="text-ink-900 font-medium">reliable, scalable systems</strong>.
            I&rsquo;m comfortable from the database to the browser to production, and <strong className="text-ink-900 font-medium">ready to take on whichever role the team needs</strong>.
          </p>

          <div style={delay(180)} className="enter flex flex-wrap items-center gap-3 mb-10">
            <Link href="/projects" className="btn btn-primary">
              View Projects <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </Link>
            <a href={profile.cv} download className="btn btn-secondary">
              <Download size={14} strokeWidth={2} aria-hidden /> Download CV
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-[13.5px] font-sans px-2 py-2.5 text-accent-dark hover:text-ink-900 transition-colors"
            >
              Say Hello <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </Link>
          </div>


          {/* KPI cards — same pattern as the Agri-Link dashboard tiles */}
          <dl style={delay(260)} className="enter grid grid-cols-3 gap-3 max-w-lg">
            {stats.map(s => <StatTile key={s.label} {...s} />)}
          </dl>
        </div>

        {/* Headshot */}
        <div style={delay(150)} className="enter w-full max-w-[280px] mx-auto md:max-w-none">
          <div className="relative aspect-[4/5] rounded-doc overflow-hidden border border-border bg-surface p-2">
            <div className="relative w-full h-full overflow-hidden rounded-doc">
              <Image
                src="/profile.jpg"
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 768px) 380px, 280px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
