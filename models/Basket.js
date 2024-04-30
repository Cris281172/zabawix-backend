const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const basketSchema = Schema({
    userID: {
        type: Schema.Types.Mixed,
        ref: 'User',
    },
    basket: [{
        productID: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: Number,
    }],
    price: {
        type: Number,
    }
})

module.exports = BasketSchema = mongoose.model('Basket', basketSchema)
