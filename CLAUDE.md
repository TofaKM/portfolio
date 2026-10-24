# Website playbook — how to design, build and ship

How every change to this site is made. Claude Code reads this file at the start of each session; follow it without being asked. It also works as a template for new Next.js sites: copy it into the new repo and adjust section 2.

---

## 1. The cycle

Every piece of work follows the same loop:

1. **Audit** — read the code and the live site; list problems by severity (security → broken features → accessibility/SEO → tidiness). Report first when asked to "check" or "report"; do not change code then.
2. **Plan in phases** — group fixes into small phases, one theme each. Ask for any decision that is genuinely the owner's (content, wording, personal data, paid services).
3. **One branch per phase** — `phase-N/short-name`, `fix/…`, `content/…`, `docs/…`. Never commit to `main`; it is protected (PR required, CI `check` must pass, no force-push).
4. **Build** — follow sections 2–9. Keep each phase to its scope; note anything else found for a later phase.
5. **Verify locally** — `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, then `npm run test:e2e`. Look at the result in a browser (screenshots at 1440px and phone width, light and dark).
6. **Pull request** — with `gh pr create`; the body says what changed, why, and which checks passed. End with the Claude Code attribution line.
7. **CI** — wait for the `check` job (lint, typecheck, unit, build, end-to-end) and the Vercel preview.
8. **Merge only with the owner's go-ahead** for that PR. Stacked branches merge in order. Use merge commits.
9. **Verify live** — section 11. A merge is not done until the live site is checked.
10. **Clean up** — delete merged branches (remote and local); pull `main`.

Report outcomes plainly: what passed, what failed (with the error), what was skipped and why.

---

## 2. Stack and structure

- Next.js (App Router) + React + TypeScript (strict) + Tailwind CSS, deployed on Vercel.
- Everything under `src/`:

```
src/
  app/                 routes — page.tsx per route, route handlers in app/api/*/route.ts
    layout.tsx         <html>, fonts, metadata defaults, inline theme + reveal scripts
    globals.css        design tokens + the few global classes (.card .tag .btn .eyebrow .enter .reveal)
    opengraph-image.tsx, sitemap.ts, robots.ts
  components/
    layout/            Navbar, Footer, FloatingActions, ThemeToggle, navLinks
    sections/          page sections (Hero, FeaturedProjects, Testimonials…)
    ui/                small reusable pieces (SectionHeading, StatTile, ProjectCard, SkillGroups…)
    icons/             brand glyphs and the shared socialLinks list
  data/index.ts        ALL content: profile, projects, skillGroups, workExperience, education, certifications, testimonials
  lib/                 logic with no UI: contact validation, rateLimit, metadata helper, site URL, delay
  types/index.ts       shared types
docs/cv.html           the single source of the CV (shown on /cv and printed to the PDF)
e2e/                   Playwright tests
```

- **Server components by default.** Add `'use client'` only to the component that needs state, effects or browser APIs — keep it small and leaf-level.
- Exactly **one `<h1>` per page**. Section titles are `<h2>`.

---

## 3. Reuse rules

- **Content is data.** Names, links, titles, dates, skills, projects live in `src/data/index.ts`. Components never hard-code a person's name, URL, email or phone — read `profile` / `socialLinks`.
- **Extract on the second copy.** If the same markup or list appears twice, make it a component or a shared constant before adding a third. Existing building blocks — use them before writing new ones:

| Need | Use |
|---|---|
| Page or section heading with gold label | `SectionHeading` (`as="h1"` for page titles) |
| Number/label tile (dashboard style) | `StatTile` inside a `<dl>` |
| Grid of grouped tags | `SkillGroups` (`variant="cards"` or `"compact"`) |
| Project card | `ProjectCard` |
| GitHub / LinkedIn / email / phone | `socialLinks` + `linkTarget()` from `components/icons/social.tsx` |
| Page metadata | `pageMetadata({ title, description, path })` from `lib/metadata.ts` |
| Stagger delay | `delay(ms)` from `lib/delay.ts` |

- **One source per fact.** If two places show the same thing (e.g. the CV page and the CV PDF), generate one from the other.
- Props are typed; no `any`.

---

## 4. Design system

- Palette: cream page, white surfaces, navy bar and primary buttons, gold accents (the Agri-Link family). Serif headings, sans body, mono numbers and tags. Square corners (`rounded-doc`).
- **Tokens only.** Colours are RGB-channel CSS variables (`--c-*` in `globals.css`), mapped in `tailwind.config.ts`. Never write hex values or `style={{ color: 'var(--…)' }}` in components — use classes (`text-accent-dark`, `bg-cream-200`, `border-border`).
- `bg-surface` for cards, inputs and tiles (goes dark in dark mode); `bg-white` only for things that must stay white (logo tile, CV paper). `bg-primary` / `text-on-primary` for primary actions.
- Buttons: `.btn .btn-primary` / `.btn .btn-secondary`. Labels: `.eyebrow`. Cards: `.card`. Tags: `.tag`.
- **Dark mode is required**: every new colour gets a light and a dark value. The theme is applied before paint by the inline script in `layout.tsx`.
- **Contrast**: text must reach 4.5:1 (3:1 for large text) in both themes — check with a contrast calculation before choosing a colour.
- Layout: content in `max-w-6xl mx-auto` with gutters `px-5 md:px-10` on the outer element; page headers left-aligned (label, serif title, grey intro, main action top-right).
- Phones are first-class: check 390–600px widths; floating buttons must not cover content.

---

## 5. Rendering and motion

- **Content must be visible in the server HTML.** Crawlers, link previews and no-JS visitors see only that.
  - No `opacity: 0` initial states from JS animation libraries.
  - **No `app/loading.tsx` on static sites** — it wraps every page in a Suspense boundary and ships the real page inside `<div hidden>`.
  - Check: `curl -s URL | grep -c 'id="S:0"'` must be 0 and `grep -c 'opacity:0'` must be 0.
- Motion is CSS: `.enter` for above-the-fold (runs without JS), `.reveal` for scroll-in (hidden only after the inline script adds `html.js`). Respect `prefers-reduced-motion`. No animation library.
- Images through `next/image` with real `sizes`; keep source images small (photos ≤ ~300 KB).

---

## 6. SEO

- Every page: `export const metadata = pageMetadata({ title, description, path })` — sets title, description, canonical, og:title, twitter:title and the preview image together. (A page-level `openGraph` object replaces the inherited one, image included.)
- `app/opengraph-image.tsx` generates the preview image; `sitemap.ts` and `robots.ts` list pages from `navLinks`; `/favicon.ico` redirects to the logo.
- Home page has schema.org `Person` JSON-LD (escape `<` as `<`).
- Canonical URL comes from `lib/site.ts` (`NEXT_PUBLIC_SITE_URL`).

---

## 7. Security

### API routes (pattern in `src/app/api/contact/route.ts`)
Check in this order, cheapest first, and return early:

1. **Same origin** — `Origin` host must equal the request host → else 403.
2. **Shape and size** — `content-type: application/json` → else 415; body ≤ 16 KB → else 413.
3. **Rate limit** — `checkContactRate(clientIp(headers))` from `src/lib/rateLimit.ts` → else 429 with `Retry-After` and a human message.
4. **Bot filters** — hidden honeypot field filled, or form completed in under 3 s (`elapsed` sent by the client) → fake `{ ok: true }`, do nothing.
5. **Validation** — the same function the client uses (`src/lib/contact.ts`). Allow-lists use `Object.hasOwn`, never `in`.
6. **Output safety** — strip control characters from anything placed in mail headers; HTML-escape anything placed in HTML.
7. Missing config → 503 with a friendly message; send failure → 502. Never leak stack traces.

### Rate limiting
- In code: fixed windows per IP (3 per 10 min, 10 per day) plus a global cap (40 per hour) sized under the email provider's daily quota. Expired windows are swept so memory can't grow.
- In-memory limits are **per server instance**. Always pair them with a **Vercel Firewall rule**: path `/api/…`, method POST, fixed window 60 s, 5 requests, keyed by IP, action Deny.
- Any new public endpoint that sends email, writes data or costs money gets the same treatment.

### Headers and secrets
- `next.config.js` sends a Content-Security-Policy (same-origin only; `'unsafe-inline'` scripts because Next's static pages inline hydration scripts), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. New third-party scripts or embeds need an explicit CSP entry — prefer same-origin.
- Secrets live only in Vercel environment variables (type **Secret**), named exactly as the code reads them; `.env.example` documents them with empty values. A changed variable needs a **redeploy**. Never put secrets in code, commits or chat; if one is exposed, tell the owner to rotate it.
- Personal data of other people (references' phones/emails) is published only with the owner's explicit instruction.

### Dependencies
- Dependabot opens weekly PRs; merge minor/patch and Actions updates when CI passes. Major versions (TypeScript, Tailwind, ESLint, @types/node) are their own planned phase — don't merge a failing major.
- `npm audit --omit=dev` must report 0 vulnerabilities in production dependencies.

---

## 8. Accessibility

- Labels linked to inputs (`htmlFor`/`id`); errors via `aria-invalid` + `aria-describedby`; focus the first invalid field.
- Menus and dialogs: `aria-expanded`/`aria-controls`, Escape closes and returns focus, close on navigation and outside click.
- Visible `:focus-visible` ring; skip-to-content link; decorative icons `aria-hidden`.
- `mailto:` and `tel:` links never use `target="_blank"`; external links use `target="_blank" rel="noopener noreferrer"`.
- Whole-card links use the stretched-link pattern so inner links stay usable.

---

## 9. Testing

- **Unit (Vitest, `src/**/*.test.ts`)** for everything in `lib/`: validation edge cases, rate limiter windows and caps.
- **End-to-end (Playwright, `e2e/`)** against the production build, desktop and phone: every page returns 200 with one `<h1>`; 404 page; content visible with JavaScript disabled; theme toggle persists; form errors and the failure fallback; navigation menus. Locally it uses installed Microsoft Edge (`PW_CHANNEL`), CI installs Chromium.
- A bug found by a test is fixed in the same phase, with the test kept.
- Tests never send real email or write real data.

---

## 10. CI/CD

`.github/workflows/ci.yml` on every PR and push to `main`: `npm ci` → lint → typecheck → unit tests → build → install Chromium → end-to-end tests (Playwright report uploaded on failure). The job is named `check`; the `main` ruleset requires it.

Vercel builds a preview for every PR and deploys `main` to production.

---

## 11. Post-deploy verification

After every merge, check the live site and report:

```bash
U=https://tofa-mwangi.vercel.app
for p in / /about /projects /skills /certifications /cv /contact; do curl -s -o /dev/null -w "$p %{http_code}\n" $U$p; done
curl -s $U/ | grep -c 'id="S:0"'                       # 0 — nothing hidden behind a Suspense boundary
curl -s $U/skills | grep -o 'og:title" content="[^"]*'  # page's own preview title
curl -sI $U/ | grep -iE 'content-security-policy|x-frame-options'
curl -s -o /dev/null -w "%{http_code}\n" -X POST $U/api/contact -H 'Content-Type: application/json' -H 'Origin: https://evil.example' -d '{}'   # 403
for p in /robots.txt /sitemap.xml /opengraph-image /documents/Tofa-CV.pdf; do curl -s -o /dev/null -w "$p %{http_code}\n" $U$p; done
```

Also check every external link (repos, certificates) returns 200 — LinkedIn answers bots with 999, so ask the owner to click it. Never send a real contact-form message without asking.

---

## 12. Definition of done (every PR)

- [ ] Scope matches the phase; nothing unrelated changed
- [ ] Content in `src/data`, no hard-coded personal details or colours
- [ ] Reused existing components; new repeated markup extracted
- [ ] Works in light and dark, desktop and phone; contrast ≥ 4.5:1
- [ ] Server HTML shows the content (no hidden boundary, no `opacity:0`)
- [ ] Page metadata via `pageMetadata`; one `<h1>`
- [ ] New endpoints follow section 7 (origin, size, rate limit, bots, validation, escaping)
- [ ] lint, typecheck, unit, build, end-to-end all pass locally and in CI
- [ ] README / this file updated if the way things work changed
- [ ] Owner approved the merge; live site verified; branch deleted

---

## 13. Pitfalls already hit (don't repeat)

| Pitfall | Fix |
|---|---|
| `next lint` was removed in Next 16; ESLint 9 ignores `.eslintrc.json` | Flat `eslint.config.mjs` + `eslint-config-next`; script `eslint .` |
| framer-motion `initial={{ opacity: 0 }}` rendered pages invisible without JS | CSS `.enter` / `.reveal`; no animation library |
| `app/loading.tsx` hid every static page in `<div hidden>` | Don't add `loading.tsx` to static sites |
| Page `openGraph` dropped the inherited preview image | `pageMetadata()` sets the image explicitly |
| `key in OBJECT` accepted `"toString"` | `Object.hasOwn(OBJECT, key)` |
| Env var name in Vercel didn't match the code (`GMAIL_APP_PASS`) | Copy names from `.env.example`; redeploy after changes |
| Critical Next.js advisory went unnoticed | Dependabot + `npm audit --omit=dev` every phase |
| Positioned pseudo-element bullets scrambled PDF text order | Real list markers (`list-style: disc`) in `docs/cv.html` |
| CV styles leaked/broke when embedded | Scope every CV rule under `.cv`; keep `body { margin: 0 }` for the standalone print |
| Windows CRLF vs LF churn | `.gitattributes` (`* text=auto eol=lf`); edit scripts must preserve line endings |
| `next/font/google` download failed during a CI build | Re-run; if it recurs, self-host the fonts with `next/font/local` |
| A broken external link (wrong repo name) | Check every external link after merging (section 11) |

---

## 14. Starting a new site with this playbook

1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, `src/` directory.
2. Copy this file, then from this repo: `globals.css` tokens, `tailwind.config.ts`, `lib/` (`metadata`, `site`, `rateLimit`, `delay`), `components/ui`, `components/layout`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.github/` (CI + Dependabot), `.gitattributes`, `.env.example`.
3. Put the new person's/business's content in `src/data/index.ts`.
4. Create the GitHub repo, connect it to Vercel, set environment variables, add the `main` ruleset and the Firewall rate-limit rule, enable Dependabot alerts.
5. Work in phases from section 1.
