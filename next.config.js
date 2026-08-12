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
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // HTTP caching headers for static assets.
  // Note: Next.js 16 manages Cache-Control for /_next/static and
  // /_next/image internally and warns if you override them, so those two
  // entries were removed — everything below is genuinely custom.
  async headers() {
    return [
      {
        // Cache public assets (profile.jpg etc) for 30 days
        source: '/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Security + performance headers on all pages
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          // Tell browser to preconnect to Google Fonts early
          {
            key: 'Link',
            value: '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin',
          },
        ],
      },
    ]
  },
}
module.exports = nextConfig
