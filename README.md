# Project Structure

Reference snapshot of the repo layout, kept as context for future work.
Last updated: 2026-10-22

**Stack:** Astro 7, TypeScript, static output, no UI framework, self-hosted Roboto and Inter (subsetted variable woff2).

## Local development

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built dist/
npm run check:contrast  # WCAG contrast check of the theme tokens
```

Needs Node >= 22.12.

## Layout

```
website/
├── astro.config.mjs          # site URL, sitemap, exact SwimFix .html output
├── tsconfig.json
├── package.json              # scripts: dev / build / preview
├── skills-lock.json          # pinned agent skills
├── README.md                 # this file
│
├── .github/workflows/
│   └── deploy.yml            # build + SFTP upload to IONOS on push and daily
├── .vscode/
│   └── mcp.json              # remote Figma and IONOS MCP servers
│
├── fonts-src/                # upstream variable TTFs, build input only, never deployed
├── scripts/
│   ├── build-fonts.sh        # regenerates the woff2 subsets in public/assets/fonts/
│   └── check-contrast.mjs    # WCAG contrast check of the theme tokens in global.css
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
│       ├── icons/            # favicons
│       ├── images/           # hero, client logos, animated demos (served as-is)
│       └── signature/        # email signature graphics
│
├── src/
│   ├── assets/images/        # project cards and screenshots (optimized via astro:assets)
│   ├── features/swimfix/     # mirrored local FIT editor core, client UI and scoped styles
│   ├── layouts/
│   │   └── Layout.astro      # head, nav, footer, theme toggle, mobile nav
│   ├── pages/                # file-based routing, see Routes below
│   ├── components/
│   │   ├── Button.astro
│   │   ├── ProjectCard.astro
│   │   ├── ApproachCard.astro
│   │   ├── AppShowcase.astro     # one-screen app page (Scorer, Cleankey, Crescent, Grab)
│   │   ├── ProjectSection.astro  # case-study block dispatcher
│   │   ├── ResultLines.astro     # Boomerang case study only
│   │   ├── FramingNudge.astro    # Boomerang case study only
│   │   ├── ShippingNudge.astro   # Boomerang case study only
│   │   ├── TabGroup.astro
│   │   └── TabItem.astro
│   ├── content/blog/         # Markdown posts (currently empty)
│   ├── content.config.ts     # Zod schema for the blog collection
│   ├── data/projects.ts      # projects[] + categories[] (business|web|side)
│   ├── data/app-releases.ts  # app versions (Scorer, Cleankey, Crescent, Grab), fetched at build time
│   └── styles/
│       ├── global.css        # site-wide, loaded on every page (~1380 lines)
│       ├── legal.css         # legal pages only
│       ├── project-detail.css # shared project details only
│       └── app-showcase.css  # /projects/scorer, /cleankey, /crescent + /grab only
│
└── dist/                     # build output (gitignored)
```

`CLAUDE.md` and `AGENTS.md` sit in the working directory but stay out of git, alongside `.claude/` and `.agents/`.

## Routes

| Path | Source | Notes |
|------|--------|-------|
| `/` | `pages/index.astro` | Hero, projects, approach, tools, clients |
| `/projects` | `pages/projects/index.astro` | All projects, grouped by category |
| `/projects/<slug>` | `pages/projects/[slug].astro` | Shared detail page for projects with a `slug`, except the four app pages below |
| `/projects/scorer` | `pages/projects/scorer.astro` | One-screen Scorer app page (`AppShowcase`): iPad + iPhone composition |
| `/projects/cleankey` | `pages/projects/cleankey.astro` | One-screen Cleankey app page (`AppShowcase`): demo GIF |
| `/projects/crescent` | `pages/projects/crescent.astro` | One-screen Crescent app page (`AppShowcase`): menu screenshot |
| `/projects/grab` | `pages/projects/grab.astro` | One-screen Grab app page (`AppShowcase`): window screenshot |
| `/projects/swimfix.html` | `pages/projects/swimfix.html.astro` | Local FIT editor, native site theme, analytics disabled |
| `/blog` | `pages/blog/index.astro` | All non-draft posts; not yet linked from nav |
| `/blog/<slug>` | `pages/blog/[slug].astro` | One per Markdown post |
| `/contact` | `pages/contact.astro` | Form posts via `fetch` to `public/api/contact.php` |
| `/imprint`, `/privacy` | `pages/*.astro` | Legal pages |
| `/scorer/privacy` | `pages/scorer/privacy.astro` | Unlisted bilingual app policy, kept out of the sitemap |

## Data sources

**Projects** live in `src/data/projects.ts` as a typed array. Entries with an explicit `href` use that URL; otherwise a `slug` creates a project detail link. Entries with neither render as non-linked cards. Images come from `src/assets/images/` as `ImageMetadata` and go through Astro's `<Image>` component, which emits resized retina WebP rather than full-resolution screenshots.

**Case studies** are optional fields on a project: `lead`, `meta[]`, `links[]` and `sections[]`. `sections` is a discriminated union on `kind` (`prose`, `steps`, `figure`, `compare`, `metrics`, `gallery`, `animation`, `annotated`, `embed`), rendered by `ProjectSection.astro`. When a project has `sections`, `[slug].astro` renders those in place of the legacy screenshot showcase. An `embed` section names a component resolved through a small registry in `[slug].astro`, which is how the three Boomerang components are wired in. Boomerang uses this system today. Scorer, Cleankey, Crescent and Grab keep their card metadata here, but each has a dedicated one-screen page built on `AppShowcase.astro`; Scorer's imports its icon and isolated device mock-ups exported from Figma from `src/assets/images/projects/scorer-v13/`.

**Blog** posts are Markdown in `src/content/blog/`, loaded as an Astro Content Collection with a Zod schema in `src/content.config.ts` (`title`, `description`, `date`, `tags`, `draft`). The folder is empty right now, so `/blog` renders an empty list.

**App releases** come from `src/data/app-releases.ts`. Each build fetches Scorer's version and price from the German App Store and the Cleankey, Crescent and Grab versions from their latest GitHub releases. If a lookup fails, the build uses the fallback values in that file; keep those current after releases or price changes.

## Deployment

`.github/workflows/deploy.yml` builds the site with Node 24 and uploads `dist/*` to IONOS shared hosting over SFTP on every push to `main`, on manual dispatch, and daily at 04:00 UTC to refresh app release information. The sync only uploads and never deletes, so `public/api/config.php` holding the real SMTP password (git-ignored) goes up by hand once and survives later deploys. `public/api/config.example.php` lists the fields it needs. The `.htaccess` uploads in a separate step because the glob skips dotfiles.

## Conventions

- Spacing unit 8px, square corners for cards and controls, breakpoints 1023px and 767px
- Theming through CSS custom properties on `:root`, overridden under `[data-theme="dark"]`: `--white`, `--black`, `--light-grey`, `--dark-grey`, `--surface-grey`, `--hover-grey`, `--border-grey`, `--border-interactive`, `--card-warm`. Naming follows the value rather than the role: `--white` is the canvas (pale sage `#E9EFE4` in light mode, forest green `#0F2A1E` in dark mode), `--black` the ink (`#0E2619` / `#EEF4E6`). `npm run check:contrast` verifies every text, border and focus token against every surface in both themes. Shapes are the same in both themes — square corners, 1px outlined cards.
- `--border-grey` is decorative. `--border-interactive` draws the boundary of interactive controls and needs 3:1 per WCAG 1.4.11.
- Status/semantic colours use `--status-green`, `--status-blue`, and `--error`; green and error also have `-rgb` triplets for alpha tints and `-bg` surfaces. `--focus-ring` changes with the theme: blue in light mode and yellow in dark mode. `--shadow-sm`/`--shadow-md`/`--shadow-lg` hold the shared box-shadow tiers, with darker shadows in dark mode.
- BEM-style class names
- Theme switches via `data-theme` on `<html>`, persisted in `localStorage`
- `global.css` ships on every page, so route-specific rules belong in their own stylesheet imported by the page that needs it (`legal.css`, `project-detail.css`, `app-showcase.css`)
- Fonts are subsets built by `scripts/build-fonts.sh` from `fonts-src/`. The Inter subset only holds the glyphs of the nav logo string, so changing that string means rerunning the script.

## SwimFix integration

`/projects/swimfix.html` embeds the FIT editor in `Layout.astro`, using the portfolio navigation, fonts, theme switch and footer. The page and editor default to English. The EN/DE tabs reuse the Imprint tab components and switch the copy and editor in place without discarding the activity or edits. Its styles are route-specific and scoped to `.swimfix-tool`; they use the website tokens and never import the standalone app stylesheet. Analytics are disabled for this route through the layout’s optional `analytics` prop. The activity file stays in browser memory and is never sent to a server.

`src/features/swimfix/{core,ui}` mirrors sources from the sibling SwimFix repository so deployment works from this repository alone. After changing the editor, run from the SwimFix checkout:

```sh
node scripts/sync-website.mjs ../Website
node scripts/sync-website.mjs ../Website --check
```

Then run `npm run build` here. The exact output is `dist/projects/swimfix.html` (without another directory or extension). The project overview links to that URL through the project’s explicit `href`. Do not put activity samples in public assets.

SwimFix has a static English introduction, explanatory content and visible FAQ for searches such as “FIT file fix” and Garmin swim-file corrections, plus a complete German translation. The initial HTML contains this content before the editor JavaScript runs. JSON-LD describes the real free bilingual WebApplication without invented reviews or ratings. The page heading is SwimFix and there is no project breadcrumb. Its canonical and sitemap entry use the exact `.html` URL.

Astro otherwise emits the tool as `projects/swimfix.html/index.html` under the existing directory output format. The small `swimfix-html-output` build hook flattens only this route. Sitemap configuration replaces its slash-suffixed URL with the canonical `.html` URL; other routes retain their existing output format.
