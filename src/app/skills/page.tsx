import type { Metadata } from 'next'
import { skillGroups, projects } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillGroups from '@/components/ui/SkillGroups'
import { delay } from '@/lib/delay'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Skills and tools of Tofa Kimani Mwangi — data engineering (Python, SQL, Spark, Airflow), web development (Spring Boot, Next.js, React), databases, DevOps, and professional and soft skills.',
}

export default function SkillsPage() {
  const technical = skillGroups.filter(g => !['professional', 'soft', 'learning'].includes(g.id))
  const personal = skillGroups.filter(g => ['professional', 'soft', 'learning'].includes(g.id))
  const techCount = technical.reduce((n, g) => n + g.items.length, 0)

  const stats = [
    { label: 'Technical skills', value: techCount },
    { label: 'Skill areas',      value: technical.length },
    { label: 'Languages',        value: skillGroups.find(g => g.id === 'languages')?.items.length ?? 0 },
    { label: 'Projects',         value: projects.length },
  ]

  return (
    <div>
      <section className="pt-14 pb-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            as="h1"
            eyebrow="Tech Stack"
            title="Skills & Expertise"
            subtitle="Everything I work with — from data pipelines and databases to web apps, testing and the way I work with people."
            className="mb-8"
          />

          {/* Summary tiles — Agri-Link dashboard style */}
          <dl style={delay(80)} className="enter grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {stats.map(({ label, value }) => (
              <div key={label} className="bg-white border border-border rounded-doc px-4 py-3">
                <dt className="text-[10px] font-sans uppercase tracking-[.16em] text-accent-dark">{label}</dt>
                <dd className="font-mono font-semibold text-[22px] text-ink-900 mt-1">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="reveal font-serif font-semibold text-2xl text-ink-900 mb-5">Technical</h2>
          <SkillGroups groups={technical} />

          <h2 className="reveal font-serif font-semibold text-2xl text-ink-900 mt-14 mb-5">Professional &amp; Soft Skills</h2>
          <SkillGroups groups={personal} />
        </div>
      </section>
    </div>
  )
}
