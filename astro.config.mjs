// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rename, rmdir } from 'node:fs/promises';

// https://astro.build/config
export default defineConfig({
  site: 'https://nickringelmann.com',
  // Every page carries the build date as lastmod. The site is a static build
  // deployed as a whole, so per-page timestamps would be guesswork; a build
  // date at least gives Google a recrawl signal it currently has none of.
  integrations: [sitemap({
    lastmod: new Date(),
    filter: (page) => !page.endsWith('/scorer/privacy/') && !page.endsWith('/projects/swimfix.html/'),
    customPages: ['https://nickringelmann.com/projects/swimfix.html'],
  }), {
    name: 'swimfix-html-output',
    hooks: {
      // Keep the portfolio's directory routes, but emit this tool as the exact
      // .html file requested. Astro otherwise creates swimfix.html/index.html.
      'astro:build:done': async ({ dir }) => {
        const folder = new URL('projects/swimfix.html/', dir);
        const temporary = new URL('projects/swimfix.html.tmp', dir);
        await rename(new URL('index.html', folder), temporary);
        await rmdir(folder);
        await rename(temporary, new URL('projects/swimfix.html', dir));
      },
    },
  }],
});
