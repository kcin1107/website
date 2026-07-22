# Project Structure

> Reference snapshot of the repo layout — handy as context for future chats/updates.
> Last updated: 2026-07-22

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
│       └── global.css        # single global stylesheet (~1060 lines)
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

## Data sources
- **Projects** — `src/data/projects.ts` (typed array; `slug`-less entries render as non-linked cards). Images are imported from `src/assets/images/` as `ImageMetadata` and rendered via Astro's `<Image>` component (`astro:assets`), which generates resized, WebP, retina-aware output instead of shipping full-resolution screenshots.
- **Blog** — `src/content/blog/*.md` via Astro Content Collection; schema in `src/content.config.ts` (`title`, `description`, `date`, `tags`, `draft`).

## Conventions
- Spacing unit 8px · radii 8–32px · breakpoints 1023px / 767px
- Theming via CSS custom properties in `:root`, overridden under `[data-theme="dark"]` (`--white`, `--black`, `--light-grey`, `--dark-grey`, `--status-blue`); value-based naming, so `--white` is dark in dark mode
- Status green `#41E788` is a hardcoded hex; BEM-style class names
- Dark/light theme via `data-theme` on `<html>`, persisted in `localStorage`
