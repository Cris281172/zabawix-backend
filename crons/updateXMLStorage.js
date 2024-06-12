const request = require("request");
const xml2js = require("xml2js");
const _ = require("lodash");
const Offer = require("../models/Offer");
const updateXMLStorage = async () => {
	try{
		request.get('https://leantoys.com/edi/export-offer.php?client=shopunity&language=pol&token=578c8679c10c010768d660c&shop=2&type=light&format=xml&iof_3_0', (error, response, body) => {
			if(!error && response.statusCode === 200){

				const parser = new xml2js.Parser();
				parser.parseString(body, async (err, result) => {
					if (err) {
						return res.status(500).send('Error parsing XML');
					}
					const products = _.get(result, 'offer.products[0].product', []).map(async p => {
						const eanID = _.get(p, 'sizes[0].size[0].$.code_producer');
						const quantity = _.get(p, 'sizes[0].size[0].stock[0].$.quantity')
						await Offer.updateOne({
								eanID: {
									$eq: eanID
								}
							},
							{
								amount: quantity
							})
					});
					console.log('Udało się :D')
				})
			}

		})
	}
	catch(err){
		console.log(err)
	}
}

module.exports = updateXMLStorage;