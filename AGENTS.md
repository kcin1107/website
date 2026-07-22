# AGENTS.md

This file provides guidance to AI coding agents (e.g. OpenAI Codex) when working with code in this repository.

## Project Overview

Personal portfolio website for Nick Ringelmann, a product designer based in Hamburg, Germany. Built with **Astro 7** (static output, no UI framework). TypeScript for data/config, a single global stylesheet, and minimal inline vanilla JS for the theme toggle and mobile nav.

## Local Development

```bash
npm install      # first time only
npm run dev      # dev server at http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built dist/ locally
```

Requires Node >= 22.12.

## Architecture

File-based routing under `src/pages/`. Every page wraps its content in `src/layouts/Layout.astro`, which provides the `<head>`, navigation, footer, dark/light theme toggle, and mobile nav overlay. The `<slot />` renders page content.

**Routes:**
- `/` — `src/pages/index.astro` — single-page sections: Hero, Projects (first 6), Approach, Blog (3 most recent), Clients
- `/projects` and `/projects/[slug]` — project overview + dynamic detail pages
- `/blog` and `/blog/[slug]` — blog overview + dynamic detail pages
- `/imprint`, `/privacy` — legal pages

**Content & data:**
- `src/data/projects.ts` — typed `projects[]` array + `categories[]` (`business` | `web` | `side`). Projects with a `slug` get a detail page; entries without one render as a non-linked card (e.g. "Coming soon" items).
- `src/content/blog/*.md` — blog posts as Markdown, loaded via an Astro Content Collection. Schema in `src/content.config.ts` (Zod): `title`, `description`, `date`, `tags`, `draft`. Drafts are filtered out of listings.

**Components** (`src/components/`): `Button`, `ProjectCard`, `BlogCard`, `ApproachCard`, `TabGroup` + `TabItem`.

**Styling:** one unified stylesheet at `src/styles/global.css` (~1060 lines), imported once in `Layout.astro`. Page-specific tweaks live in scoped `<style>` blocks inside the relevant `.astro` file.

**Asset layout** (`public/assets/`, served as-is from the site root):
- `images/` — hero images, project card previews, client logos (SVG/PNG/JPG)
- `icons/` — favicon variants, back arrow
- `fonts/` — self-hosted variable fonts: Roboto (body/UI) and Inter (logo)

**Theme:** dark/light via a `data-theme` attribute on `<html>`, persisted in `localStorage`. An inline script in `Layout.astro` sets it before paint to avoid flashing. The actual color swap happens through the CSS custom properties (see CSS Conventions).

## CSS Conventions

- Base spacing unit: 8px
- Border radii: 8px–32px
- Responsive breakpoints: 1023px (tablet) and 767px (mobile)
- Theming via CSS custom properties in `:root`, overridden under `[data-theme="dark"]`: `--white`, `--black`, `--light-grey`, `--dark-grey`, `--status-blue`. Note the naming is value-based, not semantic — e.g. `--white` resolves to a dark teal in dark mode, so use the variables (not raw hex) for anything that should adapt to the theme.
- Status green `#41E788` is still a hardcoded hex; status blue uses `--status-blue` (`#357DFF`)
- BEM-style class names (`nav__wrapper`, `hero__title`, `status--blue`)

## Figma Integration

The project is connected to a Figma MCP server (configured in `.vscode/mcp.json`, local HTTP on port 3845). When the user shares a Figma URL or asks about design changes, use the Figma MCP tools to pull design context before editing components or CSS.

## Keeping docs in sync

`README.md` is a structural snapshot of the repo (file tree, routes, data sources, conventions). When a change you make alters that structure — new/removed top-level files or directories, new routes, changed font/asset setup, changed conventions — update `README.md` accordingly, including its "Last updated" date.
