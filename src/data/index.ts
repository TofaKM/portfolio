import { Project, SkillGroup, Testimonial, WorkExperience, Education, Certification } from '@/types'

/** Identity and contact details — the one place the name, title and links live. */
export const profile = {
  name: 'Tofa Kimani Mwangi',
  shortName: 'Tofa Kimani',
  tagline: 'Software Engineer — Full-Stack, Data & Analytics',
  /** Every role I'm ready to step into — used in the hero and metadata. */
  roles: [
    'Software Engineer', 'Full-Stack Developer', 'Backend Developer',
    'Data Engineer', 'Data Analyst', 'DevOps & Deployment',
  ],
  openTo:
    'Open to software engineering, full-stack, backend, data engineering, data analytics and DevOps roles — full-time, contract or freelance, remote or on-site.',
  location: 'Nairobi, Kenya',
  email: 'mwangitofa@gmail.com',
  phone: '+254 759 799 624',
  phoneHref: 'tel:+254759799624',
  github: 'https://github.com/TofaKM',
  linkedin: 'https://www.linkedin.com/in/tofa-mwangi117',
  cv: '/documents/Tofa-CV.pdf',
} as const

/** Display names for Project.category. */
export const categoryLabels: Record<string, string> = {
  fullstack: 'Full-stack',
  data: 'Data engineering',
  ai: 'AI & automation',
}

export const projects: Project[] = [
  {
    id: '5',
    title: 'Job Agent — AI Job-Search Assistant',
    description: 'A local AI job-search agent: collects jobs daily from five sources, screens and deduplicates them, judges fit against my CV with an LLM (Claude), and drafts tailored CVs and cover letters — with code checking every AI output.',
    longDescription: 'Built a local AI job-search agent that collects jobs daily from five sources, including LinkedIn job-alert emails read through the Gmail API with OAuth 2.0, then normalizes, deduplicates (MinHash/LSH) and screens them. It integrates an LLM (Claude) using JSON-schema structured outputs validated with Pydantic, a retry with error feedback, prompt caching and a daily call budget, and treats job postings as untrusted input to resist prompt injection. AI output stays grounded: code computes the match score from the model’s judgements, rejects any cited CV line that doesn’t exist, and checks generated CVs and cover letters for numbers or skills not in the source before rendering PDFs. Covered by 381 automated tests (pytest, saved fixtures, mocked HTTP) and a golden-set evaluation that compares AI recommendations with my own verdicts.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Pydantic', 'Next.js', 'TypeScript', 'Claude API', 'Docker Compose'],
    privateSource: true,
    featured: true,
    category: 'ai',
    year: '2026',
    status: 'in-progress',
    statusNote: 'In daily use',
  },
  {
    id: '4',
    title: 'Agri-Link — ERP & Point of Sale for Agrovets',
    description: 'ERP and point of sale for agrovet shops: the till, stock, purchasing, customer accounts, weekly chick bookings and a double-entry ledger. Now in trial at a real shop in Kenya.',
    longDescription: 'Agri-Link runs a whole agrovet shop — the shops that sell feeds, farm supplies and day-old chicks. A spreadsheet-style till prices from the catalogue and checks stock as you type (cash, M-Pesa, bank or on account); stock is held in lots per warehouse and sold oldest first; purchase orders are received against and flagged when short or dearer; customers carry credit limits and aged balances; and a weekly chick-booking cycle closes every Tuesday into a draft order to the hatchery. Every sale, payment and delivery posts a balanced double-entry transaction to an append-only ledger, and the dashboard checks that the books agree with the stock on the shelves. PostgreSQL row-level security keeps each business’s data separate, idempotency keys stop retried payments being recorded twice, and row locks make the last bag safe to sell from two tills at once. Covered by 106 backend tests against real PostgreSQL (Testcontainers) and end-to-end Playwright tests.',
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Flyway', 'Docker', 'Playwright', 'Testcontainers'],
    caseStudy: 'https://github.com/TofaKM/Agri-Link-Showcase',
    image: {
      src: '/projects/agrilink-dashboard.png',
      alt: 'Agri-Link dashboard: this week’s sales and profit, today’s open work, profit by product, stock on hand and ledger checks',
    },
    featured: true,
    category: 'fullstack',
    year: '2026',
    status: 'in-progress',
    statusNote: 'In shop trial',
  },
  {
    id: '1',
    title: 'Final Year Project — Chap Mall App',
    description: 'Comprehensive e-commerce web application built as KCA University Final Year Project.',
    longDescription: 'Developed a full e-commerce web application as my Final Year Project at KCA University, showcasing full-stack capabilities across the entire development lifecycle — from database design to a deployed frontend. Demonstrates knowledge from Data Analytics, Database Systems, and Software Engineering coursework.',
    tech: ['JavaScript', 'React', 'Node.js', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/TofaKM/Chap-Mall-E-commerce-Website-',
    featured: false,
    category: 'fullstack',
    year: '2025',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Healthcare ETL Pipeline',
    description: 'Production-style ETL pipeline moving raw healthcare CSVs into a PostgreSQL star schema, containerized with Docker.',
    longDescription: 'Built a healthcare data ETL pipeline that extracts CSV source data (admissions, billing, departments, doctors, insurance, lab results, medications, patients, treatments), applies deduplication, data-quality validation, and referential-integrity checks, then loads clean records into a PostgreSQL data warehouse modeled as a star schema — three dimension tables (department, doctor, patient) and six fact tables (admission, treatment, lab, medication, billing, insurance). Uses SQLAlchemy as the ORM/database layer, with the whole pipeline and its Postgres backend containerized via Docker and Docker Compose for one-command setup.',
    tech: ['Python', 'Pandas', 'SQLAlchemy', 'PostgreSQL', 'SQL', 'Docker', 'Docker Compose', 'ETL Pipeline'],
    github: 'https://github.com/TofaKM/etl_hospital_pipeline',
    featured: false,
    category: 'data',
    year: '2026',
    status: 'completed',
  },
  {
  id: '3',
  title: 'Zuri Mobile Customer Churn ETL Pipeline',
  description: 'Production-style telecom customer churn ETL pipeline using PySpark, PostgreSQL, Apache Airflow, and Docker.',
  longDescription: 'Built a production-style telecom customer churn data pipeline that processes 10,000 customer records through schema validation, deduplication, null handling, standardization, and domain validation using PySpark. Designed a PostgreSQL data warehouse using a star schema with customer, plan, usage, interaction, and churn fact/dimension structures. The pipeline is orchestrated with Apache Airflow and fully containerized with Docker Compose, with staging and live database loading designed to keep warehouse updates reliable and repeatable.',
  tech: ['PySpark', 'Python', 'PostgreSQL', 'Apache Airflow', 'Docker', 'Docker Compose', 'ETL Pipeline', 'Data Modeling'],
  github: 'https://github.com/TofaKM/zuri-mobile-churn-pipeline',
  featured: true,
  category: 'data',
  year: '2026',
  status: 'completed',
  },
]

