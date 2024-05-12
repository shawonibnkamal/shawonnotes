import { defineConfig } from 'vitepress';
import { generateSidebarFromMarkdown } from './generateSidebarFromMarkdown.mts';

export default defineConfig({
  title: 'Shawon Notes',
  description: 'Compiled resources for IGCSE and IAL to save your time',
  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'IGCSE', link: '/igcse/igcse' },
      { text: 'IAL', link: '/ial/ial' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shawonibnkamal/shawonnotes' },
    ],

    sidebar: {
      '/igcse/': [
        {
          text: 'IGCSE',
          items: generateSidebarFromMarkdown('./igcse', 'igcse'),
        },
      ],

      '/ial/': [
        {
          text: 'IAL',
          items: generateSidebarFromMarkdown('./ial', 'ial'),
        },
      ],
    },
  },
  head: [
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-47062542-1',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'UA-47062542-1');",
    ],
  ],
});
