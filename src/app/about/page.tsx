import type { Metadata } from 'next'
import { Target, Zap, BookOpen, CheckCircle2 } from 'lucide-react'
import { workExperience, education, certifications } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'
import TimelineSection from '@/components/sections/TimelineSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Tofa Kimani — Data Engineer & Full-Stack Developer specializing in data engineering, ETL pipelines, scalable systems, and full-stack applications.',
}

const philosophy = [
  {
    Icon: Target,
    t: 'Data Quality First',
    d: 'Reliable systems start with reliable data. I focus on clean pipelines, strong data models, validation, and structured workflows that make information trustworthy and useful.',
  },
  {
    Icon: Zap,
    t: 'Build With Purpose',
    d: 'Technology should solve real problems. I focus on practical solutions, maintainable architecture, and systems that turn complex requirements into something people can actually use.',
  },
  {
    Icon: BookOpen,
    t: 'Keep Learning',
    d: 'Software and data are constantly evolving. I stay curious, experiment with new technologies, and continuously improve how I design, build, analyze, and solve problems.',
  },
]

export default function AboutPage() {
  const completedCerts = certifications.filter(c => c.status === 'completed').length

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-8 md:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[11px] uppercase tracking-[.2em] font-medium font-sans mb-4 text-accent-dark">
                About Me
              </p>

              <h1
                className="font-serif font-bold text-5xl md:text-6xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: '-.02em' }}
              >
                Hey, I&rsquo;m <span className="italic text-accent-dark">Tofa</span>
              </h1>

              <div className="space-y-4 text-ink-500 leading-relaxed text-[14.5px] font-sans">
                <p>
                  I&rsquo;m a{' '}
                  <strong className="text-ink-700 font-medium">
                    Data Engineer &amp; Full-Stack Developer
                  </strong>{' '}
                  with a background in Applied Computing. My work sits at the intersection of{' '}
                  <strong className="text-ink-700 font-medium">
                    software engineering, data engineering, and problem-solving
                  </strong>
                  — turning complex requirements and raw data into reliable systems and useful insights.
                </p>

                <p>
                  I work across{' '}
                  <strong className="text-ink-700 font-medium">
                    Python, SQL, PostgreSQL, MySQL, Node.js, Next.js, Docker, and REST APIs
                  </strong>
                  , with hands-on experience building full-stack applications, designing ETL pipelines,
                  managing relational data, and transforming messy datasets into structured,
                  analysis-ready information.
                </p>

                <p>
                  My experience includes working with{' '}
                  <strong className="text-ink-700 font-medium">
                    healthcare data at the Social Health Authority
                  </strong>
                  , where I helped improve data quality, reporting, and internal workflows. I also
                  worked with corporate governance and financial data at Minerva Analytics, developing
                  a strong appreciation for accuracy, validation, and the role reliable data plays in
                  decision-making.
                </p>

                <p>
                  I&rsquo;ve built projects ranging from{' '}
                  <strong className="text-ink-700 font-medium">
                    full-stack e-commerce platforms
                  </strong>{' '}
                  to{' '}
                  <strong className="text-ink-700 font-medium">
                    containerized healthcare ETL pipelines
                  </strong>
                  . These projects have pushed me beyond simply writing code and into thinking about
                  architecture, data integrity, automation, performance, and how different parts of a
                  system work together.
                </p>

                <p>
                  I&rsquo;m currently going deeper into{' '}
                  <strong className="text-ink-700 font-medium">
                    data engineering, big data, and scalable systems
                  </strong>
                  , with a particular interest in turning raw information into reliable data products
                  and actionable insights.
                </p>

                <p>
                  My <strong className="text-ink-700 font-medium">philosophy</strong>: clean data,
                  thoughtful architecture, and clean code are all part of building technology that lasts.
                </p>
              </div>

              {/* Fact grid */}
              <div className="grid grid-cols-2 gap-3 mt-7">
                {[
                  { l: 'Location', v: 'Kenya' },
                  { l: 'Status', v: 'Open to Opportunities' },
                  { l: 'Degree', v: 'BSc Applied Computing' },
                  { l: 'Focus', v: 'Data Engineering & Full-Stack' },
                ].map(({ l, v }) => (
                  <div key={l} className="card py-3 px-4">
                    <div className="text-[10px] text-ink-300 font-mono uppercase tracking-wider mb-1">
                      {l}
                    </div>

                    <div className="text-[12.5px] font-medium text-ink-900 font-sans">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar block */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-doc border border-accent/30"
                  aria-hidden
                />

                <div className="relative w-[260px] h-[260px] rounded-doc border-2 border-border bg-cream-200 flex items-center justify-center">
                  <span className="font-serif font-bold text-8xl text-accent-dark/35">
                    TK
                  </span>
                </div>

                {/* Floating fact cards */}
                <div className="absolute -bottom-4 -left-6 card px-3.5 py-2 bg-white shadow-sm">
                  <div className="text-[9px] text-ink-300 font-mono uppercase tracking-wider">
                    certifications
                  </div>

                  <div className="font-serif font-bold text-xl text-accent-dark flex items-center gap-1.5">
                    {completedCerts}
                    <CheckCircle2 size={15} className="text-ok" aria-hidden />
                  </div>
                </div>

                <div className="absolute -top-4 -right-6 card px-3.5 py-2 bg-white shadow-sm">
                  <div className="text-[9px] text-ink-300 font-mono uppercase tracking-wider">
                    specialization
                  </div>

                  <div className="font-serif font-bold text-xl text-accent-dark">
                    Data + Dev
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-8 md:mx-14 divider" />

      {/* Philosophy */}
      <section
        className="py-20 px-8 md:px-14"
        style={{ background: 'var(--sidebar-bg)' }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="Philosophy"
            title="How I think about building"
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {philosophy.map(({ Icon, t, d }) => (
              <div key={t} className="card">
                <Icon
                  size={20}
                  className="text-accent-dark mb-4"
                  aria-hidden
                />

                <h3 className="font-serif font-semibold text-[14px] text-ink-900 mb-2.5">
                  {t}
                </h3>

                <p className="text-ink-500 text-[13px] leading-relaxed font-sans">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <TimelineSection
        work={workExperience}
        education={education}
      />
    </div>
  )
}
