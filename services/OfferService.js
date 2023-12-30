const Offer = require('../models/Offer');
const Image = require('../models/Image')

module.exports = {
    createOffer: async ({title, desc, categoryID, price, createdTime, promotionID}) => {
        try{
            const newOffer = {
                title: title,
                desc: desc,
                categoryID: categoryID,
                price: price,
                createdTime: createdTime
            }
            return await new Offer(newOffer).save();
        }
        catch(err){
            console.log(err);
        }
    },
    getOffers: async(query) => {
        try{
            let filters = {};
            if (query.min_price !== undefined && query.min_price !== null) {
                filters.price = { $gt: query.min_price };
            }

            let page = parseInt(query.page) || 0;
            let limit = query.limit || 100
            let offers = await Offer.find(filters)
                .skip(page * limit)
                .limit(limit)
            const total = await offers.length
            return{
                offers,
                limit,
                total,
                page: page + 1,
                pages: Math.ceil(total / limit)
            }
        }
        catch(err){
            console.log(err)
        }
    },
    getOffer: async(id) => {
        try{
            return await Offer.findOne({
                _id: {
                    $eq: id
                }
            })
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