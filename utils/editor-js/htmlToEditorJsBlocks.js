const cheerio = require('cheerio');
const htmlToEditorJsBlocks = (html) => {
	const blocks = [];
	const $ = cheerio.load(html);

	$('body').children().each((i, element) => {
		const tag = element.tagName.toLowerCase();
		const innerText = $(element).text().trim();

		if (!innerText) return; // Skip empty elements

		switch (tag) {
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
			case 'h5':
			case 'h6':
				blocks.push({
					type: 'header',
					data: {
						text: innerText,
						level: parseInt(tag.replace('h', ''), 10)
					}
				});
				break;
			case 'p':
				blocks.push({
					type: 'paragraph',
					data: {
						text: innerText
					}
				});
				break;
			case 'ul':
				const items = [];
				$(element).find('li').each((j, li) => {
					items.push($(li).text().trim());
				});
				blocks.push({
					type: 'list',
					data: {
						style: 'unordered',
						items
					}
				});
				break;
			case 'ol':
				const orderedItems = [];
				$(element).find('li').each((j, li) => {
					orderedItems.push($(li).text().trim());
				});
				blocks.push({
					type: 'list',
					data: {
						style: 'ordered',
						items: orderedItems
					}
				});
				break;
			default:
				blocks.push({
					type: 'paragraph',
					data: {
						text: innerText
					}
				});
				break;
		}
	});

	return blocks;
}

module.exports = htmlToEditorJsBlocks