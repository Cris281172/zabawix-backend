const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = Schema({
    status: {
        type: String,
        required: true
    },
    deliveryID: {
        type: String,
    },
    customerID: {
        type: String,
    },
    shippingMethod: {
        type: String
    }
})

module.exports = OrderSchema = mongoose.model('Order', orderSchema)