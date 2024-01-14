const Category = require('../models/Category')

const getCategoryName = async (id) => {
    if(!id){
        return undefined
    }
    const category = await Category.findOne({
        _id: {
            $eq: id
        }
    })

    if(!category){
        return undefined
    }
    return category.categoryName
}

module.exports = getCategoryName