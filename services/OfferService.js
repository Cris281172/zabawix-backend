const Offer = require('../models/Offer');
const Image = require('../models/Image')
const Promotion = require('../models/Promotion')
const User = require('../models/User')
const getPromotion = require('../utils/getPromotion')
const customAggregate = require('../utils/customAggregate')
const ObjectId = require('mongoose').Types.ObjectId;
const childCategories = require('../utils/childCategories')
const Observe = require('../models/Observe')


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
    getOffers: async(query, user) => {
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

                filters.categoryID = {$in: childCategoryIDs}
            }

            if (query.text) {
                filters.$or = [
                    { title: { $regex: new RegExp(query.text, 'i') } },
                    { desc: { $regex: new RegExp(query.text, 'i') } }
                ];
            }

            let page = parseInt(query.page) || 0;
            let limit = parseInt(query.limit) || 12;
            let offers
            offers = await customAggregate(Offer, {
                sort,
                skip: page * limit,
                match: filters,
                limit: limit,
                lookups: [
                    {from: 'images', localField: '_id', foreignField: 'offerID', as: 'images'},
                    {
                        from: 'promotions',
                        let: { productID: '$_id', userID: user ? new ObjectId(user.id) : null },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$offerID', '$$productID'] },
                                            {
                                                $or: [
                                                    { $eq: ['$userID', '$$userID'] },
                                                    { $eq: ['$userID', null] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'promotions'
                    },
                    {from: 'observes', localField: '_id', foreignField: 'productID', as: 'observe'},
                    {from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'}
                ],
                project: {
                    customFields:{
                        promotionData: {$ifNull: [{ $arrayElemAt: ["$promotions", 0] }, {}]},
                        imageName: {$ifNull: [{ $arrayElemAt: ["$images.name", 0] }, null]},
                        categoryName: {$ifNull: [{ $arrayElemAt: ["$category.categoryName", 0] }, null]},
                        observed: {
                            $cond: {
                                if: {
                                    $gt: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: "$observe",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.userID", user ? new ObjectId(user.id) : null] }
                                                }
                                            }
                                        },
                                        0
                                    ]
                                },
                                then: true,
                                else: false
                            }
                        }
                    },
                    fields: ['title', 'categoryID', 'price', 'createdTime', 'amount']
                }
            });

            let total

            if(query.observe){
                offers = offers.filter(el => el.observed === true);
                total = await Observe.countDocuments({userID: user._id})
            }
            else if(!query.observe){
                total = await Offer.countDocuments(filters);
            }

            let currentOfferCount = offers.length;

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
    getOffer: async(id, user) => {
        try {
            const aggregatedOffers = await customAggregate(Offer, {
                match: {_id:  new ObjectId(id)},
                lookups: [
                    {from: 'images', localField: '_id', foreignField: 'offerID', as: 'images'},
                    {from: 'observes', localField: '_id', foreignField: 'productID', as: 'observe'},
                    {
                        from: 'promotions',
                        let: { productID: '$_id', userID: user ? new ObjectId(user.id) : null },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$offerID', '$$productID'] },
                                            {
                                                $or: [
                                                    { $eq: ['$userID', '$$userID'] },
                                                    { $eq: ['$userID', null] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'promotions'
                    }
                ],
                project: {
                    customFields:{
                        promotionData: {$ifNull: [{ $arrayElemAt: ["$promotions", 0] }, {}]},
                        imageNames: {$map: {input: "$images", as: "img", in: "$$img.name"}},
                        observed: {
                            $cond: {
                                if: {
                                    $gt: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: "$observe",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.userID", user ? user.id : null] }
                                                }
                                            }
                                        },
                                        0
                                    ]
                                },
                                then: true,
                                else: false
                            }
                        }
                    },
                    fields: ['title', 'desc', 'categoryID', 'price', 'createdTime', 'amount']
                }
            });

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