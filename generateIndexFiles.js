import fs from 'fs';
import path from 'path';
import getDisplayFileName from './.vitepress/getDisplayFileName.js';

const BREAK = `---\n`;
const TABLE_HEADER = `| Content |\n`;
const TABLE_BREAK = `| ---- |\n`;

const generateIndexFile = (dirPath) => {
  const filesAndDirs = fs.readdirSync(dirPath).sort((a, b) => {
    return naturalSort(a, b);
  });

  let markdownTable = BREAK;
  markdownTable += `title: ${getDisplayFileName(path.basename(dirPath))}\n`;
  markdownTable += BREAK;
  markdownTable += TABLE_HEADER;
  markdownTable += TABLE_BREAK;

  filesAndDirs.forEach((fileOrDir) => {
    const filePath = path.join(dirPath, fileOrDir);
    const fileName = path.parse(fileOrDir).name;
    const titleCaseName = getDisplayFileName(fileName);

    if (fs.lstatSync(filePath).isDirectory()) {
      if (fileName === 'images') {
        return;
      }

      markdownTable += `| [${titleCaseName}](./${fileName}/) |\n`;
      generateIndexFile(filePath);
    } else if (path.extname(filePath) === '.md' && fileName !== 'index') {
      markdownTable += `| [${titleCaseName}](${fileName}) |\n`;
    } else if (path.extname(filePath) === '.pdf') {
      markdownTable += `| [${titleCaseName}](${fileName}.pdf) |\n`;
    }
  });

  fs.writeFileSync(path.join(dirPath, 'index.md'), markdownTable);
};

const naturalSort = (a, b) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};

generateIndexFile('./igcse');
generateIndexFile('./ial');
generateIndexFile('./computer-science');