const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const basketSchema = Schema({
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

module.exports = BasketSchema = mongoose.model('Basket', basketSchema)
