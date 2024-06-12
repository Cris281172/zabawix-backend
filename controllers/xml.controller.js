const xml2js = require('xml2js');
const stream = require('stream');
const request = require('request');
const Offer = require('../models/Offer')
const _ = require('lodash');
const OfferService = require('../services/OfferService')
const htmlToEditorJsBlocks = require('../utils/editor-js/htmlToEditorJsBlocks')
const mapParameters = require('../utils/xml/mapParameters')
module.exports = {
	importXML: async (req, res) => {
		try{
			const bufferStream = new stream.PassThrough();
			bufferStream.end(req.file.buffer);

			const parser = new xml2js.Parser();

			parser.parseString(req.file.buffer, async (err, result) => {
				if (err) {
					return res.status(500).send('Error parsing XML');
				}

				const products = _.get(result, 'offer.products[0].product', []).map(p => {
					const titleObject = _.find(p.description[0].name, o => o.$['xml:lang'] === 'pol');
					const title = titleObject ? titleObject._ : '';
					const descObject = _.find(p.description[0].long_desc, o => o.$['xml:lang'] === 'pol');
					const desc = descObject ? descObject._ : '';
					const stock = _.get(p, 'sizes[0].size[0].stock[0].$.quantity', 0);
					const price = _.get(p, 'iaiext:omnibus_price_wholesale[0].iaiext:site[0].$.gross', 0);
					const eanID = _.get(p, 'sizes[0].size[0].$.code_producer', null);

					const editorJsBlocks = htmlToEditorJsBlocks(desc);
					const parameters = _.get(p, 'parameters[0].parameter', []);
					const mappedParameters = mapParameters(parameters);
					return {
						title: title,
						desc: JSON.stringify(editorJsBlocks),
						amount: stock,
						price: price,
						parameters: mappedParameters,
						eanID: eanID
					};
				});

				for (const product of products) {
					const { title, desc, amount, price, parameters, eanID } = product;

					const offerData = {
						title,
						desc,
						price: price,
						createdTime: new Date(),
						amount,
						active: false,
						parameter: parameters,
						eanID
					};

					await OfferService.createOffer(offerData);
				}
				res.send('Import successful');
			});
		}
		catch(err){
			res.status(500).json({error: err})
		}
	}
}