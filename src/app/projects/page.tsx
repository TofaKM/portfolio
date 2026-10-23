import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import ProjectsClient from './ProjectsClient'
export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Full-stack, backend and data engineering projects by Tofa Kimani — from an ERP and point of sale to production-style ETL pipelines.',
  path: '/projects',
})
export default function ProjectsPage() { return <ProjectsClient /> }
