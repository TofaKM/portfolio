import type { Metadata } from 'next'
import {
  Palette,
  Server,
  Database,
  BarChart3,
  Wrench,
  Sprout,
  Workflow,
} from 'lucide-react'
import { skills } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'
import { delay } from '@/lib/delay'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Skills and tools of Tofa Kimani Mwangi — data engineering (Python, SQL, Spark, Airflow), backend (Spring Boot, Node.js), frontend (Next.js, React) and databases.',
}

/* One consistent accent (bronze) across every category. */
const catCfg = {
  frontend: {
    label: 'Frontend',
    Icon: Palette,
  },
  backend: {
    label: 'Backend',
    Icon: Server,
  },
  database: {
    label: 'Databases',
    Icon: Database,
  },
  'data-engineering': {
    label: 'Data Engineering',
    Icon: Workflow,
  },
  devops: {
    label: 'Data & Analytics',
    Icon: BarChart3,
  },
  tools: {
    label: 'Tools',
    Icon: Wrench,
  },
} as const

const order = [
  'frontend',
  'backend',
  'database',
  'data-engineering',
  'devops',
  'tools',
] as const

export default function SkillsPage() {
  return (
    <div>
      <section className="pt-14 pb-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            as="h1"
            eyebrow="Tech Stack"
            title="Skills & Expertise"
            subtitle="Technologies and tools I use daily — from building UIs to designing and processing data pipelines."
            className="mb-14"
          />

          <div className="space-y-14">
            {order.map((cat) => {
              const cfg = catCfg[cat]
              const catSkills = skills.filter((s) => s.category === cat)

              return (
                <div key={cat}>
                  {/* Category header */}
                  <div className="reveal flex items-center gap-3 mb-7">
                    <cfg.Icon size={17} className="text-accent-dark" aria-hidden />
                    <h2 className="font-serif font-semibold text-lg text-accent-dark">
                      {cfg.label}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catSkills.map((sk, si) => (
                      <div key={sk.name} style={delay(si * 30)} className="reveal card">
                        <div className="flex justify-between items-baseline mb-3">
                          <h3 className="font-sans font-medium text-[13.5px] text-ink-900">
                            {sk.name}
                          </h3>
                          <span className="text-[11px] font-mono font-semibold text-accent-dark">
                            {sk.level}%
                          </span>
                        </div>

                        <div
                          className="h-[5px] rounded-full bg-cream-300 overflow-hidden"
                          role="progressbar"
                          aria-label={sk.name}
                          aria-valuenow={sk.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="bar-fill bg-accent"
                            style={delay(50 + si * 20, { '--level': sk.level / 100 } as React.CSSProperties)}
                          />
                        </div>

                        <div className="mt-2 text-right">
                          <span className="text-[10px] text-ink-300 font-sans">
                            {sk.level >= 85
                              ? 'Proficient'
                              : sk.level >= 70
                                ? 'Comfortable'
                                : 'Learning'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Currently learning */}
          <div className="reveal mt-16 card">
            <h3 className="font-serif font-semibold text-[15px] text-ink-900 mb-2 flex items-center gap-2">
              <Sprout size={15} className="text-accent-dark" aria-hidden />
              Currently Learning
            </h3>

            <p className="text-ink-500 text-[13px] font-sans mb-5">
              Next on the list — these aren&rsquo;t in the proficiency bars
              above because they aren&rsquo;t yet demonstrated in a finished
              project.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                'Cloud Databases',
                'C++ Fundamentals',
              ].map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
