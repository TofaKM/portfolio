export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
  category: string
  year: string
  status: 'completed' | 'in-progress'
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' |'data-engineering'
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
