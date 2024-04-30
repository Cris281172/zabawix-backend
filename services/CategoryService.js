const Category = require('../models/Category')
const ObjectId = require('mongoose').Types.ObjectId;

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