/**
 * Every skill, grouped — the single source for the Skills page, the CV and
 * the home-page preview. No percentages: the grouping and the projects that
 * use each skill say more than a self-scored bar.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'code',
    items: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'C#'],
  },
  {
    id: 'ai',
    label: 'AI & LLM Engineering',
    icon: 'brain',
    items: [
      'LLM Integration (Claude API)', 'Prompt Engineering', 'Structured Outputs (JSON Schema + Pydantic)',
      'AI Output Validation', 'Prompt-Injection Defence', 'Prompt Caching',
    ],
  },
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    icon: 'workflow',
    items: [
      'ETL / ELT Pipelines', 'Apache Spark (PySpark)', 'Apache Airflow', 'Data Modelling',
      'Star-Schema Data Warehousing', 'Relational Modelling (RDBMS)', 'Data Architecture',
      'Big Data Processing', 'Data Cleaning', 'Data Validation & Quality',
    ],
  },
  {
    id: 'analytics',
    label: 'Data & Analytics',
    icon: 'chart',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Excel (Advanced)', 'Jupyter Notebook'],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: 'globe',
    items: ['Next.js', 'React', 'Node.js', 'Express', 'Spring Boot', 'FastAPI', 'Pydantic', 'REST APIs', 'OAuth 2.0', 'HTML / CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'BigQuery', 'Database Design', 'SQLAlchemy', 'Flyway Migrations'],
  },
  {
    id: 'devops',
    label: 'DevOps & Testing',
    icon: 'container',
    items: ['Docker', 'Docker Compose', 'CI/CD Basics', 'Testcontainers', 'Playwright'],
  },
  {
    id: 'it-support',
    label: 'IT Support',
    icon: 'monitor',
    items: ['IT Support', 'Networking', 'Hardware Troubleshooting', 'Software Troubleshooting', 'Network Troubleshooting'],
  },
  {
    id: 'tools',
    label: 'Tools & Office',
    icon: 'wrench',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Anaconda', 'Microsoft Word', 'Microsoft PowerPoint'],
  },
  {
    id: 'professional',
    label: 'Professional Skills',
    icon: 'briefcase',
    items: [
      'Project Development', 'Documentation', 'Analytical Thinking', 'Technical Troubleshooting',
      'System Optimization', 'Database Management', 'Debugging', 'Automation', 'Prompt Engineering',
      'Technical Support', 'Agile / Scrum', 'Test-Driven Development',
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    icon: 'users',
    items: [
      'Teamwork', 'Collaboration', 'Communication', 'Presentation', 'Leadership', 'Decision-Making',
      'Problem-Solving', 'Critical Thinking', 'Time Management', 'Adaptability',
    ],
  },
  {
    id: 'learning',
    label: 'Currently Learning',
    icon: 'sprout',
    note: 'Next on the list — not yet shown in a finished project.',
    items: ['Cloud Databases', 'C++ Fundamentals'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Faith Muna',
    role: 'Claim Officer',
    company: 'Social Health Authority, Nanyuki',
    initials: 'FM',
    text: 'Tofa was a reliable and diligent IT intern. He brought a data-first mindset to everything — from data cleaning to system support — and consistently delivered work that was accurate and on time.',
  },
  {
    id: '2',
    name: 'Dacosta Otekoh',
    role: 'HR Manager',
    company: 'Beisa Hotel',
    initials: 'DO',
    text: 'Tofa is a fast learner, highly analytical, and flexible with his time. He adapted quickly to new tasks and consistently delivered accurate, reliable work while working remotely.'
  },
  {
    id: '3',
    name: 'Francis Ngugi',
    role: 'Software Engineer',
    company: 'Reina Classic, Nairobi',
    initials: 'FN',
    text: 'A hard-working and fast-learning developer. Tofa\'s ability to pick up new tools and apply them to real problems is impressive. He is professional, collaborative, and genuinely committed to growing his craft.',
  },
]

export const workExperience: WorkExperience[] = [
  {
    company: 'Agrovet shop, Kenya',
    type: 'Freelance',
    role: 'Full-Stack Software Engineer — Agri-Link ERP & Point of Sale',
    period: '2026 – Present',
    location: 'Kenya',
    description: 'Designed, built and deployed Agri-Link, an ERP and point-of-sale system for an agrovet that sells feeds, farm supplies and day-old chicks. Took it from the shop’s own spreadsheets to a working system now in trial at the till.',
    achievements: [
      'Gathered requirements with the owner and staff, then modelled the whole shop: till, stock and warehouses, purchasing, customer accounts and a weekly chick-booking cycle',
      'Built the backend in Java 21 and Spring Boot with a PostgreSQL 16 database (35 Flyway migrations, row-level security, JWT auth and role checks on every route)',
      'Built the frontend in Next.js, React and TypeScript, including one spreadsheet-style grid used by every screen so staff work the way they did in Excel',
      'Made every sale, payment and delivery post a balanced double-entry transaction to an append-only ledger, with dashboard checks that the books match the stock',
      'Made money and stock safe under real use: idempotency keys against double-recorded payments, row locks for two tills selling the last bag at once',
      'Covered the system with 106 backend tests against real PostgreSQL (Testcontainers) and end-to-end Playwright tests, and run it with Docker Compose',
    ],
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Next.js', 'React', 'TypeScript', 'Docker', 'Playwright'],
    link: { href: 'https://github.com/TofaKM/Agri-Link-Showcase', label: 'Case study & screens' },
  },
  {
    company: 'Minerva Analytics',
    role: 'Virtual Assistant / Corporate Governance Data Analyst',
    period: 'January 2026 – April 2026',
    location: 'Remote',
    description: 'Provided virtual assistance and corporate governance data support to Dacosta Otekoh, contributing to the collection, validation, and organization of company and board-level information across global markets.',
    achievements: [
      'Reviewed public company filings, annual reports, and proxy statements to identify and document board structure changes, executive leadership updates, and committee appointments',
      'Captured, verified, and maintained financial metrics, director independence information, and corporate governance data with a high level of accuracy',
      'Assisted Dacosta Otekoh with research, data entry, data validation, document review, and organization of governance-related information',
      'Supported virtual administrative and data management tasks, ensuring information was accurately recorded, organized, and delivered within required timelines',
      'Conducted detailed online research and cross-checked information from multiple sources to improve data accuracy and reliability'
    ],
    tech: ['Corporate Governance Research', 'Data Analysis', 'Data Validation', 'Excel', 'Online Research', 'Virtual Assistance'],
  },
  {
    company: 'Social Health Authority',
    role: 'IT Intern',
    period: 'September 2024 – December 2024',
    location: 'Nanyuki, Kenya',
    description: 'Provided technical support and data operations for a government health institution serving the Nanyuki region.',
    achievements: [
      'Provided technical support for computer systems, networks, and user applications ensuring reliable performance',
      'Performed data entry, data cleaning, and report preparation using Excel and internal tools',
      'Assisted with system maintenance, troubleshooting, and basic hardware/software diagnostics',
      'Collaborated with teams to improve IT workflows and enhance data accuracy and efficiency',
    ],
    tech: ['Excel', 'Data Cleaning', 'IT Support', 'Networking', 'Troubleshooting'],
  },
]

export const education: Education[] = [
  {
    school: 'ALX Africa',
    degree: 'Data Engineering Program',
    field: 'Data Engineering',
    period: 'March 2025 – August 2026',
    location: 'Remote / Online',
    grade: 'Complete',
    certificate: 'https://ehub.alxafrica.com/ob3/verify-certificate/aac32928-744d-42d4-beff-85b393b73d1a',
    details: [
      'Completed the ALX Data Engineering Program with practical training in data engineering, data pipelines, and big-data processing',
      'Developed hands-on skills in Python, SQL, PostgreSQL, PySpark, Apache Airflow, and Docker',
      'Built and automated ETL/ELT pipelines for data cleaning, transformation, validation, and processing',
      'Designed data warehouses using dimensional modeling and star-schema architecture',
      'Completed real-world projects focused on data processing, analytics, pipeline orchestration, and data quality',
    ],
  },
  {
    school: 'KCA University',
    degree: 'Bachelor of Science (BSc)',
    field: 'Applied Computing / Computer Science',
    period: 'September 2020 – November 2025',
    location: 'Nairobi, Kenya',
    grade: 'Graduate',
    details: [
      'Studied Data Analytics, Database Systems, Software Engineering, and Systems Analysis & Design',
      'Programming Concepts & Languages across multiple paradigms',
      'Final Year Project: full-stack e-commerce application using JavaScript, Node.js, React, and MySQL',
    ],
  },
  {
    school: 'Ndururumo High School',
    degree: 'Kenya Certificate of Secondary Education',
    field: 'Sciences & Computing',
    period: 'January 2016 – November 2019',
    location: 'Nyahururu, Kenya',
    grade: 'B+ (71)',
    details: [
      'Studied Mathematics, Physics, Chemistry, Geography, Computer Studies, and CRE',
      'Active in student leadership — served as Academic Secretary in final year',
      'Participated in the National Mathematics Competition',
    ],
  },
]

export const certifications: Certification[] = [
  {
    id: 'cisco-data-analytics-2024',
    name: 'Data Analytics',
    issuer: 'Cisco Academy',
    date: 'August 2024',
    credentialUrl: 'https://www.credly.com/badges/aa459c6a-f252-45e4-b56a-49f9cd516354/public_url',
    icon: 'chart',
    skills: ['Data Analysis', 'Data Cleaning', 'Visualization', 'Excel', 'SQL', 'Python'],
    status: 'completed',
  },
  {
    id: 'cisco-ibm-intro-ml-2025',
    name: 'Introduction to Machine Learning',
    issuer: 'Cisco IBM',
    date: 'February 2025',
    credentialUrl: 'https://www.credly.com/badges/d380bf99-8288-47f9-9883-c848a62d8460/public_url',
    icon: 'cpu',
    skills: ['Machine Learning', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Python'],
    status: 'completed',
  },
  {
    id: 'alx-data-engineering-program',
    name: 'ALX Data Engineering Program',
    issuer: 'ALX Africa',
    date: 'August 2026',
    credentialUrl: 'https://ehub.alxafrica.com/ob3/verify-certificate/aac32928-744d-42d4-beff-85b393b73d1a',
    icon: 'wrench',
    skills: ['Data Pipelines', 'Big Data', 'Python', 'SQL', 'ETL','Apache Spark','Apache Airflow','Data Warehouse'],
    status: 'completed',
  },
  {
    id: 'alx-data-analytics-2025',
    name: 'Data Analytics',
    issuer: 'ALX Africa',
    date: '26 September 2025',
    credentialUrl: 'https://savanna.alxafrica.com/certificates/97rGSZN3hJ',
    icon: 'trending-up',
    skills: ['SQL / MySQL', 'Power BI', 'Data Cleaning', 'Analysis', 'Reporting'],
    status: 'completed',
  },
  {
    id: 'alx-python-2026',
    name: 'Python',
    issuer: 'ALX Africa',
    date: '23 April 2026',
    credentialUrl: 'https://savanna.alxafrica.com/certificates/n8CmfHBhPR',
    icon: 'code',
    skills: ['Pandas', 'NumPy', 'SciPy', 'ETL Pipelines', 'Statistical Testing'],
    status: 'completed',
  },
]
