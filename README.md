# Tofa Kimani Mwangi — Portfolio

> Personal portfolio website for Tofa Kimani Mwangi — Data Engineer & Full-Stack Developer based in Nairobi, Kenya.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3-ff0066?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## Live Site

[tofakimani.dev](https://tofakimani.dev)

---

## What This Is

A production-grade personal portfolio showcasing projects, skills, work experience, blog posts, and a downloadable CV. Built from scratch with a focus on editorial design, smooth animations, and fast load times.

The design language is inspired by [saumyachaturvedi.com](https://saumyachaturvedi.com) — a minimal, creamy, editorial aesthetic using serif typography and warm neutral tones.

---

## Tech Stack

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 14.2.5 | React framework — App Router, SSR, image optimisation |
| [React](https://react.dev) | 18.3.1 | UI component library |
| [TypeScript](https://typescriptlang.org) | 5.5 | Static typing throughout |

### Styling

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | 3.4.7 | Utility-first CSS |
| [PostCSS](https://postcss.org) | 8.4 | CSS transformation pipeline |
| [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) | built-in | Self-hosted fonts with zero layout shift |

**Font pairing:**
- **Playfair Display** (400, 600, 700 — normal & italic) — headings, editorial display text
- **Inter** (400, 500, 600) — body copy, UI labels, navigation
- **JetBrains Mono** (400, 500) — metadata, tags, code snippets

**Custom colour system:**

```
cream-100  #F8F6F2   — page background
cream-200  #F1EEE8   — sidebar background
border     #E5E1D8   — all dividers and card borders
accent     #D6B98C   — warm gold, progress bars, decorative lines
accent-dark #B8956A  — CTAs, active states, hover text
ink-900    #1F1F1F   — primary text
ink-500    #6B6B6B   — secondary / body text
ink-300    #A8A8A8   — metadata, timestamps, placeholders
```

### Animation

| Technology | Version | Purpose |
|---|---|---|
| [Framer Motion](https://www.framer.com/motion) | 11.3.19 | Page transitions, scroll animations, micro-interactions |

Animation principles applied:
- `viewport: { once: true }` on all scroll-triggered animations — fire once, never repeat
- `willChange: 'transform'` on continuously animating elements — GPU-only compositing
- No `filter: blur()` inside `animate={}` — causes full-page repaints
- CSS `transform: rotate()` for the profile ring — GPU thread only
- Stagger delays kept under 35ms per item — prevents perceived sluggishness

### Utilities

| Package | Purpose |
|---|---|
| [lucide-react](https://lucide.dev) | Icon library (0.417.0) |
| [clsx](https://github.com/lukeed/clsx) | Conditional className helper |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Merge Tailwind classes without conflicts |

---

## Project Structure

```
tofa-portfolio/
├── public/
│   └── profile.jpg              # Graduation photo — sidebar avatar
│
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout — Sidebar + PageTransition + ScrollProgress
│   │   ├── page.tsx             # Home — Hero, Featured Projects, Skills, Blog, CTA
│   │   ├── about/page.tsx       # About — Bio, philosophy cards, timeline
│   │   ├── projects/
│   │   │   ├── page.tsx         # Server shell
│   │   │   └── ProjectsClient.tsx  # Client — filter tabs + project grid
│   │   ├── skills/page.tsx      # Skills — category groups + animated progress bars
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog index — featured post + card grid
│   │   │   └── [slug]/page.tsx  # Blog post — markdown-style content renderer
│   │   ├── cv/page.tsx          # CV — work, education, certs, skills, projects
│   │   ├── contact/
│   │   │   ├── page.tsx         # Server shell
│   │   │   └── ContactClient.tsx  # Client — contact form with send state
│   │   ├── globals.css          # Design tokens, card styles, animations
│   │   ├── loading.tsx          # Loading skeleton
│   │   └── not-found.tsx        # 404 page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.tsx      # Fixed sidebar — photo, nav, socials, mobile drawer
│   │   │
│   │   ├── sections/            # Full-width page sections
│   │   │   ├── HeroSection.tsx      # Animated hero — typewriter, floating orbs, stats
│   │   │   ├── FeaturedProjects.tsx # Alternating project layout cards
│   │   │   ├── SkillsPreview.tsx    # 4-column skill category preview
│   │   │   ├── TimelineSection.tsx  # Work + education dual timeline
│   │   │   └── Testimonials.tsx     # Testimonial cards grid
│   │   │
│   │   └── ui/                  # Reusable UI primitives
│   │       ├── BlogCard.tsx         # Blog post card with next/image
│   │       ├── ProjectCard.tsx      # Project card with next/image
│   │       ├── SectionHeading.tsx   # Eyebrow + title + subtitle with sweep animation
│   │       ├── PageTransition.tsx   # Route change fade animation
│   │       └── ScrollProgress.tsx   # Reading progress bar (sidebar-offset)
│   │
│   ├── data/
│   │   └── index.ts             # All content — projects, skills, blog, experience, certs
│   │
│   └── types/
│       └── index.ts             # TypeScript interfaces for all data models
│
├── next.config.js               # Image optimisation, caching headers, compression
├── tailwind.config.ts           # Custom colours, fonts (via CSS vars), keyframes
├── vercel.json                  # Deployment config — region, build commands
└── tsconfig.json                # TypeScript config with @/* path alias
```

---

## Pages & Routes

| Route | Type | Description |
|---|---|---|
| `/` | Server | Home — hero, featured projects, skills preview, blog preview, CTA |
| `/about` | Server | Bio, philosophy, work & education timeline |
| `/projects` | Client | Filterable project grid (all / fullstack / data) |
| `/skills` | Client | Full skills breakdown by category with progress bars |
| `/blog` | Server | Featured post + article card grid |
| `/blog/[slug]` | Server | Individual blog post with content renderer |
| `/cv` | Server | Complete CV — experience, education, certifications, tech skills |
| `/contact` | Client | Contact form with subject dropdown and send state |

---

## Design System

### Layout

The site uses a **fixed left sidebar + scrollable main content** layout:

```
┌──────────────┬──────────────────────────────────┐
│              │                                  │
│   SIDEBAR    │         MAIN CONTENT             │
│   260px      │         flex-1                   │
│   fixed      │         scrollable               │
│              │         max-w-5xl mx-auto         │
│              │         px-8 md:px-14            │
└──────────────┴──────────────────────────────────┘
```

On mobile, the sidebar becomes a **slide-out drawer** triggered by a hamburger button. The main content becomes full width.

### Sidebar

- Profile photo with animated conic-gradient ring (CSS `transform: rotate` — GPU only)
- Name, role, location, availability indicator
- Vertical navigation with `layoutId` spring-animated active indicator
- Icon micro-wiggle on hover (Framer Motion)
- Social links with lift animation
- Staggered entrance animation on mount (35ms per item)

### Cards

All cards follow a single `.card` class:

```css
background: white;
border: 1px solid #E5E1D8;
border-radius: 12px;
padding: 1.5rem;
transition: box-shadow 0.22s, transform 0.22s;
```

Hover: `translateY(-3px)` + deeper shadow. No gradients, no glow effects.

### Typography Scale

```
Display (hero name)   clamp(48px, 8vw, 82px)  Playfair Display Bold Italic
H1 (page titles)      text-4xl / text-5xl      Playfair Display Semibold
H2 (section titles)   text-3xl / text-4xl      Playfair Display Semibold
H3 (card titles)      text-[15px]              Playfair Display Semibold
Body                  text-[14.5px]            Inter Regular
Small / meta          text-[11-12px]           Inter / JetBrains Mono
```

---

## Performance Optimisations

Every optimisation applied in this project and why it matters:

### Images
- All images use `next/image` with `fill`, `sizes`, and `loading="lazy"`
- Next.js automatically serves **AVIF** (50% smaller than WebP) or **WebP** (30% smaller than JPEG) based on browser support
- Raw `<img>` tags were completely eliminated — they load full-size images with no lazy loading
- Profile photo uses `priority` and `loading="eager"` — it's above the fold in the sidebar
- Image cache TTL set to 60 days

### Fonts
- Replaced Google Fonts `<link>` tags with `next/font/google`
- Fonts are **downloaded at build time and self-hosted** — zero external requests at runtime
- `font-display: swap` built in — text shows in fallback font immediately
- Only the weights actually used are loaded (3 weights per family, not 6)
- The `@import` in `globals.css` was a duplicate load — removed

### JavaScript
- `optimizePackageImports: ['framer-motion', 'lucide-react']` — prevents these large libraries from being bundled multiple times across routes
- `swcMinify: true` — SWC is 20× faster than Terser and produces equally small output

### Animations
- Removed `filter: blur()` from `PageTransition` — CSS blur forces full-page GPU repaints on every frame
- Removed `scale` from floating orb animations — scale changes trigger layout recalculation
- Added `willChange: 'transform'` to continuously animating elements — promotes to own GPU layer
- Sidebar gradient ring uses CSS `conic-gradient` + `transform: rotate()` instead of animating `backgroundPosition` (which forces style recalculation)
- Skill bar durations reduced from 1000ms → 600ms
- Sidebar stagger tightened: `55ms/item` → `35ms/item`
- `ScrollProgress` uses direct `scrollYProgress` — removed `useSpring` which added artificial lag

### HTTP Caching

| Asset | Cache Duration | Strategy |
|---|---|---|
| JS / CSS chunks | 1 year | `immutable` — hash changes on every build |
| Optimised images | 7 days | `stale-while-revalidate` |
| Public assets (photos, fonts) | 30 days | `stale-while-revalidate` |

### Compression
- `compress: true` in `next.config.js` — gzip on all server responses
- HTML, JS, and CSS are typically **60–80% smaller** over the wire

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Install & Run

```bash
# Clone or unzip the project
cd tofa-refactored

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Deployment

The project is configured for **Vercel** deployment out of the box.

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Deploy via GitHub

1. Push the project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — no configuration needed
5. Click Deploy

`vercel.json` is pre-configured with:
- **Region:** `fra1` (Frankfurt) — optimal latency for East Africa
- Framework: `nextjs`
- Build, dev, and install commands

---

## Content Management

All content lives in a single file: `src/data/index.ts`

To update content, edit that file directly. No CMS, no database.

### Data Structures

```typescript
// Add a project
projects: Project[] = [{
  id, title, description, longDescription,
  image,    // Unsplash URL
  tech,     // string[]
  github, demo,
  featured, // shows on home page
  category, // 'fullstack' | 'data'
  year,
}]

// Add a blog post
blogPosts: BlogPost[] = [{
  id, slug, title, excerpt, content,
  date, readTime, tags, image,
}]

// Add a skill
skills: Skill[] = [{
  name, icon,   // emoji
  level,        // 0-100
  category,     // 'frontend' | 'backend' | 'database' | 'devops' | 'tools'
}]
```

---

## TypeScript Types

All data models are typed in `src/types/index.ts`:

```
Project         — portfolio project
BlogPost        — blog article with content
Skill           — tech skill with proficiency level
Testimonial     — reference / testimonial
WorkExperience  — job history entry
Education       — education entry
Certification   — certificate with credential URL
```

---

## Built With Claude

This portfolio was designed and built with the assistance of **Claude (Anthropic)** — including:

- Full UI redesign from a dark cyberpunk aesthetic to a minimal editorial design system
- New Sidebar component with profile photo, staggered animations, and mobile drawer
- Performance audit and 12+ optimisations across images, fonts, animations, and caching
- Production-ready `next.config.js` with HTTP headers, compression, and image formats
- Bio rewrite based on real CV data

---

## Author

**Tofa Kimani Mwangi**
Data Engineer & Full-Stack Developer — Nairobi, Kenya 🇰🇪

- GitHub: [@TofaKM](https://github.com/TofaKM)
- LinkedIn: [tofa-mwangi](https://www.linkedin.com/in/tofa-mwangi)
- Email: mwangitofa@gmail.com

---

## License

This project is personal portfolio work. The code structure and design system are available for reference, but the content (bio, projects, photos, testimonials) belongs to Tofa Kimani Mwangi.
