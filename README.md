# Ajit Kumar — Portfolio (2026)

Personal portfolio site for **Ajit Kumar**, Full Stack Software Engineer. A fully static, single-page site built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, with motion powered by **Framer Motion** and smooth scrolling by **Lenis**. Deploys to **Vercel** with zero configuration.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack) — `force-static` SSG
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` tokens, no config file)
- **Animation:** Framer Motion (scroll reveals, tilt, magnetic buttons, count-ups), Lenis (smooth scroll)
- **Icons:** lucide-react
- **Fonts:** self-hosted via `next/font` — Cormorant Garamond (serif), Rajdhani (sans), JetBrains Mono

## Requirements

- **Node.js >= 20.9.0** (enforced via `engines` + `.nvmrc`)
- npm

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Production build

```bash
npm run build     # outputs fully static pages (○ Static)
npm start         # serves the build locally
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo at https://vercel.com/new — zero configuration.
3. Vercel auto-detects Next.js, builds, and serves from the global edge CDN.

## Architecture

- `app/layout.tsx` — self-hosted fonts, metadata/OpenGraph, `data-theme="dark"` default, skip-to-content link, ambient `Background`, `ScrollProgress`, and `ToastProvider`.
- `app/page.tsx` — `force-static`; renders the single-page `Portfolio`.
- `app/globals.css` — design tokens in Tailwind v4 `@theme`, light/dark CSS variables, keyframes, and a `prefers-reduced-motion` guard.
- `app/robots.ts` / `app/sitemap.ts` — SEO metadata routes.
- `components/Portfolio.tsx` — the whole site, driven by typed config objects (`PROFILE`, `STATS`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, `EDUCATION`). Sections: Hero → Stats → About → Experience → Projects → Skills → Contact → Footer.
- `components/ui/` — shared primitives: `Reveal`, `Tilt`, `MagneticButton`, `AnimatedCounter`, `Toast`.
- `components/SmoothScroll.tsx` — Lenis (client-only, dynamic import, `prefers-reduced-motion` guarded).

## Editing content

All content lives in the config objects at the top of `components/Portfolio.tsx`:

- `PROFILE` — name, role, tagline, contact links, résumé path.
- `STATS` — the animated headline numbers.
- `EXPERIENCE` — expandable work/project cards.
- `PROJECTS` — personal project cards and links.
- `SKILLS` — categorized skill chips.
- `EDUCATION` — degree details.

## Résumé

The nav/contact buttons link to the same-origin path `/resume.pdf`, served by a **force-dynamic
route handler** ([app/resume.pdf/route.ts](app/resume.pdf/route.ts)) that fetches
`RESUME_SOURCE_URL` (your S3/CloudFront PDF) with `cache: "no-store"` and streams it back.

Because the fetch is dynamic and uncached, **re-uploading the PDF to S3 updates the live résumé
with no redeploy** — unlike a build-time `rewrites()` proxy, which pins the env var at build time
and lets a stale copy linger. There is intentionally **no `public/resume.pdf` fallback** (a static
file at that path would shadow the route).

Setup:

1. Set `RESUME_SOURCE_URL` in `.env.local` (already done) for local dev, and in your host
   (Vercel → Settings → Environment Variables, all environments) — then **redeploy**, or the
   route returns `502`.
2. On the S3 object set `Cache-Control: public, max-age=300, must-revalidate`, and keep a short
   CloudFront TTL or invalidate the object path after each upload, so new versions propagate
   within ~5 minutes.

## Performance & a11y

1. Self-hosted fonts (no third-party request).
2. `force-static` route — pure CDN delivery.
3. Lenis dynamically imported after mount.
4. `next.config.ts` — AVIF/WebP images, compression, `lucide-react` import optimization.
5. `vercel.json` — immutable caching on `/_next/static/*` + security headers.
6. `prefers-reduced-motion` respected globally (CSS + every motion component).
7. Light/dark theme toggle, persisted to `localStorage`.
