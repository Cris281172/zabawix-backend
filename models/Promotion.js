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
    expirationDate: {
        type: Date,
        default: () => new Date(+new Date() + 7*24*60*60*1000)
    },
    offerID: {
        type: String,
    },
    discount: {
        type: Number
    }
})
module.exports = PromotionSchema = mongoose.model('Promotion', promotionSchema)
