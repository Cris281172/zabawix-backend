const mongoose = require('mongoose');
const Category = require('../models/Category');
const customAggregate = require('./customAggregate');
const ObjectId = require('mongoose').Types.ObjectId;
const childCategories = async (parentId) => {
    const parentObjectId = new ObjectId(parentId);
    let result = [parentId];

    const childCategories = await getAllChildCategories(parentObjectId);
    result = result.concat(childCategories);

    return result;
};
const getAllChildCategories  = async (parentId) => {
    let parentObjectId = parentId;
    if (typeof parentId === 'string') {
        parentObjectId = new ObjectId(parentId);
    }

    let categories = await Category.find({ parentID: parentObjectId }).exec();

    if (categories.length === 0) {
        return [];
    }

    let allChildIds = [];
    for (let category of categories) {
        allChildIds.push(category._id.toString()); // Konwersja ObjectId na String
        const childIds = await getAllChildCategories(category._id);
        allChildIds = allChildIds.concat(childIds);
    }

    return allChildIds;
};

module.exports = childCategories;