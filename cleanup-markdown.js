import fs from 'fs';
import path from 'path';
import axios from 'axios';

// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Directory containing the Markdown files
const INPUT_DIR = './igcse/revision-notes';

// Function to clean a Markdown file using OpenAI
async function cleanMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Prompt to instruct OpenAI to clean the Markdown file
    const prompt = `
You are a Markdown expert. Clean up the following Markdown file:
1. Fix all tables and convert them to proper Markdown tables.
2. Fix all equations using LaTeX formatting (e.g., inline with $...$ or block with $$...$$).
3. Remove repetitive footers like "Shawon Notes | www.shawonnotes.com" and "IGCSE Chemistry Note".
4. Retain all media references (images) and ensure they are properly formatted.
5. Ensure proper Markdown syntax for headings, lists, and other elements.
6. Enhance readability by organizing content with proper spacing and consistent formatting.
7. Remove repetitive blockquote symbols ('>') and replace them with proper Markdown formatting.
8. Use heading tags (#, ##, ###, etc.) instead of bold text for section titles where appropriate.

Return the cleaned Markdown content with consistent formatting. Here is the Markdown content:

${content}
`;

    // Make a request to the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a Markdown expert.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 4000,
        temperature: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const cleanedContent = response.data.choices[0].message.content.trim();

    // Write the cleaned content back to the file
    fs.writeFileSync(filePath, cleanedContent, 'utf-8');
    console.log(`Cleaned: ${filePath}`);
  } catch (error) {
    console.error(`Error cleaning file ${filePath}:`, error.message);
  }
}

// Function to recursively process all Markdown files in a directory
async function processMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Recursively process subdirectories
      await processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      // Clean up Markdown files
      await cleanMarkdownFile(filePath);
    }
  }
}

// Run the script
(async () => {
  console.log('Starting to clean Markdown files...');
  await processMarkdownFiles(INPUT_DIR);
  console.log('All Markdown files have been cleaned!');
})();