const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = Schema({
    promotionName: {
        type: String,
        required: true
    },
    userID: {
        type: String
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    offerID: {
        type: Schema.Types.ObjectId,
        ref: "Offer"
    },
    promotionPrice: {
        type: Number
    }
})

module.exports = PromotionSchema = mongoose.model('Promotion', promotionSchema)
