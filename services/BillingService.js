const Billing = require('../models/Billing')
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
	createBilling: async ({billingDetails, userID}) => {
		try{
			const billingData = {
				billingDetails: {
					...billingDetails
				},
				userID
			}
			return await new Billing(billingData).save()
		}
		catch(err){
			console.log(err)
		}
	},
	editBilling: async ({id, billingDetails}) => {
		try{
			return await Billing.updateOne({
				_id: ObjectId(id)
			}, {
				billingDetails: {
					...billingDetails
				}
			})
		}
		catch(err){
			console.log(err);
		}
	}
}