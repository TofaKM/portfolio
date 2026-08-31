import type { Metadata } from 'next'
import { Source_Serif_4, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import PageTransition from '@/components/ui/PageTransition'
import ScrollProgress from '@/components/ui/ScrollProgress'

// next/font automatically:
// - Self-hosts the font (zero Google request at runtime)
// - Adds font-display: swap
// - Subsets to only used characters
// - Generates zero layout shift

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tofa-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons:{
    icon:'/tm_svg.svg'
  },
  title: { default: 'Tofa Kimani Mwangi — Data Engineer & Developer', template: '%s | Tofa Kimani' },
  description: 'Data Engineer and Full-Stack Developer from Nairobi, Kenya. Specialising in Python, SQL, React, and data pipelines. BSc Applied Computing — KCA University.',
  keywords: ['Data Engineer', 'Software Developer', 'Python', 'SQL', 'React', 'Nairobi', 'Kenya', 'KCA University', 'ALX'],
  authors: [{ name: 'Tofa Kimani Mwangi' }],
  creator: 'Tofa Kimani Mwangi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tofa Kimani Portfolio',
    title: 'Tofa Kimani Mwangi — Data Engineer & Developer',
    description: 'Data Engineer and Full-Stack Developer from Nairobi, Kenya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tofa Kimani Mwangi — Data Engineer & Developer',
    description: 'Data Engineer and Full-Stack Developer from Nairobi, Kenya.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-cream-100 text-ink-900">
        <ScrollProgress />
        <div className="flex min-h-screen">
          <Sidebar />
          <main id="main" className="flex-1 pt-16 md:pt-0 md:ml-[260px] min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </div>
      </body>
    </html>
  )
}
