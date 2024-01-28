const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    categoryName: {
        type: String,
        required: true,
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
})

module.exports = Category = mongoose.model('Category', categorySchema)