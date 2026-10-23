import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'
export const metadata: Metadata = { title: 'Projects', description: 'Full-stack, backend and data engineering projects by Tofa Kimani — from an ERP and point of sale to production-style ETL pipelines.' }
export default function ProjectsPage() { return <ProjectsClient /> }
