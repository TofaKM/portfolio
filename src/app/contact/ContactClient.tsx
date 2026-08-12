'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1400))
    setStatus('sent')
  }

  const inputCls = `
    w-full px-4 py-2.5 rounded-doc bg-white border border-[#DCDFDD]
    text-ink-900 placeholder-ink-300
    focus:outline-none focus:border-[#A2793F]
    transition-colors text-[13px] font-sans
  `

  return (
    <div className="min-h-screen">
      <section className="py-20 px-8 md:px-14">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[.2em] font-medium font-sans mb-4"
               style={{ color: 'var(--accent-dark)' }}>
              Get In Touch
            </p>
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink-900 mb-4"
                style={{ letterSpacing: '-.02em' }}>
              Let's{' '}
              <span className="italic" style={{ color: 'var(--accent-dark)' }}>Connect</span>
            </h1>
            <p className="text-ink-500 text-[15px] font-sans max-w-md mx-auto leading-relaxed">
              Open to Data Engineering roles, Full-Stack opportunities, and interesting collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Info cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="card">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-sans font-medium text-[13.5px] text-ink-900">Available Now</span>
                </div>
                <p className="text-ink-500 text-[12.5px] leading-relaxed font-sans">
                  Actively looking for Data Engineering and Software Development roles. Response time: usually within 24 hours.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <MapPin size={13} style={{ color: 'var(--accent-dark)' }} />
                  <span className="font-sans font-medium text-[13.5px] text-ink-900">Location</span>
                </div>
                <p className="text-ink-500 text-[13px] font-sans">Nairobi, Kenya 🇰🇪</p>
                <p className="text-ink-300 text-[11px] font-sans mt-1">Open to remote worldwide</p>
              </div>

              <div className="card">
                <h3 className="font-sans font-medium text-[13.5px] text-ink-900 mb-4">Find Me Online</h3>
                <div className="space-y-3">
                  {[
                    { href: 'https://github.com/TofaKM',                   icon: GithubGlyph,   label: 'GitHub',   handle: 'Tofa_KM' },
                    { href: 'https://www.linkedin.com/in/tofa-mwangi',     icon: LinkedinGlyph, label: 'LinkedIn', handle: 'Tofa Mwangi' },
                    { href: 'mailto:mwangitofa@gmail.com',                 icon: Mail,     label: 'Email',    handle: 'mwangitofa@gmail.com' },
                    { href: 'tel:+254759799624',                           icon: Phone,    label: 'Phone',    handle: '0759 799 624' },
                  ].map(({ href, icon: Icon, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-ink-500 hover:text-ink-900 transition-colors group"
                    >
                      <div
                        className="w-8 h-8 rounded-doc border border-[#DCDFDD] flex items-center justify-center bg-white group-hover:border-[#A2793F] transition-colors"
                      >
                        <Icon size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] text-ink-300 font-sans">{label}</div>
                        <div className="text-[12.5px] font-medium font-sans text-ink-700 group-hover:text-ink-900 transition-colors">{handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .15 }}
              className="lg:col-span-3"
            >
              <div className="card">
                {status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: .95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <CheckCircle size={48} className="mb-4" style={{ color: 'var(--accent)' }} />
                    <h3 className="font-serif font-semibold text-2xl text-ink-900 mb-2">Message Sent!</h3>
                    <p className="text-ink-500 text-[13px] font-sans">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                      className="mt-6 text-[12px] font-sans hover:underline"
                      style={{ color: 'var(--accent-dark)' }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { n: 'name',  l: 'Your Name',      p: 'Jane Smith',        t: 'text' },
                        { n: 'email', l: 'Email Address',  p: 'jane@example.com',  t: 'email' },
                      ].map(f => (
                        <div key={f.n}>
                          <label className="block text-[11px] font-medium text-ink-500 font-sans uppercase tracking-wider mb-2">
                            {f.l}
                          </label>
                          <input
                            type={f.t}
                            name={f.n}
                            value={form[f.n as keyof typeof form]}
                            onChange={e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                            placeholder={f.p}
                            required
                            className={inputCls}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-ink-500 font-sans uppercase tracking-wider mb-2">Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                        required
                        className={inputCls + ' appearance-none'}
                      >
                        <option value="">Select a subject...</option>
                        <option value="job">Job Opportunity</option>
                        <option value="freelance">Freelance Project</option>
                        <option value="data">Data Engineering Work</option>
                        <option value="collab">Collaboration</option>
                        <option value="hi">Just saying hi!</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-ink-500 font-sans uppercase tracking-wider mb-2">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell me about your opportunity or project..."
                        required
                        rows={5}
                        className={inputCls + ' resize-none'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-doc font-medium text-[13.5px] font-sans text-white hover:opacity-90 transition-opacity disabled:opacity-60 shadow-sm"
                      style={{ background: 'var(--accent-dark)' }}
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
