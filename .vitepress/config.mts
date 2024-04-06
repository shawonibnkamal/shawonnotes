import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

function getFiles(dir: string, files_: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function getDisplayFileName(file) {
  const dashRemoved = file.replace(/-/g, ' ');
  return dashRemoved.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
}

function generateSidebar(dir: string, basePath: string = '') {
  const sidebar: any[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const name = path.join(dir, file);
    const relativeName = path.join(basePath, file);
    if (fs.statSync(name).isDirectory()) {
      sidebar.push({
        text: getDisplayFileName(file),
        collapsed: true,
        items: generateSidebar(name, relativeName),
      });
    } else if (file.endsWith('.md')) {
      const basename = path.basename(file, '.md');
      const link = '/' + path.join(basePath, basename);
      sidebar.push({
        text: getDisplayFileName(basename),
        link: link,
      });
    }
  }

  return sidebar;
}

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
          items: generateSidebar('./igcse', 'igcse'),
        },
      ],

      '/ial/': [
        {
          text: 'IAL',
          items: generateSidebar('./ial', 'ial')
        },
      ],
    },
  },
});
