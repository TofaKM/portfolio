const isDev = process.env.NODE_ENV !== 'production'

/**
 * Content-Security-Policy. Everything is same-origin: fonts are self-hosted
 * by next/font and images go through /_next/image. 'unsafe-inline' for
 * scripts is required by Next's inline hydration scripts on statically
 * rendered pages (a nonce would force every page to render per request);
 * the policy still blocks every external script source, plugins, framing,
 * <base> hijacking and off-site form posts. vercel.live is Vercel's preview
 * toolbar; 'unsafe-eval' is only needed by React in development.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  `connect-src 'self' https://vercel.live wss://ws-us3.pusher.com${isDev ? ' ws:' : ''}`,
  "frame-src https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses with gzip
  compress: true,

  // Optimise local images (profile.jpg via next/image in Sidebar).
  // No remotePatterns needed — project thumbnails (previously hosted on
  // Unsplash) were removed in favour of direct GitHub/project links.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Match real device breakpoints — avoids over-fetching on mobile
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimised images for 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },

  // Tree-shake heavy packages — stops them being bundled per-route
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // HTTP caching headers for static assets.
  // Note: Next.js 16 manages Cache-Control for /_next/static and
  // /_next/image internally and warns if you override them, so those two
  // entries were removed — everything below is genuinely custom.
  async headers() {
    return [
      {
        // Public files (profile.jpg, screenshots, logo) keep their names when
        // replaced, so cache for a day and revalidate in the background
        // rather than pinning an old photo for a month.
        source: '/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Security headers on all pages. (HSTS is added by Vercel. No font
        // preconnect: next/font self-hosts the fonts.)
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy',  value: csp },
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'DENY' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  // Browsers and crawlers still ask for /favicon.ico; point it at the logo.
  async redirects() {
    return [{ source: '/favicon.ico', destination: '/tm_svg.svg', permanent: true }]
  },
}
module.exports = nextConfig
