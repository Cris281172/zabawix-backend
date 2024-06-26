const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    token: {
        type: String,
    },
    emailVerifiedAt : {
        type: String
    },
    emailToken: {
        type: Number,
    },
    emailTokenExpires: {
        type: Number
    },
    forgotToken: {
        type: Number
    },
    forgotTokenExpires: {
        type: Date
    },
    accountType: {
        type: String
    },
    points: {
        type: Number
    },
    googleID: {
        type: Number
    },
    observedOffersID: {
        type: String
    },
    createdAt: {
        type: Number
    }
})

module.exports = User = mongoose.model('User', userSchema)
