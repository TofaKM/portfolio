import type { Metadata } from 'next'
import ContactClient from './ContactClient'
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with Tofa Kimani — open to software engineering, full-stack, backend, data engineering, data analytics and DevOps roles.' }
export default function ContactPage() { return <ContactClient /> }
