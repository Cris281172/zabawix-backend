const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    addressNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
})

module.exports = DeliverySchema = mongoose.model('Delivery', deliverySchema)