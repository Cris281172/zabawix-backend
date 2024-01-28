const Offer = require('../models/Offer');
const Image = require('../models/Image')
const Promotion = require('../models/Promotion')
const User = require('../models/User')
const getPromotion = require('../utils/getPromotion')
const customAggregate = require('../utils/customAggregate')
const ObjectId = require('mongoose').Types.ObjectId;
const childCategories = require('../utils/childCategories')

module.exports = {
    createOffer: async ({title, desc, categoryID, price, createdTime, amount}) => {
        try{
            const newOffer = {
                title: title,
                desc: desc,
                categoryID: categoryID,
                price: price,
                createdTime: createdTime,
                amount: amount
            }
            return await new Offer(newOffer).save();
        }
        catch(err){
            console.log(err);
        }
    },
    getOffers: async(query, token) => {
        try{
            let filters = {};

            const sortQueries = {
                newest: {'createdTime': -1},
                oldest: {'createdTime': 1},
                'lowest-price': {'price': 1},
                'highest-price': {'price': -1},
            }

            const sort = sortQueries[query.sort] ? sortQueries[query.sort] : {'createdTime': -1};

            if (query.min_price || query.max_price) {
                filters.price = {};
                if (query.min_price) {
                    filters.price.$gte = Number(query.min_price);
                }
                if (query.max_price) {
                    filters.price.$lte = Number(query.max_price);
                }
            }

            if (query.category) {
                const childCategoryIDs = await childCategories(query.category);
                console.log(childCategoryIDs)
                filters.categoryID = {$in: childCategoryIDs}
            }

            let page = parseInt(query.page) || 0;
            let limit = parseInt(query.limit) || 9;

            const offersStages  = [
                {$sort: sort},
                {$skip: page * limit},
                {$match: filters},
                {
                    $limit: limit
                },
                {
                    $lookup: {
                        from: 'images',
                        localField: '_id',
                        foreignField: 'offerID',
                        as: 'images'
                    }
                },
                {
                    $lookup: {
                        from: 'promotions',
                        localField: '_id',
                        foreignField: 'offerID',
                        as: 'promotions'
                    },
                },
                {
                    $project: {
                        promotionPrice: {
                            $ifNull: [
                                { $arrayElemAt: ["$promotions.promotionPrice", 0] },
                                null
                            ]
                        },
                        imageName: {
                            $ifNull: [
                                { $arrayElemAt: ["$images.name", 0] },
                                null
                            ]
                        },
                        title: 1,
                        desc: 1,
                        categoryID: 1,
                        price: 1,
                        createdTime: 1,
                        amount: 1
                    }
                }
            ]
            const offers = await customAggregate(Offer, offersStages);

            let currentOfferCount = offers.length;

            const total = await Offer.countDocuments(filters);
            return {
                offers,
                limit,
                total,
                currentOfferCount,
                page: page + 1,
                pages: Math.ceil(total / limit)
            }
        }
        catch(err){
            console.log(err)
        }
    },
    getOffer: async(id, token) => {
        try {
            const offerStages  = [
                {
                    $match: { _id:  new ObjectId(id) }
                },
                {
                    $lookup: {
                        from: 'images',
                        localField: '_id',
                        foreignField: 'offerID',
                        as: 'images'
                    }
                },
                {
                    $lookup: {
                        from: 'promotions',
                        localField: '_id',
                        foreignField: 'offerID',
                        as: 'promotions'
                    },
                },
                {
                    $project: {
                        promotionData: {
                            $ifNull: [
                                { $arrayElemAt: ["$promotions", 0] },
                                {}
                            ]
                        },
                        imageNames: {
                            $map: {
                                input: "$images",
                                as: "img",
                                in: "$$img.name"
                            }
                        },
                        title: 1,
                        desc: 1,
                        categoryID: 1,
                        price: 1,
                        createdTime: 1,
                        amount: 1
                    }
                }
            ]
            const aggregatedOffers  = await customAggregate(Offer, offerStages);

            const offer = aggregatedOffers.length > 0 ? aggregatedOffers[0] : null;

            if (!offer) {
                return null;
            }

            return { ...offer };
        }
        catch(err){
            console.log(err)
        }
    },
    basketOffer: async(id) => {
        try{
            const offer = await Offer.findOne({
                _id: {
                    $eq: id
                }
            })
            return {
                price: offer.price,
                title: offer.title
            }
        }
        catch(err){
            console.log(err)
        }
    },
    getOfferImages: async(offerID) => {
        try{
            return await Image.find({
                offerID: {
                    $eq: offerID
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }
}