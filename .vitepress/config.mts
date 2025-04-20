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
        defer: '',
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token": "4d581ec7f1f84807a8be373b105dde86"}',
      },
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
    [
      'script',
      {},
      `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
          displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
          processEscapes: true
        },
        svg: {
          fontCache: 'global'
        }
      };
      `,
    ],
    [
      'script',
      {
        type: 'text/javascript',
        src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
        defer: '',
      },
    ],
  ],
});
