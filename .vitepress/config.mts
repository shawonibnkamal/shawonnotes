import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Shawon Notes',
  description: 'Compiled resources for IGCSE and IAL to save your time',
  themeConfig: {
    logo: '/images/logo.png',
  },
  appearance: false,
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
    [
      'script',
      {
        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',
      },
    ],
    [
      'script',
      {
        src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
      },
    ],
  ],
});
