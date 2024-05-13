const VariantService = require('../services/VariantService')
module.exports = {
	createVariant: async (req, res) => {
		try{
			const {offerID, attributes} = req.body;
			const createdVariant = await VariantService.createVariant(offerID, attributes)
			if(!createdVariant){
				return res.status(404).send('Vairant not created');
			}
			res.status(201).send('Variant created')
		}
		catch(err){
			res.status(500).json({error: err});
		}
	}
}