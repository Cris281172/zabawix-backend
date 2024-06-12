const Category = require('../models/Category')

module.exports = {
    categoryCreate: async ({categoryName, parentID}) => {
        try{
            const newCategory = {
                categoryName: categoryName,
                parentID: parentID,
            }
            return await new Category(newCategory).save()
        }
        catch(err){
            console.log(err);
        }
    }
}