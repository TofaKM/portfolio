import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import ContactClient from './ContactClient'
export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Tofa Kimani — open to software engineering, AI engineering, full-stack, backend, data engineering, data analytics, IT support and DevOps roles.',
  path: '/contact',
})
export default function ContactPage() { return <ContactClient /> }
