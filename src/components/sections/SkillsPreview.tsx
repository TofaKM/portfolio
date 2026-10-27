import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { skillGroups } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillGroups from '@/components/ui/SkillGroups'

/** Home-page teaser: the six core technical areas, a few tags each. */
const preview = ['languages', 'ai', 'data-engineering', 'web', 'databases', 'devops']

export default function SkillsPreview() {
  const groups = preview
    .map(id => skillGroups.find(g => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))

  return (
    <section className="py-24 px-5 md:px-10 bg-cream-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Expertise"
            title="Tools of the trade"
            subtitle="Technologies I use to build full-stack apps and data pipelines."
          />
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-[13px] font-medium font-sans shrink-0 hover:gap-3 transition-all text-accent-dark"
          >
            All skills <ArrowRight size={14} />
          </Link>
        </div>

        <SkillGroups groups={groups} limit={5} />
      </div>
    </section>
  )
}
