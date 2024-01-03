const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chestSchema = Schema({
    chestName: {
        type: String,
        required: true
    },
    pointsCost: {
        type: Number,
        required: true
    },
    content: [{
        productID: String,
        productTitle: String,
        normalPrice: Number,
        promotionValue: Number,
        promotionPrice: Number,
        hittingChances: Number,
    }],
    hittingChancesSum: {
        type: Number,
        required: true
    },
    quantityItems: {
        type: Number,
        required: true
    }
})
module.exports = ChestSchema = mongoose.model('Chest', chestSchema)
