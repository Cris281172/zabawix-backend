const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billingSchema = Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	default: {
		type: Boolean
	},
	billingDetails: {
		name: {
			type: String,
			required: true
		},
		surname: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		zip: {
			type: Number,
			required: true
		},
		phone: {
			type: Number,
			required: true
		},
	},
})

module.exports = BillingSchema = mongoose.model('Billing', billingSchema)