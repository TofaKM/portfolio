import type { Metadata } from 'next'
import { CheckCircle2, Clock, ExternalLink, BarChart3, Cpu, Wrench, TrendingUp, FileCode2 } from 'lucide-react'
import { certifications } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading'

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Certifications and credentials earned by Tofa Kimani Mwangi in data engineering, analytics, and software development.',
}

const certIcons: Record<string, typeof BarChart3> = {
  chart: BarChart3,
  cpu: Cpu,
  wrench: Wrench,
  'trending-up': TrendingUp,
  code: FileCode2,
}

export default function CertificationsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-8 md:px-14">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications"
            subtitle="Completed and in-progress programs — each card links through to the original issuing platform for verification."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {certifications.map((cert) => {
              const CertIcon = certIcons[cert.icon]
              const inProgress = cert.status === 'in-progress'
              return (
                <div key={cert.id} className="card flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-9 h-9 rounded-doc bg-accent-tint text-accent-dark flex items-center justify-center shrink-0">
                      <CertIcon size={17} aria-hidden />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-doc ${
                        inProgress ? 'bg-accent-tint text-accent-dark' : 'bg-cream-200 text-ok'
                      }`}
                    >
                      {inProgress ? <Clock size={11} aria-hidden /> : <CheckCircle2 size={11} aria-hidden />}
                      {inProgress ? 'In progress' : 'Completed'}
                    </span>
                  </div>

                  <h3 className="font-serif text-[16px] font-semibold text-ink-900 mb-1">{cert.name}</h3>
                  <p className="text-[12.5px] text-ink-500 font-sans mb-1">{cert.issuer}</p>
                  <p className="text-[11px] text-ink-300 font-mono mb-4">{cert.date}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent-dark hover:underline font-sans"
                      >
                        View certificate <ExternalLink size={12} aria-hidden />
                      </a>
                    ) : (
                      <span className="text-[12px] text-ink-300 font-sans">Credential pending completion</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
