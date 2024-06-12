const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
    },
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
    },
    relateID: {
        type: Schema.Types.ObjectId,
    },
    parameter: {
        age: {
            type: Number,
        },
        sex: {
            type: String,
        },
        weight: {
        },
        packageSize: {
            length: { type: Number },
            width: { type: Number },
            height: { type: Number }
        },
        productSize: {
            length: { type: Number },
            width: { type: Number },
            height: { type: Number }
        },
        brand: {
            type: String,
        }
    },
    eanID: {
        type: Number
    }
})
offerSchema.index({ title: 'text', desc: 'text' });
module.exports = OfferSchema = mongoose.model('Offer', offerSchema)
