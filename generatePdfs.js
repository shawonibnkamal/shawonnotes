import fs from 'fs';
import path from 'path';
import { mdToPdf } from 'md-to-pdf';
import getDisplayFileName from './.vitepress/getDisplayFileName.js';

const IMAGE_REGEX = /!\[(.*?)\]\((.*?)\)/g;
const SOURCE = 'PDF auto-generated from [Shawon Notes](https://shawonnotes.com). If you found it useful, please consider contributing to the project in [Github](https://github.com/shawonibnkamal/shawonnotes/).\n\n';
const PUBLIC_DIRECTORY = './public/pdfs/'

const generatePdfFromMarkdownFiles = async (dir, filename) => {
	let combinedMarkdown = `# ${getDisplayFileName(filename)}\n\n`;
	combinedMarkdown += SOURCE;

	await traverseDirectory(dir, async (filePath) => {
		let content = fs.readFileSync(filePath, 'utf8');
		content = prependDirectoryPathToRelativeUrls(path.dirname(filePath), content);
		combinedMarkdown += `\n\n${content}<div class="page-break"></div>`;
	});

	const pdf = await mdToPdf(
		{ content: combinedMarkdown },
		{
			dest: path.join(PUBLIC_DIRECTORY, filename),
			stylesheet: path.join('./pdf-style.css'),
			pdf_options: {
				format: 'A4',
				margin: '20mm',
				toc: {
					first: 1,
					depth: 3
				},
			},
		}
	).catch(console.error);

	if (pdf) {
		console.log('PDF is written to', pdf.filename);
	}
};

const traverseDirectory = async (dir, callback) => {
	const files = fs.readdirSync(dir).sort((a, b) => {
		return naturalSort(a, b);
	});

	for (const file of files) {
		const filePath = path.join(dir, file);

		if (fs.lstatSync(filePath).isDirectory()) {
			await traverseDirectory(filePath, callback);
		} else if (path.extname(filePath) === '.md' && path.basename(filePath) !== 'index.md') {
			await callback(filePath);
		}
	}
};

const prependDirectoryPathToRelativeUrls = (dir, content) => {
	return content.replace(IMAGE_REGEX, (match, altText, url) => {
		if (!path.isAbsolute(url)) {
			url = path.join(dir, url);
		}
		return `![${altText}](${url})`;
	});
}

const naturalSort = (a, b) => {
	return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};

generatePdfFromMarkdownFiles('./igcse/revision-notes/physics/', 'igcse-physics-revision-note.pdf');
generatePdfFromMarkdownFiles('./computer-science/coding-interview/', 'coding-interview-prep.pdf');