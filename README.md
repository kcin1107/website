# Project Structure

> Reference snapshot of the repo layout — handy as context for future chats/updates.
> Last updated: 2026-08-18

**Stack:** Astro 7.1.3 · TypeScript · static output · no UI framework · self-hosted Roboto & Inter (subsetted variable woff2).

```
website/
├── astro.config.mjs          # Astro config (defaults)
├── tsconfig.json
├── package.json              # scripts: dev / build / preview
├── CLAUDE.md                 # guidance for Claude Code
├── AGENTS.md                 # guidance for other AI coding agents (e.g. OpenAI Codex)
├── README.md                 # this file
│
├── fonts-src/                # upstream variable TTFs — build input only, never deployed
├── scripts/
│   └── build-fonts.sh        # regenerates the woff2 subsets in public/assets/fonts/
│
├── public/
│   ├── .htaccess             # HTTPS redirect, gzip, cache headers
│   ├── api/
│   │   ├── contact.php       # self-hosted contact form endpoint (PHP + PHPMailer, SMTP)
│   │   ├── config.example.php # template — copy to config.php on the server, not in git
│   │   └── PHPMailer/        # vendored PHPMailer source (no Composer on shared hosting)
│   └── assets/
│       ├── fonts/            # Roboto & Inter variable woff2 subsets (51 KB total)
│       ├── icons/            # favicons, backArrow.svg
│       └── images/           # hero, client logos, animated demos (served as-is)
│
├── src/
│   ├── assets/
│   │   └── images/           # project cards & screenshots (optimized via astro:assets)
│   │
│   ├── layouts/
│   │   └── Layout.astro      # head, nav, footer, theme toggle, mobile nav
│   │
│   ├── pages/                # file-based routing
│   │   ├── index.astro       # home: Hero, featured Projects, Approach, Blog, Clients
│   │   ├── imprint.astro     # /imprint
│   │   ├── privacy.astro     # /privacy
│   │   ├── scorer/
│   │   │   └── privacy.astro # /scorer/privacy (unlisted, noindex app policy)
│   │   ├── contact.astro     # /contact
│   │   ├── projects/
│   │   │   ├── index.astro   # /projects
│   │   │   └── [slug].astro  # /projects/<slug> (dynamic)
│   │   └── blog/
│   │       ├── index.astro   # /blog
│   │       └── [slug].astro  # /blog/<slug> (dynamic)
│   │
│   ├── components/
│   │   ├── Button.astro
│   │   ├── ProjectCard.astro
│   │   ├── BlogCard.astro
│   │   ├── ApproachCard.astro
│   │   ├── ProjectSection.astro  # case-study block dispatcher (see Data sources)
│   │   ├── ResultLines.astro     # bespoke embeds, Boomerang case study only
│   │   ├── FramingNudge.astro
│   │   ├── ShippingNudge.astro
│   │   ├── TabGroup.astro
│   │   └── TabItem.astro
│   │
│   ├── content/
│   │   └── blog/             # Markdown blog posts
│   │       ├── first-blog-entry.md
│   │       ├── when-to-run-a-ux-audit.md
│   │       └── writing-better-case-studies.md
│   │
│   ├── content.config.ts     # Zod schema for blog collection
│   ├── data/
│   │   └── projects.ts       # projects[] + categories[] (business|web|side)
│   └── styles/
│       ├── global.css        # site-wide stylesheet, loaded on every page (~1350 lines)
│       ├── legal.css         # /imprint + /privacy only
│       └── project-detail.css # /projects/[slug] only — detail layout, case study, nudges
│
└── dist/                     # build output (gitignored)
```

## Routes
| Path | Source | Notes |
|------|--------|-------|
| `/` | `pages/index.astro` | Hero, 6 featured projects, approach, 3 latest posts, clients |
| `/projects` | `pages/projects/index.astro` | All projects, grouped by category |
| `/projects/<slug>` | `pages/projects/[slug].astro` | One per project with a `slug` |
| `/blog` | `pages/blog/index.astro` | All non-draft posts |
| `/blog/<slug>` | `pages/blog/[slug].astro` | One per Markdown post |
| `/imprint`, `/privacy` | `pages/*.astro` | Website legal pages |
| `/scorer/privacy` | `pages/scorer/privacy.astro` | Unlisted bilingual Scorer app policy; excluded from indexing and sitemap |
| `/contact` | `pages/contact.astro` | Contact form, submits via `fetch` to `public/api/contact.php` (self-hosted, sends over SMTP through the IONOS mailbox) |

## Data sources
- **Projects** — `src/data/projects.ts` (typed array; `slug`-less entries render as non-linked cards). Projects can optionally provide an `appIcon` for the detail-page identity block. Images are imported from `src/assets/images/` as `ImageMetadata` and rendered via Astro's `<Image>` component (`astro:assets`), which generates resized, WebP, retina-aware output instead of shipping full-resolution screenshots.
- **Case studies** — a project may optionally carry `lead`, `meta[]`, `links[]` and `sections[]`. Links support active external CTAs and accessible pending states. `sections` is a discriminated union on `kind` (`prose`, `steps`, `figure`, `compare`, `metrics`, `gallery`, `animation`, `annotated`, `embed`) rendered by `components/ProjectSection.astro`; `gallery` provides reusable two- or three-column portrait, landscape, and device layouts. `animation` provides a reusable GIF demo block with a static poster for reduced-motion visitors, optionally with its caption beside the media (`layout: 'aside'`). `annotated` pairs one sticky screenshot with a labelled list explaining the interface it shows. When `sections` is present, `[slug].astro` renders those instead of the legacy screenshot showcase. `embed` sections name a component resolved through a small registry in `[slug].astro`, which is how the three bespoke Boomerang components are wired in. The Boomerang behavioral-design, Scorer, and Cleankey projects currently use the case-study system.
- **Blog** — `src/content/blog/*.md` via Astro Content Collection; schema in `src/content.config.ts` (`title`, `description`, `date`, `tags`, `draft`).

## Deployment
`.github/workflows/deploy.yml` builds the static site and pushes `dist/*` to IONOS shared hosting over SFTP on every push to `main`. It's an upload-only sync (no remote deletion), so `public/api/config.php` — containing the real SMTP password for the contact form, git-ignored — can be uploaded once by hand directly to the server and will survive every future deploy untouched. See `public/api/config.example.php` for the required fields.

## Conventions
- Spacing unit 8px · radii 8–32px · breakpoints 1023px / 767px
- Theming via CSS custom properties in `:root`, overridden under `[data-theme="dark"]` (`--white`, `--black`, `--light-grey`, `--dark-grey`, `--surface-grey`, `--hover-grey`, `--border-grey`, `--border-interactive`); value-based naming, so `--white` is dark in dark mode
- `--border-grey` is decorative; `--border-interactive` is the boundary of interactive controls and needs 3:1 per WCAG 1.4.11
- There is no `--status-blue`. Status colours are hardcoded hex: green `#41E788` dark / `#0A7A3C` light, blue `#357DFF` dark / `#1E5FD9` light. The light values are set to 4.5:1 on their surface, so don't lighten them
- BEM-style class names
- Dark/light theme via `data-theme` on `<html>`, persisted in `localStorage`
- `global.css` is on every page, so route-specific rules belong in their own stylesheet imported by that page (`legal.css`, `project-detail.css`) rather than in the global one
- Fonts are subsets built by `scripts/build-fonts.sh` from `fonts-src/`. The Inter subset contains only the glyphs of the nav logo string, so changing that string means rerunning the script
