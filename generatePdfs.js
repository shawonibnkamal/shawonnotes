import fs from 'fs';
import path from 'path';
import { mdToPdf } from 'md-to-pdf';

const IMAGE_REGEX = /!\[(.*?)\]\((.*?)\)/g;
const FOOTER = 'PDF auto-generated from [Shawon Notes](https://shawonnotes.com). If you found it useful, please consider contributing to the project in [Github](https://github.com/shawonibnkamal/shawonnotes/).\n\n';

const generatePdfFromMarkdownFiles = async (dir) => {
	let combinedMarkdown = '';
	await traverseDirectory(dir, async (filePath) => {
		let content = fs.readFileSync(filePath, 'utf8');
		content = prependDirectoryPathToRelativeUrls(path.dirname(filePath), content);
		combinedMarkdown += content + '\n\n';
	});

	combinedMarkdown += FOOTER;

	const pdf = await mdToPdf({ content: combinedMarkdown }, { dest: path.join(dir, 'download-pdf.pdf') }).catch(console.error);

	if (pdf) {
		console.log('PDF is written to', pdf.filename);
	}
};

const traverseDirectory = async (dir, callback) => {
	const files = fs.readdirSync(dir);

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

generatePdfFromMarkdownFiles('./igcse/revision-notes/physics/');