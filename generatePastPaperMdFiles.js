import fs from 'fs';
import path from 'path';

// Directories to process
const directories = ['./igcse/past-papers', './ial/past-papers'];

// Function to generate markdown content from JSON
function generateMarkdownFromJson(json) {
  const { title, papers } = json;

  // Start with the title
  let markdown = `---
title: ${title}
---
  `;

  // Add a table for the papers
  markdown += '<table class="table table-pastpapers">\n';
  markdown += '  <thead>\n';
  markdown += '    <tr>\n';
  markdown += '      <th>Year</th>\n';
  markdown += '      <th>Links</th>\n';
  markdown += '    </tr>\n';
  markdown += '  </thead>\n';
  markdown += '  <tbody>\n';

  papers.forEach(paper => {
    markdown += '    <tr>\n';
    markdown += `      <td>${paper.year}</td>\n`;
    markdown += '      <td>\n';
    paper.links.forEach(link => {
      markdown += `        <a href="${link.url}">${link.label}</a><br>\n`;
    });
    markdown += '      </td>\n';
    markdown += '    </tr>\n';
  });

  markdown += '  </tbody>\n';
  markdown += '</table>\n';

  return markdown;
}

// Function to process all JSON files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.json')) {
      const jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const markdown = generateMarkdownFromJson(jsonContent);
      const outputFilePath = filePath.replace('.json', '.md');
      fs.writeFileSync(outputFilePath, markdown, 'utf-8');
      console.log(`Generated markdown: ${outputFilePath}`);
    }
  });
}

// Process all directories
directories.forEach(directory => {
  processDirectory(directory);
});