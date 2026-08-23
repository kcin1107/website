# Project Structure

Reference snapshot of the repo layout, kept as context for future work.
Last updated: 2026-08-23

**Stack:** Astro 7.1.3, TypeScript, static output, no UI framework, self-hosted Roboto and Inter (subsetted variable woff2).

## Local development

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built dist/
```

Needs Node >= 22.12.

## Layout

```
website/
├── astro.config.mjs          # site URL + @astrojs/sitemap (drops /scorer/privacy)
├── tsconfig.json
├── package.json              # scripts: dev / build / preview
├── skills-lock.json          # pinned agent skills
├── README.md                 # this file
│
├── .github/workflows/
│   └── deploy.yml            # build + SFTP upload to IONOS on push to main
├── .vscode/
│   └── mcp.json              # local Figma MCP server (port 3845)
│
├── fonts-src/                # upstream variable TTFs, build input only, never deployed
├── scripts/
│   └── build-fonts.sh        # regenerates the woff2 subsets in public/assets/fonts/
│
├── public/
│   ├── .htaccess             # HTTPS redirect, gzip, cache headers
│   ├── robots.txt
│   ├── api/
│   │   ├── contact.php       # contact form endpoint (PHP + PHPMailer over SMTP)
│   │   ├── config.example.php # template, copy to config.php on the server, not in git
│   │   └── PHPMailer/        # vendored source (no Composer on shared hosting)
│   └── assets/
│       ├── fonts/            # Roboto and Inter woff2 subsets (56 KB total)
│       ├── icons/            # favicons, backArrow.svg
│       ├── images/           # hero, client logos, animated demos (served as-is)
│       └── signature/        # email signature graphics
│
├── src/
│   ├── assets/images/        # project cards and screenshots (optimized via astro:assets)
│   ├── layouts/
│   │   └── Layout.astro      # head, nav, footer, theme toggle, mobile nav
│   ├── pages/                # file-based routing, see Routes below
│   ├── components/
│   │   ├── Button.astro
│   │   ├── ProjectCard.astro
│   │   ├── ApproachCard.astro
│   │   ├── ProjectSection.astro  # case-study block dispatcher
│   │   ├── ResultLines.astro     # Boomerang case study only
│   │   ├── FramingNudge.astro    # Boomerang case study only
│   │   ├── ShippingNudge.astro   # Boomerang case study only
│   │   ├── TabGroup.astro
│   │   └── TabItem.astro
│   ├── content/blog/         # Markdown posts (currently empty)
│   ├── content.config.ts     # Zod schema for the blog collection
│   ├── data/projects.ts      # projects[] + categories[] (business|web|side)
│   └── styles/
│       ├── global.css        # site-wide, loaded on every page (~1340 lines)
│       ├── legal.css         # /imprint + /privacy only
│       └── project-detail.css # /projects/[slug] only
│
└── dist/                     # build output (gitignored)
```

`CLAUDE.md` and `AGENTS.md` sit in the working directory but stay out of git, alongside `.claude/` and `.agents/`.

## Routes

| Path | Source | Notes |
|------|--------|-------|
| `/` | `pages/index.astro` | Hero, projects, approach, tools, clients |
| `/projects` | `pages/projects/index.astro` | All projects, grouped by category |
| `/projects/<slug>` | `pages/projects/[slug].astro` | One per project with a `slug` |
| `/blog` | `pages/blog/index.astro` | All non-draft posts |
| `/blog/<slug>` | `pages/blog/[slug].astro` | One per Markdown post |
| `/contact` | `pages/contact.astro` | Form posts via `fetch` to `public/api/contact.php` |
| `/imprint`, `/privacy` | `pages/*.astro` | Legal pages |
| `/scorer/privacy` | `pages/scorer/privacy.astro` | Unlisted bilingual app policy, kept out of the sitemap |

## Data sources

**Projects** live in `src/data/projects.ts` as a typed array. Entries without a `slug` render as non-linked cards. Images come from `src/assets/images/` as `ImageMetadata` and go through Astro's `<Image>` component, which emits resized retina WebP rather than full-resolution screenshots.

**Case studies** are optional fields on a project: `lead`, `meta[]`, `links[]` and `sections[]`. `sections` is a discriminated union on `kind` (`prose`, `steps`, `figure`, `compare`, `metrics`, `gallery`, `animation`, `annotated`, `embed`), rendered by `ProjectSection.astro`. When a project has `sections`, `[slug].astro` renders those in place of the legacy screenshot showcase. An `embed` section names a component resolved through a small registry in `[slug].astro`, which is how the three Boomerang components are wired in. Boomerang, Scorer and Cleankey use this system today.

**Blog** posts are Markdown in `src/content/blog/`, loaded as an Astro Content Collection with a Zod schema in `src/content.config.ts` (`title`, `description`, `date`, `tags`, `draft`). The folder is empty right now, so `/blog` renders an empty list.

## Deployment

`.github/workflows/deploy.yml` builds the site and uploads `dist/*` to IONOS shared hosting over SFTP on every push to `main`. The sync only uploads and never deletes, so `public/api/config.php` holding the real SMTP password (git-ignored) goes up by hand once and survives later deploys. `public/api/config.example.php` lists the fields it needs. The `.htaccess` uploads in a separate step because the glob skips dotfiles.

## Conventions

- Spacing unit 8px, radii 8px to 32px, breakpoints 1023px and 767px
- Theming through CSS custom properties on `:root`, overridden under `[data-theme="dark"]`: `--white`, `--black`, `--light-grey`, `--dark-grey`, `--surface-grey`, `--hover-grey`, `--border-grey`, `--border-interactive`. Naming follows the value rather than the role, so `--white` resolves to black in dark mode.
- `--border-grey` is decorative. `--border-interactive` draws the boundary of interactive controls and needs 3:1 per WCAG 1.4.11.
- No `--status-blue` variable exists. Status colours are hardcoded: green `#41E788` dark / `#0A7A3C` light, blue `#357DFF` dark / `#1E5FD9` light. The light values sit at 4.5:1 on their surface, so leave them where they are.
- BEM-style class names
- Theme switches via `data-theme` on `<html>`, persisted in `localStorage`
- `global.css` ships on every page, so route-specific rules belong in their own stylesheet imported by the page that needs it (`legal.css`, `project-detail.css`)
- Fonts are subsets built by `scripts/build-fonts.sh` from `fonts-src/`. The Inter subset only holds the glyphs of the nav logo string, so changing that string means rerunning the script.
