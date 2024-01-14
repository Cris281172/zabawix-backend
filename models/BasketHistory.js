const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const basketHistorySchema = Schema({
    userID: {
        type: String,
        required: true
    },
    basket: [{
        productID: String,
        quantity: Number,
        productPrice: Number,
        productTitle: String,
        promotionPrice: Number
    }],
    price: {
        type: Number,
    }
})

module.exports = BasketHistorySchema = mongoose.model('BasketHistory', basketHistorySchema)
