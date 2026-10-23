import {
  Code2, Workflow, BarChart3, Globe, Database, Container, Wrench, Briefcase, Users, Sprout,
  type LucideIcon,
} from 'lucide-react'
import type { SkillGroup, SkillIcon } from '@/types'
import { delay } from '@/lib/delay'

const icons: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  workflow: Workflow,
  chart: BarChart3,
  globe: Globe,
  database: Database,
  container: Container,
  wrench: Wrench,
  briefcase: Briefcase,
  users: Users,
  sprout: Sprout,
}

interface Props {
  groups: SkillGroup[]
  /** 'cards' — one card per group (Skills page). 'compact' — label + tags, for inside a CV card. */
  variant?: 'cards' | 'compact'
  /** Show at most this many tags per group, with a "+N more" chip. */
  limit?: number
}

export default function SkillGroups({ groups, variant = 'cards', limit }: Props) {
  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {groups.map(g => (
          <div key={g.id}>
            <h3 className="text-[10px] font-semibold uppercase tracking-[.18em] mb-2.5 font-sans text-accent-dark">
              {g.label}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map(item => <span key={item} className="tag">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((g, i) => {
        const Icon = icons[g.icon]
        const shown = limit ? g.items.slice(0, limit) : g.items
        const more = g.items.length - shown.length
        return (
          <section
            key={g.id}
            aria-labelledby={`skills-${g.id}`}
            style={delay((i % 3) * 60)}
            className={`reveal card flex flex-col ${g.id === 'learning' ? 'border-dashed' : ''}`}
          >
            <header className="flex items-center gap-2.5 mb-1">
              <span className="w-8 h-8 rounded-doc bg-accent-tint text-accent-dark flex items-center justify-center shrink-0">
                <Icon size={15} aria-hidden />
              </span>
              <h2 id={`skills-${g.id}`} className="text-[11px] font-semibold uppercase tracking-[.16em] font-sans text-accent-dark">
                {g.label}
              </h2>
              <span className="ml-auto font-mono text-[11px] text-ink-300" aria-label={`${g.items.length} skills`}>
                {g.items.length}
              </span>
            </header>
            {g.note && <p className="text-[12px] text-ink-400 font-sans mt-1">{g.note}</p>}
            <ul className="flex flex-wrap gap-1.5 mt-4">
              {shown.map(item => (
                <li key={item} className="tag">{item}</li>
              ))}
              {more > 0 && <li className="tag bg-white">+{more} more</li>}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
