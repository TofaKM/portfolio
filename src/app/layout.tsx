import type { Metadata } from 'next'
import { Source_Serif_4, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactFab from '@/components/layout/ContactFab'
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tofa-mwangi.vercel.app'

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

/* Scroll reveal, run before first paint and before React hydrates (see the
   .reveal notes in globals.css). Marks <html class="js"> so .reveal elements
   may start hidden, then sets data-shown on each as it scrolls into view.
   A MutationObserver picks up elements added by client-side navigation.
   No IntersectionObserver → never hide anything. */
const revealScript = `(function(){
  var d=document.documentElement;
  if(!('IntersectionObserver' in window))return;
  d.classList.add('js');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.setAttribute('data-shown','');io.unobserve(e.target);}
  });},{rootMargin:'0px 0px -40px 0px'});
  function scan(){document.querySelectorAll('.reveal:not([data-shown])').forEach(function(el){io.observe(el);});}
  new MutationObserver(scan).observe(d,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',scan);
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="bg-cream-100 text-ink-900 min-h-screen flex flex-col">
        <Navbar />
        <ScrollProgress />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <ContactFab />
      </body>
    </html>
  )
}
