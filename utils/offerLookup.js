const ObjectId = require('mongoose').Types.ObjectId;
const offerLookup = (user) => {
	// return {$lookup: {from: 'images', localField: '_id', foreignField: 'offerID', as: 'images'}}
	return [

		{from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'},
	]
}

module.exports = offerLookup;

// return [
// 	{from: 'images', localField: '_id', foreignField: 'offerID', as: 'images'},
// 	{
// 		from: 'promotions',
// 		let: { productID: '$_id', userID: user ? new ObjectId(user.id) : null },
// 		pipeline: [
// 			{
// 				$match: {
// 					$expr: {
// 						$and: [
// 							{ $eq: ['$offerID', '$$productID'] },
// 							{
// 								$or: [
// 									{ $eq: ['$userID', '$$userID'] },
// 									{ $eq: ['$userID', null] }
// 								]
// 							}
// 						]
// 					}
// 				}
// 			}
// 		],
// 		as: 'promotions'
// 	},
// 	{from: 'observes', localField: '_id', foreignField: 'productID', as: 'observe'},
// 	{from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'},
// ]