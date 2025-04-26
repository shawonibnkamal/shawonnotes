import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import getDisplayFileName from './getDisplayFileName.js';

export function extractTitleFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  // Use the title from frontmatter if available
  if (data.title) {
    return data.title;
  }

  // Fallback to the first `#` heading in the Markdown content
  const match = markdownContent.match(/^#\s+(.*)/m);
  if (match) {
    return match[1];
  }

  // Fallback to the filename if no title or heading is found
  return getDisplayFileName(path.basename(filePath));
}