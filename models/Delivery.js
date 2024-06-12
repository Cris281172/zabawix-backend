const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = Schema({
    type: {
      type: String,
      required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    deliveryAddress: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
    },
    parcelLocker: {
        address: {
            line1: {
                type: String,
            },
            line2: {
                type: String,
            }
        },
        parcelLockerID: {
            type: String
        }
    }
})

module.exports = DeliverySchema = mongoose.model('Delivery', deliverySchema)