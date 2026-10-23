import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsPreview from '@/components/sections/SkillsPreview'
import Testimonials from '@/components/sections/Testimonials'
import Link from 'next/link'
import { profile, skillGroups } from '@/data'
import { siteUrl } from '@/lib/site'

// Title, description and link preview come from the site-wide defaults in layout.tsx.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/** schema.org Person — helps search engines show a profile result. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Software Engineer',
  description: profile.openTo,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  image: `${siteUrl}/profile.jpg`,
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'KCA University' },
    { '@type': 'EducationalOrganization', name: 'ALX Africa' },
  ],
  knowsAbout: skillGroups
    .filter(g => ['languages', 'data-engineering', 'web', 'databases'].includes(g.id))
    .flatMap(g => g.items),
  sameAs: [profile.github, profile.linkedin],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON data, not executable script; < is escaped so it can't close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />
      <HeroSection />

      {/* Thin divider */}
      <div className="mx-5 md:mx-10 divider" />

      <FeaturedProjects />
      <SkillsPreview />
      <Testimonials />

      {/* CTA */}
      <section className="py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16 px-8 rounded-doc border border-accent/30 bg-accent-tint">
            <p className="eyebrow mb-5">Let&rsquo;s Work Together</p>
            <h2 className="font-serif font-semibold text-4xl md:text-5xl text-ink-900 leading-tight mb-5">
              Got a project in <span className="italic text-accent-dark">mind?</span>
            </h2>
            <p className="text-ink-500 text-[15px] font-sans mb-9 max-w-lg mx-auto leading-relaxed">
              Whether it&rsquo;s a full-stack product, a backend service, a data pipeline, an analytics dashboard or getting something deployed — I&rsquo;m ready to step into the role your team needs. Full-time, contract or freelance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-primary px-7 py-3">
                Start a Conversation
              </Link>
              <Link href="/cv" className="btn btn-secondary px-7 py-3">
                View My CV
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
