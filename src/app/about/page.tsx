import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Image from 'next/image'
import { Target, Zap, BookOpen, CheckCircle2 } from 'lucide-react'
import { workExperience, education, certifications, profile } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'
import TimelineSection from '@/components/sections/TimelineSection'

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Learn about Tofa Kimani — software engineer working across full-stack development, backend systems, data engineering, data analytics and deployment.',
  path: '/about',
})

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
    <div>
      {/* Hero */}
      <section className="pt-14 pb-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="eyebrow mb-3">About Me</p>

              <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-900 leading-tight tracking-[-0.02em] mb-6">
                Hey, I&rsquo;m <span className="italic text-accent-dark">Tofa</span>
              </h1>

              <div className="space-y-4 text-ink-500 leading-relaxed text-[14.5px] font-sans">
                <p>
                  I&rsquo;m a{' '}
                  <strong className="text-ink-700 font-medium">
                    software engineer
                  </strong>{' '}
                  with a background in Applied Computing, working across full-stack development, backend systems, data engineering, analytics and deployment. My work sits at the intersection of{' '}
                  <strong className="text-ink-700 font-medium">
                    software engineering, data engineering, and problem-solving
                  </strong>
                  — turning complex requirements and raw data into reliable systems and useful insights.
                </p>

                <p>
                  I work across{' '}
                  <strong className="text-ink-700 font-medium">
                    Python, Java, SQL, PostgreSQL, MySQL, Spring Boot, Node.js, Next.js, Docker, and REST APIs
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
                  and{' '}
                  <strong className="text-ink-700 font-medium">
                    containerized healthcare ETL pipelines
                  </strong>{' '}
                  to{' '}
                  <strong className="text-ink-700 font-medium">
                    Agri-Link, an ERP and point-of-sale system now in trial at a Kenyan agrovet
                  </strong>{' '}
                  (Spring Boot, PostgreSQL and Next.js). These projects have pushed me beyond simply writing code and into thinking about
                  architecture, data integrity, automation, performance, and how different parts of a
                  system work together.
                </p>

                <p>
                  I&rsquo;m happy in any of those roles — building the product, the API, the pipeline or the dashboard, or getting it deployed — and I&rsquo;m currently going deeper into{' '}
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
                  { l: 'Roles', v: 'Full-Stack · Backend · Data · DevOps' },
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
              <div className="w-[300px]">
                <div className="relative h-[360px] rounded-doc border border-border bg-white p-2">
                  <div className="relative w-full h-full overflow-hidden rounded-doc">
                    <Image
                      src="/profile.jpg"
                      alt={profile.name}
                      fill
                      sizes="300px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Fact tiles — below the photo so they never cover it */}
                <dl className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-white border border-border rounded-doc px-4 py-3">
                    <dt className="text-[10px] font-sans uppercase tracking-[.16em] text-accent-dark">Certifications</dt>
                    <dd className="font-mono font-semibold text-[20px] text-ink-900 mt-1 flex items-center gap-1.5">
                      {completedCerts}
                      <CheckCircle2 size={15} className="text-ok" aria-hidden />
                    </dd>
                  </div>
                  <div className="bg-white border border-border rounded-doc px-4 py-3">
                    <dt className="text-[10px] font-sans uppercase tracking-[.16em] text-accent-dark">Focus</dt>
                    <dd className="font-mono font-semibold text-[17px] text-ink-900 mt-1.5 whitespace-nowrap">End-to-end</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-5 md:mx-10 divider" />

      {/* Philosophy */}
      <section
        className="py-20 px-5 md:px-10"
        style={{ background: 'var(--surface-2)' }}
      >
        <div className="max-w-6xl mx-auto">
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
