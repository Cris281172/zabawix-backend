const Variant = require("../models/Variant");
module.exports = {
	createVariant: async (offerID, attributes) => {
		try{
			const newVariant = {
				offerID: offerID,
				attributes: attributes,
			}
			return await new Variant(newVariant).save()
		}
		catch (err){
			console.log(err)
		}
	}
}