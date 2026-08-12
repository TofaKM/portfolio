import type { Metadata } from 'next'
import ContactClient from './ContactClient'
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with Tofa Kimani — open to data engineering and developer opportunities.' }
export default function ContactPage() { return <ContactClient /> }
