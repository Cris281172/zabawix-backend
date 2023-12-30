const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    categoryID: {
        type: String,
        required: true
    },
    subcategoryID: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    promotionPrice: {
        type: Number,
    },
    createdTime: {
        type: Number,
        required: true,
    }
})

module.exports = OfferSchema = mongoose.model('Offer', offerSchema)
