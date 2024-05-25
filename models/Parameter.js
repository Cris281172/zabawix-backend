const moognose = require('mongoose');
const mongoose = require("mongoose");
const Schema = moognose.Schema

const parameterSchema = Schema({
	offerID: {
		type: Schema.Types.ObjectId,
		ref: 'Offer',
		required: true
	},
	ean: {
		type: Number,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	sex: {
		type: String,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	packageSize: {
		length: { type: Number, required: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true }
	},
	productSize: {
		length: { type: Number, required: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true }
	},
	brand: {
		type: String,
		required: true
	}
})

module.exports = Parameter = mongoose.model('Parameter', parameterSchema)