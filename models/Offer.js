const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategoryID: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    createdTime: {
        type: Number,
        required: true,
    },
    promotionData: {
        type: Array,
    },
    promotionPrice: {
        type: Number,
    },
    categoryName: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    }
})
offerSchema.index({ title: 'text', desc: 'text' });
module.exports = OfferSchema = mongoose.model('Offer', offerSchema)
