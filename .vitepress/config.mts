import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Shawon Notes',
  description: 'Compiled resources for IGCSE and IAL to save your time',
  themeConfig: {
    logo: '/images/logo.png',
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
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
          items: [
            {
              text: 'Notes',
              collapsed: true,
              items: [
                { text: 'Physics', link: '/igcse/notes/' },
                { text: 'Chemistry', link: '/igcse/notes/' },
                { text: 'Math', link: '/igcse/notes/' },
              ],
            },
            {
              text: 'Past Papers',
              collapsed: true,
              items: [
                {
                  text: 'Accounting',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/accounting/gce-o-level',
                    },
                    {
                      text: 'IGCSE',
                      link: '/igcse/past-papers/accounting/igcse',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/accounting/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Bengali',
                  collapsed: true,
                  items: [
                    { text: 'GCE', link: '/igcse/past-papers/bengali/gce' },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/bengali/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Biology',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/biology/gce-o-level',
                    },
                    { text: 'IGCSE', link: '/igcse/past-papers/biology/igcse' },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/biology/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Chemistry',
                  collapsed: true,
                  items: [
                    { text: 'GCE', link: '/igcse/past-papers/chemistry/gce' },
                    {
                      text: 'IGCSE',
                      link: '/igcse/past-papers/chemistry/igcse',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/chemistry/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Economics',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/economics/gce-o-level',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/economics/international-gcse',
                    },
                  ],
                },
                {
                  text: 'English Language B',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/english-language-b/gce-o-level',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/english-language-b/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Further Pure Mathematics',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/further-pure-mathematics/gce-o-level',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/further-pure-mathematics/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Human Biology',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/human-biology/gce-o-level',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/human-biology/international-gcse',
                    },
                  ],
                },
                {
                  text: 'ICT',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/ict/gce-o-level',
                    },
                    { text: 'IGCSE', link: '/igcse/past-papers/ict/igcse' },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/ict/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Mathematics B',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/mathematics-b/gce-o-level',
                    },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/mathematics-b/international-gcse',
                    },
                  ],
                },
                {
                  text: 'Physics',
                  collapsed: true,
                  items: [
                    {
                      text: "GCE O' Level",
                      link: '/igcse/past-papers/physics/gce-o-level',
                    },
                    { text: 'IGCSE', link: '/igcse/past-papers/physics/igcse' },
                    {
                      text: 'International GCSE',
                      link: '/igcse/past-papers/physics/international-gcse',
                    },
                  ],
                },
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
              collapsed: true,
              items: [
                { text: 'Physics', link: '/guide/one' },
                { text: 'Chemistry', link: '/guide/one' },
                { text: 'Math', link: '/guide/one' },
              ],
            },
            {
              text: 'Past Papers',
              collapsed: true,
              items: [
                {
                  text: 'Biology',
                  link: '/ial/past-papers/edexcel-as-ial-biology-past-papers',
                },
                {
                  text: 'Chemistry',
                  link: '/ial/past-papers/edexcel-as-ial-chemistry-past-papers',
                },
                {
                  text: 'Math',
                  collapsed: true,
                  items: [
                    {
                      text: 'Edexcel IAL C12',
                      link: '/ial/past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-c12-past-papers',
                    },
                    {
                      text: 'Edexcel IAL C34',
                      link: '/ial/past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-c34-past-papers',
                    },
                    {
                      text: 'Edexcel IAL M1',
                      link: '/ial/past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-m1-past-papers',
                    },
                    {
                      text: 'Edexcel IAL S1',
                      link: '/ial/past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-s1-past-papers',
                    },
                  ],
                },
                {
                  text: 'Physics',
                  link: '/ial/past-papers/edexcel-as-ial-physics-past-papers',
                },
              ],
            },
          ],
        },
      ],
    },
  },
});
