import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <p className="font-serif font-bold text-8xl" style={{ color: 'var(--accent)', opacity: .3 }}>404</p>
        <h1 className="font-serif font-semibold text-3xl text-ink-900 mb-3 -mt-4">Page not found</h1>
        <p className="text-ink-500 text-[14px] font-sans mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-doc font-medium text-[13.5px] font-sans text-white hover:opacity-90 transition-opacity shadow-sm"
          style={{ background: 'var(--accent-dark)' }}
        >
          ← Back Home
        </Link>
      </div>
    </div>
  )
}
