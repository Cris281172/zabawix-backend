const mongoose = require('mongoose');
const Schema = mongoose.Schema

const visitSchema = Schema({
    ip: String,
    date: {type: Date, default: Date.now}
})

module.exports = Visit = mongoose.model('Visit', visitSchema)
