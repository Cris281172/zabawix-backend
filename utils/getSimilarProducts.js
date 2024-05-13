const Offer = require('../models/Offer')
const getSimilarProducts = async (offerID) => {
	const offer = await Offer.findById(offerID);
	const similarProducts = await Offer.find({
		category: offer.categoryID,
		_id: { $ne: offerID }
	}).limit(10);

	return similarProducts;
};

module.exports = getSimilarProducts