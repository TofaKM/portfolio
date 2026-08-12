'use client'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { WorkExperience, Education } from '@/types'
import SectionHeading from '@/components/ui/SectionHeading'

export default function TimelineSection({ work, education }: { work: WorkExperience[]; education: Education[] }) {
  return (
    <section className="py-20 px-8 md:px-14">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Work */}
          <div>
            <SectionHeading eyebrow="Career" title="Work Experience" className="mb-10" />
            <div className="relative">
              {/* Thin vertical line */}
              <div
                className="absolute left-4 top-2 bottom-2 w-px timeline-line"
                style={{ background: 'var(--border)' }}
              />
              <div className="space-y-6">
                {work.map((job, i) => (
                  <motion.div
                    key={`${job.company}-${i}`}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .45, delay: i * .09 }}
                    className="relative pl-12"
                  >
                    {/* Node */}
                    <div
                      className="absolute left-0 top-1.5 w-8 h-8 rounded-doc bg-white border border-[#DCDFDD] flex items-center justify-center shadow-sm"
                    >
                      <Briefcase size={13} style={{ color: 'var(--accent-dark)' }} />
                    </div>

                    <div className="card hover:border-[#A2793F]/50">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="font-serif font-semibold text-[14px] text-ink-900 leading-snug">{job.role}</h3>
                          <div className="text-[12px] font-medium font-sans mt-0.5" style={{ color: 'var(--accent-dark)' }}>{job.company}</div>
                        </div>
                        <span className="text-[10px] text-ink-300 font-mono shrink-0 mt-0.5">{job.period}</span>
                      </div>
                      <p className="text-ink-500 text-[12.5px] leading-relaxed mb-3 font-sans">{job.description}</p>
                      <ul className="space-y-1 mb-3">
                        {job.achievements.map(a => (
                          <li key={a} className="flex items-start gap-2 text-[12px] text-ink-500 font-sans">
                            <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>›</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {job.tech.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <SectionHeading eyebrow="Learning" title="Education" className="mb-10" />
            <div className="relative">
              <div
                className="absolute left-4 top-2 bottom-2 w-px timeline-line"
                style={{ background: 'var(--border)' }}
              />
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={`${edu.school}-${i}`}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .45, delay: i * .09 }}
                    className="relative pl-12"
                  >
                    <div
                      className="absolute left-0 top-1.5 w-8 h-8 rounded-doc bg-white border border-[#DCDFDD] flex items-center justify-center shadow-sm"
                    >
                      <GraduationCap size={13} style={{ color: 'var(--accent-dark)' }} />
                    </div>

                    <div className="card hover:border-[#A2793F]/50">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="font-serif font-semibold text-[14px] text-ink-900 leading-snug">{edu.degree}</h3>
                          <div className="text-[12px] font-medium font-sans mt-0.5" style={{ color: 'var(--accent-dark)' }}>{edu.school}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] text-ink-300 font-mono shrink-0">{edu.period}</span>
                          {edu.grade && (
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(162,121,63,.2)', color: 'var(--accent-dark)' }}
                            >
                              {edu.grade}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-ink-400 text-[12px] font-sans mb-2.5">{edu.field} · {edu.location}</p>
                      <ul className="space-y-1">
                        {edu.details.map(d => (
                          <li key={d} className="flex items-start gap-2 text-[12px] text-ink-500 font-sans">
                            <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>›</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
