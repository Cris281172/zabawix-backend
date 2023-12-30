const Category = require('../models/Category')
const childCategories = async (id) => {
    const categories = await Category.aggregate([{
        $graphLookup: {
            from: 'Category',
            connectFromField: '_id',
            connectToField: 'parent_ID',
            as: 'test',
            startWith: '$_id'
        }

    }])

    console.log(categories);


}

module.exports = childCategories