const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variantSchema = Schema({
	offerID: {
		type: Schema.Types.ObjectId,
		ref: 'Offer',
		required: true
	},
	attributes: {
		type: Map, of: String
	},
})

module.exports = Variant = mongoose.model('Variant', variantSchema)