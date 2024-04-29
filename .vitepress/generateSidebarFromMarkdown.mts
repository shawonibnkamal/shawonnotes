import fs from 'fs';
import path from 'path';
import { SidebarItem } from './types.mts';

const wordsToCapitalize = [
  'igcse',
  'ial',
  'gce',
  'o',
  'a',
  'gcse',
  'ict',
  'as',
  'a2',
];

export const generateSidebarFromMarkdown = (
  dir: string,
  basePath: string = '',
): SidebarItem[] => {
  const sidebar: SidebarItem[] = [];
  const files: string[] = fs.readdirSync(dir);

  for (const filename of files) {
    const filepath = path.join(dir, filename);
    const relativeName = path.join(basePath, filename);

    if (fs.statSync(filepath).isDirectory()) {
      sidebar.push(getDirectorySidebarItem(filename, filepath, relativeName));
    } else if (filename.endsWith('.md')) {
      const basename = path.basename(filename, '.md');
      const link = '/' + path.join(basePath, basename);
      sidebar.push({
        text: getDisplayFileName(basename),
        link: link,
      });
    }
  }

  return sidebar;
};

const getDirectorySidebarItem = (
  filename: string,
  filepath: string,
  relativeName: string,
) => {
  return {
    text: getDisplayFileName(filename),
    collapsed: true,
    items: generateSidebarFromMarkdown(filepath, relativeName),
  };
};

const getDisplayFileName = (filename: string): string => {
  const dashRemoved: string = filename.replace(/-/g, ' ');
  let capitalized: string = dashRemoved.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });

  wordsToCapitalize.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    capitalized = capitalized.replace(regex, word.toUpperCase());
  });

  return capitalized;
};
