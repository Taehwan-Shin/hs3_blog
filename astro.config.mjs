import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { siteConfig } from './src/config.ts';
import swup from '@swup/astro';
import refreshContentOnChange from './src/integrations/refresh-content-on-change.ts';
import { fileURLToPath } from 'node:url';

// Remark Plugins
import remarkMath from 'remark-math';
import remarkReadingTime from 'remark-reading-time';
import remarkToc from 'remark-toc';
import remarkBreaks from 'remark-breaks';
import { remarkInternalLinks, remarkFolderImages, remarkImageCaptions } from './src/utils/internallinks.ts';
import remarkObsidianImageSize from './src/utils/remark-obsidian-image-size.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import remarkImageGrids from './src/utils/remark-image-grids.ts';
import { remarkObsidianComments } from './src/utils/remark-obsidian-comments.ts';
import remarkInlineTags from './src/utils/remark-inline-tags.ts';
import remarkMermaid from './src/utils/remark-mermaid.ts';
import { remarkObsidianEmbeds } from './src/utils/remark-obsidian-embeds.ts';
import { remarkBases } from './src/utils/remark-bases.ts';

// Rehype Plugins
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMark from './src/utils/rehype-mark.ts';
import rehypeImageAttributes from './src/utils/rehype-image-attributes.ts';
import { rehypeNormalizeAnchors } from './src/utils/rehype-normalize-anchors.ts';

export default defineConfig({
  site: siteConfig.site,
  redirects: (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'build') ? {
  '/contact-me': '/contact',
  '/contact-us': '/contact',
  '/privacy': '/privacy-policy'
} : {},
image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  integrations: [
    refreshContentOnChange(),
    tailwind(),
    sitemap(),
    mdx({
      remarkPlugins: [
        remarkMath,
        remarkBreaks,
        [remarkReadingTime, {}],
        [remarkToc, { tight: true, ordered: false, maxDepth: 3, heading: 'contents|table[ -]of[ -]contents?|toc' }],
        remarkObsidianImageSize(),
        remarkInternalLinks(),
        remarkFolderImages(),
        remarkImageCaptions(),
        remarkCallouts(),
        remarkImageGrids(),
        remarkObsidianComments(),
        remarkInlineTags(),
        remarkMermaid(),
        remarkObsidianEmbeds(),
        remarkBases(),
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeMark(),
        rehypeImageAttributes(),
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'wrap',
          properties: {
            className: ['anchor-link'],
            ariaLabel: 'Link to this section'
          }
        }],
        rehypeNormalizeAnchors(),
      ],
    }),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      containers: ['#swup-container'],
      smoothScrolling: false,
      cache: true,
      preload: true,
      accessibility: false,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    })
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkBreaks,
      [remarkReadingTime, {}],
      [remarkToc, { tight: true, ordered: false, maxDepth: 3, heading: 'contents|table[ -]of[ -]contents?|toc' }],
      remarkObsidianImageSize(),
      remarkInternalLinks(),
      remarkFolderImages(),
      remarkImageCaptions(),
      remarkCallouts(),
      remarkImageGrids(),
      remarkObsidianComments(),
      remarkInlineTags(),
      remarkMermaid(),
      remarkObsidianEmbeds(),
      remarkBases(),
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeMark(),
      rehypeImageAttributes(),
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: {
          className: ['anchor-link'],
          ariaLabel: 'Link to this section'
        }
      }],
      rehypeNormalizeAnchors(),
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@/types': fileURLToPath(new URL('./src/types.ts', import.meta.url)),
        '@/config': fileURLToPath(new URL('./src/config.ts', import.meta.url))
      }
    }
  }
});
