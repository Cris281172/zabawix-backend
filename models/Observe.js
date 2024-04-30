const mongoose = require('mongoose')
const Schema = mongoose.Schema

const observeSchema = Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = ObserveSchema = mongoose.model('Observe', observeSchema)
