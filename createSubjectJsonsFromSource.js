import fs from 'fs';
import path from 'path';

// Input and output directories
const INPUT_DIR = './subjects'; // Directory containing subject-specific HTML files
const BASE_OUTPUT_DIR = './igcse/past-papers'; // Base directory for output files

// Domain to prepend to each link
const DOMAIN = 'https://qualifications.pearson.com';

// Function to extract and organize links from a single HTML file
function extractAndOrganizeLinks(html) {
  const links = [];

  // Regex to match all href links ending with .pdf
  const regex = /href="([^"]*\.pdf)"/g;
  let match;

  // Extract all matching links
  while ((match = regex.exec(html)) !== null) {
    const href = match[1]; // The captured link
    links.push(href);
  }

  // Organize links by year and session
  const organizedLinks = {};

  links.forEach((href) => {
    // Encode spaces in the URL
    const encodedHref = href.replace(/ /g, '%20');

    // Extract the filename from the link
    const filename = path.basename(encodedHref);

    // Split the filename by underscores and hyphens
    const parts = filename.split(/[_-]/);

    // Extract the year from the filename (e.g., 20190822 → 2019)
    const yearMatch = filename.match(/(\d{4})\d{4}/);
    const year = yearMatch ? yearMatch[1] : 'Unknown Year';

    // Extract the paper name (e.g., 1C, 1CR, 2C, etc.) and capitalize it
    const paper = (parts[1] || 'Unknown Paper').toUpperCase();

    // Map paper names to labels dynamically
    const paperLabel = `Paper ${paper}`;

    // Determine the type (e.g., msc → Mark Scheme, que → Question Paper, pef → Examiner's Report)
    let type = 'Unknown Type';
    if (filename.includes('msc') || filename.includes('rms')) {
      type = 'Mark Scheme';
    } else if (filename.includes('que')) {
      type = 'Question Paper';
    } else if (filename.includes('pef')) {
      type = "Examiner's Report";
    }

    // Infer the session (January, June, November) by looking for the next available month in the HTML
    const sessionMatch = html.slice(html.indexOf(href)).match(/(January|June|November)/i);
    const session = sessionMatch ? sessionMatch[1] : 'Unknown Session';

    // Skip papers beyond November 2023
    if (year > 2023 || (year === '2023' && session === 'Unknown Session')) return;

    // Initialize the year and session if not already present
    if (!organizedLinks[year]) {
      organizedLinks[year] = {};
    }
    if (!organizedLinks[year][session]) {
      organizedLinks[year][session] = new Set(); // Use a Set to avoid duplicates
    }

    // Add the link to the appropriate year and session
    organizedLinks[year][session].add(
      JSON.stringify({
        url: `${DOMAIN}${encodedHref}`, // Prepend the domain and use the encoded URL
        label: `${paperLabel} (${type})`,
      })
    );
  });

  // Convert the organized links into the desired JSON structure
  const result = [];
  Object.keys(organizedLinks).forEach((year) => {
    Object.keys(organizedLinks[year]).forEach((session) => {
      result.push({
        year: `${year} ${session}`,
        links: Array.from(organizedLinks[year][session]).map((link) => JSON.parse(link)), // Convert Set back to array
      });
    });
  });

  return result;
}

// Function to convert a string to title case
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(/[- ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Process all HTML files in the input directory
function processAllSubjects() {
  // Read all files in the input directory
  const files = fs.readdirSync(INPUT_DIR);

  files.forEach((file) => {
    const filePath = path.join(INPUT_DIR, file);

    // Skip non-HTML files
    if (!file.endsWith('.html')) return;

    // Read the HTML file
    const html = fs.readFileSync(filePath, 'utf-8');

    // Extract and organize links
    const subjectName = path.basename(file, '.html');
    const organizedLinks = {
      title: `IGCSE Edexcel ${toTitleCase(subjectName)} Past Papers`,
      papers: extractAndOrganizeLinks(html),
    };

    // Create the output directory for the subject
    const subjectDir = path.join(BASE_OUTPUT_DIR, subjectName);
    fs.mkdirSync(subjectDir, { recursive: true });

    // Save the organized links to the JSON file
    const outputFilePath = path.join(subjectDir, 'igcse-from-2017.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(organizedLinks, null, 2), 'utf-8');
    console.log(`Processed ${file} -> ${outputFilePath}`);
  });
}

// Run the script
processAllSubjects();