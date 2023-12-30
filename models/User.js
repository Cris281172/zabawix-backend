const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    emailVerifiedAt : {
        type: String
    },
    emailToken: {
        type: String,
    },
    accountType: {
        type: String
    },
    points: {
        type: Number
    }
})

module.exports = User = mongoose.model('User', userSchema)
