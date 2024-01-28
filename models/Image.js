const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    offerID: {
        type: Schema.Types.ObjectId,
        ref: 'Offer',
        required: true
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

module.exports = image = mongoose.model('Image', ImageSchema)