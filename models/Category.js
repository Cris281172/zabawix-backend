const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    categoryName: {
        type: String,
        required: true,
    },
    parentID: {
        type: String,
        required: true,
    }
})

module.exports = Category = mongoose.model('Category', categorySchema)