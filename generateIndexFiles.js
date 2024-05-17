import fs from 'fs';
import path from 'path';
import getDisplayFileName from './.vitepress/getDisplayFileName.js';

const generateIndexFile = (dirPath) => {
  const filesAndDirs = fs.readdirSync(dirPath);

  let markdownTable = `---\n`;
  markdownTable += `title: ${getDisplayFileName(path.basename(dirPath))}\n`;
  markdownTable += `---\n`
  markdownTable += `| Content |\n`;
  markdownTable += `| ---- |\n`;

  filesAndDirs.forEach((fileOrDir) => {
    const filePath = path.join(dirPath, fileOrDir);
    const fileName = path.parse(fileOrDir).name;
    const titleCaseName = getDisplayFileName(fileName);

    if (fs.lstatSync(filePath).isDirectory()) {
      markdownTable += `| [${titleCaseName}](./${fileName}/) |\n`;
      generateIndexFile(filePath);
    } else if (path.extname(filePath) === '.md' && fileName !== 'index') {
      markdownTable += `| [${titleCaseName}](${fileName}) |\n`;
    }
  });

  fs.writeFileSync(path.join(dirPath, 'index.md'), markdownTable);
};


generateIndexFile('./igcse');
generateIndexFile('./ial')