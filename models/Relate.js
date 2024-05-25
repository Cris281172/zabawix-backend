const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relateSchema = Schema({
	relateName: {
		type: String,
		require: true
	}
})

module.exports = RelateSchema = mongoose.model('Relate', relateSchema)
