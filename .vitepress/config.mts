import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';
import { SidebarItem } from './types.mts';

function generateSidebarForFolder(folderName: string, basePath = '') {
  const folderPath = path.resolve(__dirname, `../${folderName}${basePath}`);
  const files = fs.readdirSync(folderPath).sort(); // Sort files alphabetically
  const sidebar: SidebarItem[] = [];

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      const children = generateSidebarForFolder(
        folderName,
        `${basePath}/${file}`,
      );
      sidebar.push({
        text: file, // Use the folder name as the section title
        link: `/${folderName}${basePath}/${file}/`, // Add link for folders with index.md
        items: children,
      });
    } else if (stat.isFile() && file.endsWith('.md')) {
      // Add Markdown files to the sidebar
      const isIndex = file === 'index.md';
      sidebar.push({
        text: isIndex ? folderName : file.replace('.md', ''), // Use folder name for index.md
        link: `/${folderName}${basePath}${isIndex ? '' : `/${file.replace('.md', '')}`}`, // Normalize index.md links
      });
    }
  }

  return sidebar;
}

// Generate sidebars for the specified folders
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
  ],
});
