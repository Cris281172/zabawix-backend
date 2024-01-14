const Category = require('../models/Category')
const CategoryService = require('../services/CategoryService')
const childCategories = require('../utils/childCategories')

module.exports = {
    categoryCreate: async (req, res) => {
        try{
            const {categoryName} = req.body;
            const checkCreatedCategory = await Category.findOne({
                categoryName: {
                    $eq: categoryName
                }
            })
            if(checkCreatedCategory){
                res.status(409).send('Category already exists');
            }
            const createdCategory = await CategoryService.categoryCreate(req.body)
            res.status(201).send(createdCategory)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getCategories: async (req, res) => {
        childCategories('65809bed4b8c46bf780947a7')
        try{
            const categories = await Category.find();
            res.status(200).send(categories);
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getCategory: async (req, res) => {
        try{
            const {categoryID} = req.body;
            const category = Category.findOne({
                _id: {
                    $eq: categoryID
                }
            })
            if(!category){
                return res.status(404).send('Category not found')
            }
            res.status(200).send(category)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}