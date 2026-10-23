import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import ContactClient from './ContactClient'
export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Tofa Kimani — open to software engineering, full-stack, backend, data engineering, data analytics and DevOps roles.',
  path: '/contact',
})
export default function ContactPage() { return <ContactClient /> }
