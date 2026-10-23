import type { MetadataRoute } from 'next'
import { navLinks } from '@/components/layout/navLinks'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map(({ href }) => ({
    url: `${siteUrl}${href === '/' ? '' : href}`,
    changeFrequency: 'monthly',
    priority: href === '/' ? 1 : 0.7,
  }))
}
