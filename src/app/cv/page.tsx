import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { Download, Eye } from 'lucide-react'
import { pageMetadata } from '@/lib/metadata'
import { profile } from '@/data'

export const metadata: Metadata = pageMetadata({
  title: 'CV / Resume',
  description:
    'Professional CV of Tofa Kimani Mwangi — software engineer: full-stack, backend, AI and LLM integration, data engineering, data analytics, IT support and deployment.',
  path: '/cv',
})

/**
 * One source for the CV: docs/cv.html is printed to the PDF download and
 * also shown here, so the page and the PDF can't drift apart. Read once at
 * build time (the page is static). The file is our own, committed source.
 */
function readCv() {
  const html = fs.readFileSync(path.join(process.cwd(), 'docs', 'cv.html'), 'utf8')
  const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? ''
  const body = html.match(/<main class="cv">([\s\S]*?)<\/main>/)?.[1]
  if (!body) throw new Error('docs/cv.html: <main class="cv"> not found')
  // @page sizes the standalone PDF; on the site, leave printing to the browser.
  return { css: css.replace(/@page\s*\{[^}]*\}/, ''), body }
}

export default function CVPage() {
  const { css, body } = readCv()

  return (
    <div>
      <section className="pt-14 pb-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header — label and intro left, actions top-right */}
          <div className="enter flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow mb-3">Curriculum Vitae</p>
              <p className="text-ink-500 text-[15px] font-sans max-w-2xl leading-relaxed">
                The same document as the PDF — read it here, or download it to send on.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Eye size={15} aria-hidden /> View PDF
              </a>
              <a href={profile.cv} download className="btn btn-primary">
                <Download size={14} strokeWidth={2} aria-hidden /> Download CV
              </a>
            </div>
          </div>

          {/* The CV itself, on a sheet of "paper". Its name heading is the page's h1. */}
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div className="max-w-[850px] mx-auto bg-white border border-border rounded-doc shadow-sm px-5 py-8 sm:px-12 sm:py-12 overflow-x-auto">
            <div className="cv" dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </div>
      </section>
    </div>
  )
}
