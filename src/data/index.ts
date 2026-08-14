import { Project, Skill, Testimonial, WorkExperience, Education, Certification } from '@/types'

export const projects: Project[] = [
 
  {
    id: '1',
    title: 'Final Year Project — Chap Mall App',
    description: 'Comprehensive e-commerce web application built as KCA University Final Year Project.',
    longDescription: 'Developed a full e-commerce web application as my Final Year Project at KCA University, showcasing full-stack capabilities across the entire development lifecycle — from database design to a deployed frontend. Demonstrates knowledge from Data Analytics, Database Systems, and Software Engineering coursework.',
    tech: ['JavaScript', 'React', 'Node.js', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/TofaKM',
    demo: 'https://github.com/TofaKM',
    featured: true,
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
    featured: true,
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

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', level: 80, category: 'frontend' },
  { name: 'Next.js', level: 75, category: 'frontend' },
  { name: 'JavaScript', level: 82, category: 'frontend' },
  { name: 'Bootstrap', level: 75, category: 'frontend' },
  { name: 'HTML / CSS', level: 85, category: 'frontend' },
  { name: 'Tailwind.css', level: 85, category: 'frontend' },
  // Backend
  { name: 'Node.js', level: 78, category: 'backend' },
  { name: 'Express', level: 75, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  { name: 'REST APIs', level: 80, category: 'backend' },
  { name: 'C#', level: 60, category: 'backend' },
  // Database
 
  { name: 'PostgreSQL', level: 72, category: 'database' },
  { name: 'MongoDB', level: 65, category: 'database' },
  { name: 'Database Design', level: 78, category: 'database' },
  // DevOps / Data
  { name: 'Pandas', level: 82, category: 'devops' },
  { name: 'NumPy', level: 78, category: 'devops' },
  { name: 'Matplotlib', level: 75, category: 'devops' },
  { name: 'Power BI', level: 80, category: 'devops' },
  // Tools
  { name: 'Git / GitHub', level: 85, category: 'tools' },
  { name: 'Docker', level: 68, category: 'tools' },
  { name: 'Excel', level: 88, category: 'tools' },
  { name: 'VS Code', level: 92, category: 'tools' },
  { name: 'Postman', level: 75, category: 'tools' },
  //Data Engineering
  { name: 'Python', level: 80, category: 'data-engineering' },
{ name: 'Pandas', level: 80, category: 'data-engineering' },
{ name: 'NumPy', level: 75, category: 'data-engineering' },
{ name: 'Jupyter Notebook', level: 85, category: 'data-engineering' },
{ name: 'Anaconda', level: 80, category: 'data-engineering' },
{ name: 'Excel (Advanced)', level: 85, category: 'data-engineering' },
{ name: 'MySQL', level: 80, category: 'data-engineering' },
{ name: 'PostgreSQL', level: 80, category: 'data-engineering' },
{ name: 'BigQuery', level: 75, category: 'data-engineering' },
{ name: 'Git', level: 80, category: 'data-engineering' },
{ name: 'GitHub', level: 80, category: 'data-engineering' },
{ name: 'CI/CD Basics', level: 65, category: 'data-engineering' },
{ name: 'Docker', level: 75, category: 'data-engineering' },
{ name: 'Docker Images', level: 70, category: 'data-engineering' },
{ name: 'Apache Spark', level: 70, category: 'data-engineering' },
{ name: 'Apache Airflow', level: 70, category: 'data-engineering' },
{ name: 'ETL Pipelines', level: 75, category: 'data-engineering' },
{ name: 'Data Cleaning', level: 80, category: 'data-engineering' },
{ name: 'Big Data Processing', level: 70, category: 'data-engineering' },
{ name: 'Data Modelling', level: 75, category: 'data-engineering' },
{ name: 'Relational Modeling (RDBMS)', level: 75, category: 'data-engineering' },
{ name: 'Data Warehousing Concepts', level: 75, category: 'data-engineering' },
{ name: 'Data Architecture', level: 70, category: 'data-engineering' },

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
    company: 'Reina Classic -Nairobi',
    initials: 'FN',
    text: 'A hard-working and fast-learning developer. Tofa\'s ability to pick up new tools and apply them to real problems is impressive. He is professional, collaborative, and genuinely committed to growing his craft.',
  },
]

export const workExperience: WorkExperience[] = [
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
  {
    company: 'Minerva Analytics',
    role: 'Virtual Assistant / Corporate Governance Data Analyst',
    period: 'January 2026 – April 2026',
    location: 'Remote',
    description: 'Provided virtual assistance and corporate governance data support to DaCosta, contributing to the collection, validation, and organization of company and board-level information across global markets.',
    achievements: [
      'Reviewed public company filings, annual reports, and proxy statements to identify and document board structure changes, executive leadership updates, and committee appointments',
      'Captured, verified, and maintained financial metrics, director independence information, and corporate governance data with a high level of accuracy',
      'Assisted Dacosta Otekoh with research, data entry, data validation, document review, and organization of governance-related information',
      'Supported virtual administrative and data management tasks, ensuring information was accurately recorded, organized, and delivered within required timelines',
      'Conducted detailed online research and cross-checked information from multiple sources to improve data accuracy and reliability'
    ],
    tech: ['Corporate Governance Research', 'Data Analysis', 'Data Validation', 'Excel', 'Online Research', 'Virtual Assistance'],
  },
]

export const education: Education[] = [
  {
    school: 'KCA University',
    degree: 'Bachelor of Science (BSc)',
    field: 'Applied Computing / Computer Science',
    period: 'September 2020 – November 2025',
    location: 'Nairobi, Kenya',
    grade: 'Graduate',
    certificate:'/documents/Tofa_Certificate.pdf',
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
    grade: 'B+ (71) ',
    details: [
      'Studied Mathematics, Physics, Chemistry, Geography, Computer Studies, and CRE',
      'Active in student leadership — served as Academic Secretary in final year',
      'Participated in the National Mathematics Competition',
    ],
  },
  {
    school: 'ALX Africa',
    degree: 'Data Engineering Program',
    field: 'Data Engineering',
    period: 'March 2025 – Present',
    location: 'Remote / Online',
    grade: 'In Progress',
    details: [
      'Learning data engineering concepts, data pipelines, and big-data processing',
      'Working with Python, SQL, and modern data technologies',
      'Completing hands-on projects focused on data processing and analytics',
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
    date: 'March 2025 – Present',
    icon: 'wrench',
    skills: ['Data Pipelines', 'Big Data', 'Python', 'SQL', 'ETL'],
    status: 'in-progress',
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
    date: '17 April 2026',
    credentialUrl: 'https://savanna.alxafrica.com/certificates/n8CmfHBhPR',
    icon: 'code',
    skills: ['Pandas', 'NumPy', 'SciPy', 'ETL Pipelines', 'Statistical Testing'],
    status: 'completed',
  },
]
