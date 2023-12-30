const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = Schema({
    offerID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    }
})

module.exports = image = mongoose.model('image', ImageSchema)