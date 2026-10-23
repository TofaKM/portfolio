export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  github?: string
  demo?: string
  /** Public write-up when the source itself is private. */
  caseStudy?: string
  image?: { src: string; alt: string }
  featured: boolean
  category: string
  year: string
  status: 'completed' | 'in-progress'
  /** Shown instead of the generic "In Progress" badge, e.g. "In shop trial". */
  statusNote?: string
}

export type SkillIcon =
  | 'code' | 'workflow' | 'chart' | 'globe' | 'database'
  | 'container' | 'wrench' | 'briefcase' | 'users' | 'sprout'

export interface SkillGroup {
  id: string
  label: string
  icon: SkillIcon
  items: string[]
  /** Short caveat shown under the group title. */
  note?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  initials: string
  text: string
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  location: string
  description: string
  achievements: string[]
  tech: string[]
}

export interface Education {
  school: string
  degree: string
  field: string
  period: string
  location: string
  grade?: string
  details: string[]
  certificate?: string;
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
  icon: 'chart' | 'cpu' | 'wrench' | 'trending-up' | 'code'
  skills: string[]
  status: 'completed' | 'in-progress'
}
