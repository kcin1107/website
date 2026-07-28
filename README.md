# Project Structure

> Reference snapshot of the repo layout — handy as context for future chats/updates.
> Last updated: 2026-07-28

**Stack:** Astro 7.1.3 · TypeScript · static output · no UI framework · self-hosted Roboto & Inter (variable fonts).

```
website/
├── astro.config.mjs          # Astro config (defaults)
├── tsconfig.json
├── package.json              # scripts: dev / build / preview
├── CLAUDE.md                 # guidance for Claude Code
├── AGENTS.md                 # guidance for other AI coding agents (e.g. OpenAI Codex)
├── README.md                 # this file
│
├── public/
│   ├── api/
│   │   ├── contact.php       # self-hosted contact form endpoint (PHP + PHPMailer, SMTP)
│   │   ├── config.example.php # template — copy to config.php on the server, not in git
│   │   └── PHPMailer/        # vendored PHPMailer source (no Composer on shared hosting)
│   └── assets/
│       ├── fonts/            # Roboto & Inter variable fonts (.ttf)
│       ├── icons/            # favicons, backArrow.svg
│       └── images/           # hero, client logos (served as-is, unoptimized)
│
├── src/
│   ├── assets/
│   │   └── images/           # project cards & screenshots (optimized via astro:assets)
│   │
│   ├── layouts/
│   │   └── Layout.astro      # head, nav, footer, theme toggle, mobile nav
│   │
│   ├── pages/                # file-based routing
│   │   ├── index.astro       # home: Hero, Projects, Approach, Blog, Clients
│   │   ├── imprint.astro     # /imprint
│   │   ├── privacy.astro     # /privacy
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
│   │   ├── ResultMatrix.astro    # bespoke embeds, Boomerang case study only
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
│       └── global.css        # single global stylesheet (~1690 lines)
│
└── dist/                     # build output (gitignored)
```

## Routes
| Path | Source | Notes |
|------|--------|-------|
| `/` | `pages/index.astro` | Hero, 6 latest projects, approach, 3 latest posts, clients |
| `/projects` | `pages/projects/index.astro` | All projects, grouped by category |
| `/projects/<slug>` | `pages/projects/[slug].astro` | One per project with a `slug` |
| `/blog` | `pages/blog/index.astro` | All non-draft posts |
| `/blog/<slug>` | `pages/blog/[slug].astro` | One per Markdown post |
| `/imprint`, `/privacy` | `pages/*.astro` | Legal pages |
| `/contact` | `pages/contact.astro` | Contact form, submits via `fetch` to `public/api/contact.php` (self-hosted, sends over SMTP through the IONOS mailbox) |

## Data sources
- **Projects** — `src/data/projects.ts` (typed array; `slug`-less entries render as non-linked cards). Images are imported from `src/assets/images/` as `ImageMetadata` and rendered via Astro's `<Image>` component (`astro:assets`), which generates resized, WebP, retina-aware output instead of shipping full-resolution screenshots.
- **Case studies** — a project may optionally carry `lead`, `meta[]` and `sections[]`. `sections` is a discriminated union on `kind` (`prose`, `steps`, `figure`, `compare`, `metrics`, `embed`) rendered by `components/ProjectSection.astro`. When `sections` is present, `[slug].astro` renders those instead of the screenshot showcase; projects without it keep the original layout untouched. `embed` sections name a component resolved through a small registry in `[slug].astro`, which is how the three bespoke Boomerang components are wired in. Only `boomerang-behavioral-design` uses this today.
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
