# Tofa Kimani Mwangi — Portfolio

Personal site of Tofa Kimani Mwangi, software engineer (full-stack, backend, data engineering, data analytics and deployment) based in Nairobi, Kenya.

**Live:** [tofa-mwangi.vercel.app](https://tofa-mwangi.vercel.app)

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 3 with CSS-variable design tokens |
| Fonts | Source Serif 4, Inter, IBM Plex Mono via `next/font` (self-hosted) |
| Motion | CSS entrance and scroll-reveal; framer-motion only for interactions |
| Email | Contact form → `/api/contact` → Gmail SMTP via nodemailer |
| Hosting | Vercel |

## Pages

| Route | What's there |
|---|---|
| `/` | Hero, featured projects, skills preview, testimonials |
| `/about` | Bio, working philosophy, work experience and education timeline |
| `/projects` | All projects, filterable by category |
| `/skills` | Every skill, grouped (languages, data engineering, web, databases, DevOps, professional and soft skills) |
| `/certifications` | Credentials with links to the issuers for verification |
| `/cv` | Full CV with view / download of the PDF |
| `/contact` | Working contact form plus direct links |

Also generated: `/sitemap.xml`, `/robots.txt` and a link-preview image (`/opengraph-image`).

## Design

Cream, white, navy and gold — the same family as [Agri-Link](https://github.com/TofaKM/Agri-Link-Showcase):

- sticky navy top navbar with a gold underline on the active page; drop-down menu on small screens
- left-aligned page headers: small gold uppercase label, serif title, grey intro
- white cards with a 1px border and square corners; navy primary buttons, white secondary buttons
- dashboard-style stat tiles (gold label, monospace number)
- floating actions bottom-right: a page menu (the main way around on a phone), GitHub, LinkedIn and contact

Tokens live in `src/app/globals.css` (`:root`) and `tailwind.config.ts`.

**Content is visible without JavaScript.** Above-the-fold entrances are pure CSS (`.enter`). Scroll reveals (`.reveal`) only hide content after an inline script in `layout.tsx` confirms IntersectionObserver is available, so crawlers, link previews and no-JS visitors always see the page.

## Editing content

Almost everything is data in **`src/data/index.ts`**:

| Export | Used for |
|---|---|
| `profile` | Name, tagline, roles, contact details, CV path — navbar, hero, footer, CV, metadata |
| `projects` | Project cards (optional `image`, `caseStudy`, `statusNote`) |
| `skillGroups` | Skills page, CV skills and the home preview |
| `workExperience`, `education` | About timeline and CV (newest first) |
| `certifications` | Certifications page, CV, counts |
| `testimonials` | Home page |

Types are in `src/types/index.ts`.

**The CV PDF** (`public/documents/Tofa-CV.pdf`) is generated from `docs/cv.html`. After editing the HTML, print it with Chrome or Edge (headless works too):

```bash
msedge --headless=new --no-pdf-header-footer --print-to-pdf=public/documents/Tofa-CV.pdf docs/cv.html
```

Keep it to two pages, and keep bullets as real list items (`list-style: disc`) — positioned pseudo-element bullets scramble the text order that applicant-tracking systems read.

## Running locally

Requires Node 20.9+.

```bash
npm install
cp .env.example .env.local   # fill in to test the contact form
npm run dev                  # http://localhost:3000
```

| Script | |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` |

GitHub Actions (`.github/workflows/ci.yml`) runs lint, type-check and build on every pull request and push to `main`.

## Environment variables

| Name | Required | |
|---|---|---|
| `GMAIL_USER` | for the contact form | Gmail address that sends — and by default receives — messages |
| `GMAIL_APP_PASS` | for the contact form | 16-character Google **App Password** (needs 2-Step Verification), no spaces |
| `CONTACT_TO` | no | Deliver messages somewhere other than `GMAIL_USER` |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical URL for metadata and the sitemap; defaults to `https://tofa-mwangi.vercel.app` |

Without the Gmail variables the form says it isn't set up yet and shows the email address instead. On Vercel, changing a variable takes effect after a redeploy.

## Built with Claude

Designed and built with the assistance of **Claude (Anthropic)**: the audit and phased fixes, the working contact form, the Agri-Link-style navbar and design system, server-visible animations, grouped skills, SEO files and CI.

## Author

**Tofa Kimani Mwangi** — Nairobi, Kenya

- GitHub: [@TofaKM](https://github.com/TofaKM)
- LinkedIn: [tofa-mwangi117](https://www.linkedin.com/in/tofa-mwangi117)
- Email: mwangitofa@gmail.com

## License

Personal portfolio work. The code structure and design system are available for reference; the content (bio, projects, photos, testimonials) belongs to Tofa Kimani Mwangi.
