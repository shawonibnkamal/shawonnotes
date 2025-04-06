import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Directories to process
const directories = ['./igcse/past-papers', './ial/past-papers'];

// Function to process a single markdown file
function processMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  // Extract table data from the markdown body
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/;
  const match = body.match(tableRegex);
  const tableHtml = match ? match[1] : '';

  const rows = [];
  const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
    const rowHtml = rowMatch[1];
    const cells = [];
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(cellMatch[1].trim());
    }
    rows.push(cells);
  }

  // Convert rows into structured JSON
  const papers = rows.slice(1).map(row => {
    const year = row[0];
    const linksHtml = row[1];
    const links = [];
    const linkRegex = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(linksHtml)) !== null) {
      links.push({ url: linkMatch[1], label: linkMatch[2] });
    }
    return { year, links };
  });

  return { title: data.title, papers };
}

// Function to process all markdown files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.md')) {
      const json = processMarkdownFile(filePath);
      const outputFilePath = filePath.replace('.md', '.json');
      fs.writeFileSync(outputFilePath, JSON.stringify(json, null, 2), 'utf-8');
      fs.unlinkSync(filePath); // Delete the original markdown file
      console.log(`Converted and replaced: ${filePath} -> ${outputFilePath}`);
    }
  });
}

// Process all directories
directories.forEach(directory => {
  processDirectory(directory);
});