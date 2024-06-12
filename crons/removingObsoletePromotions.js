const customAggregate = require("../utils/customAggregate");
const Promotion = require('../models/Promotion')
const removingObsoletePromotions = async () => {
	const time = new Date();
	time.setDate(time.getDate() - 30);
	try{
		await Promotion.deleteMany({
			endAt: { $lt: time }
		});
	}
	catch(err){
		console.log(err);
	}
}

module.exports = removingObsoletePromotions;