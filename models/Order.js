const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = Schema({
    status: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

module.exports = OrderSchema = mongoose.model('Order', orderSchema)