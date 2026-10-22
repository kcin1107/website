// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rename, rmdir } from 'node:fs/promises';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

// /blog stays out of the sitemap until there's a published (non-draft) post;
// the page itself sets noindex in the same case.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const hasPublishedPosts = existsSync(blogDir) && readdirSync(blogDir)
  .filter((file) => file.endsWith('.md'))
  .some((file) => !/^draft:\s*true\s*$/m.test(readFileSync(new URL(file, blogDir), 'utf8')));

// https://astro.build/config
export default defineConfig({
  site: 'https://nickringelmann.com',
  // Every page carries the build date as lastmod. The site is a static build
  // deployed as a whole, so per-page timestamps would be guesswork; a build
  // date at least gives Google a recrawl signal it currently has none of.
  integrations: [sitemap({
    lastmod: new Date(),
    filter: (page) => !page.endsWith('/scorer/privacy/') && !page.endsWith('/projects/swimfix.html/')
      && (hasPublishedPosts || !page.endsWith('/blog/')),
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
