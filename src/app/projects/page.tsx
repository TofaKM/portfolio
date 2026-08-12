import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'
export const metadata: Metadata = { title: 'Projects', description: 'Full-stack and data engineering projects by Tofa Kimani.' }
export default function ProjectsPage() { return <ProjectsClient /> }
