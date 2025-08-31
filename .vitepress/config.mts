import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';
import { SidebarItem } from './types.mts';
import getDisplayFileName from './getDisplayFileName';
import { extractTitleFromFile } from './extractTitleFromFile';

function generateSidebarForFolder(
  folderName: string,
  basePath = '',
  flatPages: SidebarItem[] = [],
) {
  const folderPath = path.resolve(__dirname, `../${folderName}${basePath}`);
  const files = fs.readdirSync(folderPath).sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });

  for (const file of files) {
    if (file === 'images') continue;

    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.md');
      const folderLink = `/${folderName}${basePath}/${file}/`;
      if (
        fs.existsSync(indexPath) &&
        !flatPages.some((page) => page.link === folderLink)
      ) {
        flatPages.push({
          text: getDisplayFileName(file), // Use the folder name as the page title
          link: folderLink, // Link to the folder
        });
      }

      generateSidebarForFolder(folderName, `${basePath}/${file}`, flatPages);
    } else if (stat.isFile() && file.endsWith('.md')) {
      if (file === 'index.md') continue;
      flatPages.push({
        text: extractTitleFromFile(fullPath),
        link: `/${folderName}${basePath}${`/${file.replace('.md', '')}`}`,
      });
    }
  }

  return flatPages;
}

const sidebar = [
  {
    text: 'IGCSE',
    items: generateSidebarForFolder('igcse'),
  },
  {
    text: 'IAL',
    items: generateSidebarForFolder('ial'),
  },
  {
    text: 'Computer Science',
    items: generateSidebarForFolder('computer-science'),
  },
];

export default defineConfig({
  title: 'Shawon Notes',
  description: 'Compiled resources for IGCSE and IAL to save your time',
  themeConfig: {
    logo: '/images/logo.png',
    sidebar,
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
    [
      'script',
      {
        src: '/redirects.js',
      },
    ],
  ],
});
