'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { GithubGlyph, LinkedinGlyph } from '@/components/icons/BrandGlyphs'
import { SUBJECTS, LIMITS, validateContact, type ContactErrors, type ContactInput } from '@/lib/contact'
import { delay } from '@/lib/delay'

const EMPTY: ContactInput = { name: '', email: '', subject: '', message: '' }
const CONTACT_EMAIL = 'mwangitofa@gmail.com'

export default function ContactClient() {
  const [form, setForm] = useState<ContactInput>(EMPTY)
  const [website, setWebsite] = useState('') // honeypot
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const update = (field: keyof ContactInput, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear a field's error as soon as the visitor starts fixing it.
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validateContact(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('sent')
        return
      }
      if (data.errors) setErrors(data.errors)
      setServerError(data.error ?? 'Something went wrong.')
      setStatus('error')
    } catch {
      setServerError('Couldn’t reach the server — check your connection.')
      setStatus('error')
    }
  }

  const inputCls = (invalid: boolean) => `
    w-full px-4 py-2.5 rounded-doc bg-white border
    ${invalid ? 'border-red-600' : 'border-[#DCDFDD]'}
    text-ink-900 placeholder-ink-300
    focus:outline-none focus:border-[#A2793F]
    transition-colors text-[13px] font-sans
  `
  const labelCls = 'block text-[11px] font-medium text-ink-500 font-sans uppercase tracking-wider mb-2'

  const fieldError = (field: keyof ContactInput) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 text-[11.5px] text-red-700 font-sans">
        {errors[field]}
      </p>
    ) : null

  const a11y = (field: keyof ContactInput) => ({
    id: `contact-${field}`,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  })

  return (
    <div>
      <section className="pt-14 pb-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="eyebrow mb-3">Get In Touch</p>
            <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-900 tracking-[-0.02em] mb-3">
              Let&rsquo;s <span className="italic text-accent-dark">Connect</span>
            </h1>
            <p className="text-ink-500 text-[15px] font-sans max-w-2xl leading-relaxed">
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
                    { href: 'https://github.com/TofaKM',                   icon: GithubGlyph,   label: 'GitHub',   handle: 'Tofa_KM',             external: true },
                    { href: 'https://www.linkedin.com/in/tofa-mwangi',     icon: LinkedinGlyph, label: 'LinkedIn', handle: 'Tofa Mwangi',         external: true },
                    { href: `mailto:${CONTACT_EMAIL}`,                     icon: Mail,          label: 'Email',    handle: CONTACT_EMAIL,         external: false },
                    { href: 'tel:+254759799624',                           icon: Phone,         label: 'Phone',    handle: '0759 799 624',        external: false },
                  ].map(({ href, icon: Icon, label, handle, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
            <div style={delay(120)} className="enter lg:col-span-3">
              <div className="card">
                {status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: .95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                    role="status"
                  >
                    <CheckCircle size={48} className="mb-4" style={{ color: 'var(--accent)' }} />
                    <h3 className="font-serif font-semibold text-2xl text-ink-900 mb-2">Message Sent!</h3>
                    <p className="text-ink-500 text-[13px] font-sans">
                      Thanks for reaching out. I&rsquo;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm(EMPTY); setErrors({}) }}
                      className="mt-6 text-[12px] font-sans hover:underline"
                      style={{ color: 'var(--accent-dark)' }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {status === 'error' && (
                      <div role="alert" className="flex items-start gap-2.5 p-3.5 rounded-doc border border-red-200 bg-red-50 text-[12.5px] text-red-800 font-sans">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" aria-hidden />
                        <p>
                          {serverError}{' '}
                          You can email me directly at{' '}
                          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">{CONTACT_EMAIL}</a>.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className={labelCls}>Your Name</label>
                        <input
                          {...a11y('name')}
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder="Jane Smith"
                          maxLength={LIMITS.name.max}
                          required
                          className={inputCls(!!errors.name)}
                        />
                        {fieldError('name')}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelCls}>Email Address</label>
                        <input
                          {...a11y('email')}
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={e => update('email', e.target.value)}
                          placeholder="jane@example.com"
                          maxLength={LIMITS.email.max}
                          required
                          className={inputCls(!!errors.email)}
                        />
                        {fieldError('email')}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className={labelCls}>Subject</label>
                      <select
                        {...a11y('subject')}
                        name="subject"
                        value={form.subject}
                        onChange={e => update('subject', e.target.value)}
                        required
                        className={inputCls(!!errors.subject)}
                      >
                        <option value="">Select a subject...</option>
                        {Object.entries(SUBJECTS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      {fieldError('subject')}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between">
                        <label htmlFor="contact-message" className={labelCls}>Message</label>
                        <span className="text-[10.5px] text-ink-300 font-mono" aria-hidden>
                          {form.message.length}/{LIMITS.message.max}
                        </span>
                      </div>
                      <textarea
                        {...a11y('message')}
                        name="message"
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        placeholder="Tell me about your opportunity or project..."
                        maxLength={LIMITS.message.max}
                        required
                        rows={6}
                        className={inputCls(!!errors.message) + ' resize-y min-h-[140px]'}
                      />
                      {fieldError('message')}
                    </div>

                    {/* Honeypot — hidden from people and screen readers; bots fill it in. */}
                    <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn btn-primary w-full py-3.5"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
