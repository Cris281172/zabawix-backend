const ObjectId = require('mongoose').Types.ObjectId;
const getPromotionsLookup = (user) => {
	return {
		from: 'promotions',
		let: { productID: '$_id', userID: user ? new ObjectId(user.id) : null },
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [
							{ $eq: ['$offerID', '$$productID'] },
							{
								$or: [
									{ $eq: ['$userID', '$$userID'] },
									{ $eq: ['$userID', null] }
								]
							}
						]
					}
				}
			}
		],
		as: 'promotions'
	}
}

module.exports = getPromotionsLookup;