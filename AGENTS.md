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

**Styling:** `src/styles/global.css` (~1350 lines) is imported once in `Layout.astro` and therefore ships with every page. Route-specific rules live in their own stylesheet imported by the page that needs them — `legal.css` for `/imprint` + `/privacy`, `project-detail.css` for `/projects/[slug]` — so they stay off the pages that don't. Smaller tweaks still belong in a scoped `<style>` block inside the relevant `.astro` file. Adding route-specific rules to `global.css` puts them on every page; don't.

**Asset layout** (`public/assets/`, served as-is from the site root):
- `images/` — hero images, project card previews, client logos (SVG/PNG/JPG)
- `icons/` — favicon variants, back arrow
- `fonts/` — self-hosted variable woff2 **subsets**: Roboto (body/UI) and Inter (logo). Built by `scripts/build-fonts.sh` from the upstream TTFs in `fonts-src/`, which are never deployed. The Inter subset only contains the glyphs of the nav logo string, so changing that string means rerunning the script.

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

## Browser verification (Safari MCP)

A Safari MCP server is available for driving a real browser (screenshots, console, DOM, network). It is **opt-in, not the default**. Starting a dev server and looping through navigate/screenshot cycles costs minutes; most changes here don't need it.

Default: make the change, reason about it from the source, and report. `npm run build` is the standard check — it catches Astro/TypeScript/import errors without a browser.

**Use Safari MCP when:**
- The user asks to see it, look at it, screenshot it, or check it in the browser
- The change is visual and its result isn't predictable from the CSS alone — new layout, responsive/breakpoint behaviour, overflow, z-index/stacking, sticky or scroll behaviour
- Debugging runtime JS: theme toggle, mobile nav overlay, anything with `localStorage` or event handlers
- Verifying a fix for a bug that was originally reported as "looks wrong in the browser"
- Contrast/theme checks where the rendered computed colour matters

**Do not use Safari MCP for:**
- Copy, content, and data edits — `src/content/blog/*.md`, `src/data/projects.ts`, page text, metadata, alt text
- Single-property or token-swap CSS edits with an obvious rendered result (colour, font-size, spacing, a `--var` swap)
- Renames, refactors, comment/doc changes, config edits
- Anything already verified by `npm run build`
- Re-confirming a change of the same kind you just verified in this session

When in doubt, ask "would a screenshot actually change what I do next?" If no, skip it. One targeted screenshot beats a navigate/inspect/re-screenshot loop — if two passes haven't answered the question, stop and describe what you see instead of iterating.

## Keeping docs in sync

`README.md` is a structural snapshot of the repo (file tree, routes, data sources, conventions). When a change you make alters that structure — new/removed top-level files or directories, new routes, changed font/asset setup, changed conventions — update `README.md` accordingly, including its "Last updated" date.
