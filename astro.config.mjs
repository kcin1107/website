// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nickringelmann.com',
  // Every page carries the build date as lastmod. The site is a static build
  // deployed as a whole, so per-page timestamps would be guesswork; a build
  // date at least gives Google a recrawl signal it currently has none of.
  integrations: [sitemap({
    lastmod: new Date(),
    filter: (page) => !page.endsWith('/scorer/privacy/'),
  })],
});
