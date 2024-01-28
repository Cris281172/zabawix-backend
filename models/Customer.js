const mongoose = require('mongoose');
const Schema = mongoose.Schema

const customerSchema = Schema({
    userID: {
        type: String
    },
    orderID: {
        type: String
    },
    companyName: {
        type: String
    },
    nip: {
        type: Number
    },
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
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = CustomerSchema = mongoose.model('Customer', customerSchema)