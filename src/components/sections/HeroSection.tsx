'use client'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'
import Link from 'next/link'
import { certifications, projects } from '@/data'

const roles = ['Data Engineer', 'Full-Stack Developer', 'Python Developer', 'SQL Specialist', 'Data Analyst']

/* Single staggered entrance — no infinite loops (no floating orbs, no
   typewriter cycle, no bouncing scroll arrow, no ring/pulse around the
   photo). Everything animates in once and then holds still, per the
   "avoid excessive animation" brief. */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-2 text-[#EDF1F4]">
      {/* Faint fixed rule pattern — static, no motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 120px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-8 md:px-14 py-20 md:py-28 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-doc border border-white/15 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
            <span className="text-[12px] text-[#B7A67E] font-mono tracking-[0.04em] uppercase">Available · Nairobi, Kenya</span>
          </motion.div>

          <motion.h1
            variants={fade}
            className="font-serif font-semibold leading-[1.08] tracking-[-0.015em] mb-5"
            style={{ fontSize: 'clamp(40px, 7vw, 68px)' }}
          >
            Tofa Kimani Mwangi
          </motion.h1>

          <motion.div variants={fade} className="font-mono text-[13.5px] text-[#9FB2C4] mb-7">
            {roles.join('  ·  ')}
          </motion.div>

          <motion.p variants={fade} className="text-[16px] text-[#D6DEE5] max-w-xl leading-relaxed mb-10 font-sans">
            <strong className="text-white font-medium">Engineering software. Transforming data. Solving real problems.</strong>
              I’m a Data Engineer & Full-Stack Developer working across <strong className="text-white font-medium">web applications,
              databases, and ETL pipelines</strong>. My experience spans healthcare data, corporate governance analytics,
              e-commerce platforms, and containerized data workflows — with a focus on turning complex requirements and
              messy data into <strong className="text-white font-medium">reliable, scalable systems</strong>.
              Currently, I’m going deeper into <strong className="text-white font-medium">data engineering, big data, and scalable architecture</strong>.
          </motion.p>

          <motion.div variants={fade} className="flex items-center gap-3 mb-12">
            <a 
              href="https://github.com/TofaKM" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-doc border border-white/20 bg-white/[0.04] text-[#D6DEE5] hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all"
            >
              <GithubGlyph
                size={21}
                aria-hidden
                className="text-white"
              />
              <span className="font-mono text-[12px] tracking-wide">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/tofa-mwangi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-doc border border-white/20 bg-white/[0.04] text-[#D6DEE5] hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all"
            >
              <LinkedinGlyph
                size={21}
                aria-hidden
                className="text-white"
              />
              <span className="font-mono text-[12px] tracking-wide">LinkedIn</span>
          </a>

          <a
            href="mailto:mwangitofa@gmail.com"
            aria-label="Email"
            className="w-10 h-10 rounded-doc border border-white/15 flex items-center justify-center text-[#9FB2C4] hover:text-white hover:border-white/30 transition-colors"
          >
            <Mail size={17} aria-hidden />
          </a>
          </motion.div>


          <motion.div variants={fade} className="flex flex-wrap items-center gap-3 mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-[13.5px] font-sans px-5 py-2.5 rounded-doc bg-accent text-white hover:bg-accent-dark transition-colors"
            >
              View Projects <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </Link>
            <a
              href="/documents/Tofa-CV.pdf"
              download
              className="inline-flex items-center gap-2 font-semibold text-[13.5px] font-sans px-5 py-2.5 rounded-doc border border-white/35 text-white hover:border-white hover:bg-white/[0.06] transition-colors"
            >
              <Download size={14} strokeWidth={2} aria-hidden /> Download CV
            </a>
            <a
              href="/documents/Tofa_Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[13.5px] font-sans px-5 py-2.5 rounded-doc border border-white/35 text-white hover:border-white hover:bg-white/[0.06] transition-colors"
            >
              View Certificate
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-[13.5px] font-sans px-5 py-2.5 text-[#B7C4D2] hover:text-white transition-colors"
            >
              Say Hello <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </Link>
          </motion.div>

          

          <motion.div variants={fade} className="grid grid-cols-3 gap-8 border-t border-white/[0.16] pt-6 max-w-md">
            {[
              { v: String(certifications.length), l: 'Certifications' },
              { v: 'BSc', l: 'KCA University' },
              { v: String(projects.length), l: 'Projects' },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="font-serif text-2xl text-white">{v}</div>
                <div className="text-[10.5px] text-[#8FA6BA] font-mono uppercase tracking-[0.08em] mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Headshot — plain bordered rectangle, no ring/pulse decoration */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <div className="relative aspect-[4/5] rounded-doc overflow-hidden border border-white/20">
            <Image
              src="/profile.jpg"
              alt="Tofa Kimani Mwangi"
              fill
              priority
              sizes="(min-width: 768px) 320px, 0px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
