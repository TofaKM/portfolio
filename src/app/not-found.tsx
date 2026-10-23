import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <p className="font-serif font-bold text-8xl text-accent opacity-30">404</p>
        <h1 className="font-serif font-semibold text-3xl text-ink-900 mb-3 -mt-4">Page not found</h1>
        <p className="text-ink-500 text-[14px] font-sans mb-8 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary px-6 py-3">
          ← Back Home
        </Link>
      </div>
    </div>
  )
}
