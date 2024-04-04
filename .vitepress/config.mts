import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Shawon Notes',
  description: 'IGCSE and IAL resource website',
  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'IGCSE', link: '/igcse/igcse' },
      { text: 'IAL', link: '/ial/ial' },
    ],

    sidebar: {
      '/igcse/': [
        {
          text: 'IGCSE',
          items: [
            {
              text: 'Notes',
              items: [
                { text: 'Physics', link: '/igcse/notes/' },
                { text: 'Chemistry', link: '/igcse/notes/' },
                { text: 'Math', link: '/igcse/notes/' },
              ],
            },
            {
              text: 'Past Papers',
              items: [
                {
                  text: 'Physics',
                  items: [
                    { text: 'GCE O\' Level', link: '/igcse/past-papers/physics/gce-o-level' },
                    { text: 'IGCSE', link: '/igcse/past-papers/physics/igcse' },
                    { text: 'IGCSE from 2011', link: '/igcse/past-papers/physics/igcse-2011' },
                  ],
                },
                { text: 'Chemistry', link: '/igcse/one' },
                { text: 'Math', link: '/igcse/one' },
              ],
            },
          ],
        },
      ],

      '/ial/': [
        {
          text: 'IAL',
          items: [
            {
              text: 'Notes',
              items: [
                { text: 'Physics', link: '/guide/one' },
                { text: 'Chemistry', link: '/guide/one' },
                { text: 'Math', link: '/guide/one' },
              ],
            },
            {
              text: 'Past Papers',
              items: [
                { text: 'Physics', link: '/guide/one' },
                { text: 'Chemistry', link: '/guide/one' },
                { text: 'Math', link: '/guide/one' },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
