import fs from 'fs';
import path from 'path';


const INPUT_DIR = './subjects';
const BASE_OUTPUT_DIR = './igcse/past-papers';

const DOMAIN = 'https://qualifications.pearson.com';

function extractAndOrganizeLinks(html) {
  const links = [];

  const regex = /href="([^"]*\.pdf)"/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    links.push(href);
  }

  const organizedLinks = {};

  links.forEach((href) => {
    const encodedHref = href.replace(/ /g, '%20');
    const filename = path.basename(encodedHref);
    const parts = filename.split(/[_-]/);
    const yearMatch = filename.match(/(\d{4})\d{4}/);
    const year = yearMatch ? yearMatch[1] : 'Unknown Year';
    const paper = (parts[1] || 'Unknown Paper').toUpperCase();
    const paperLabel = `Paper ${paper}`;
    let type = 'Unknown Type';
    if (filename.includes('msc') || filename.includes('rms')) {
      type = 'Mark Scheme';
    } else if (filename.includes('que')) {
      type = 'Question Paper';
    } else if (filename.includes('pef')) {
      type = "Examiner's Report";
    }

    const sessionMatch = html.slice(html.indexOf(href)).match(/(January|June|November)/i);
    const session = sessionMatch ? sessionMatch[1] : 'Unknown Session';

    if (year > 2023 || (year === '2023' && session === 'Unknown Session')) return;

    if (!organizedLinks[year]) {
      organizedLinks[year] = {};
    }
    if (!organizedLinks[year][session]) {
      organizedLinks[year][session] = new Set();
    }

    organizedLinks[year][session].add(
      JSON.stringify({
        url: `${DOMAIN}${encodedHref}`,
        label: `${paperLabel} (${type})`,
      })
    );
  });

  const result = [];
  Object.keys(organizedLinks).forEach((year) => {
    Object.keys(organizedLinks[year]).forEach((session) => {
      result.push({
        year: `${year} ${session}`,
        links: Array.from(organizedLinks[year][session]).map((link) => JSON.parse(link)),
      });
    });
  });

  return result;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(/[- ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function processAllSubjects() {
  const files = fs.readdirSync(INPUT_DIR);

  files.forEach((file) => {
    const filePath = path.join(INPUT_DIR, file);
    if (!file.endsWith('.html')) return;
    const html = fs.readFileSync(filePath, 'utf-8');
    const subjectName = path.basename(file, '.html');
    const organizedLinks = {
      title: `IGCSE Edexcel ${toTitleCase(subjectName)} Past Papers`,
      papers: extractAndOrganizeLinks(html),
    };

    const subjectDir = path.join(BASE_OUTPUT_DIR, subjectName);
    fs.mkdirSync(subjectDir, { recursive: true });

    const outputFilePath = path.join(subjectDir, 'igcse-from-2017.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(organizedLinks, null, 2), 'utf-8');
    console.log(`Processed ${file} -> ${outputFilePath}`);
  });
}

processAllSubjects();