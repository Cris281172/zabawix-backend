const Offer = require('../models/Offer');
const Image = require('../models/Image')
const Promotion = require('../models/Promotion')
const User = require('../models/User')
const getPromotion = require('../utils/getPromotion')
const getCategoryName = require('../utils/getCategoryName')

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
    getOffers: async(query, token) => {
        try{
            let filters = {};
            let sort = {}
            if(query.sort){
                sort = []
                if(query.sort === 'newest'){
                    sort.push(['createdTime', 1])
                }
                if(query.sort === 'oldest'){
                    sort.push(['createdTime', -1])
                }
                if(query.sort === 'lowest-price'){
                    sort.push(['price', 1])
                }
                if(query.sort === 'highest-price'){
                    sort.push(['price', -1])
                }
            }
            if (query.min_price !== undefined && query.min_price !== null) {
                filters.price = { $gt: query.min_price };
            }
            const user = await User.findOne({ token: { $eq: token } });
            let page = parseInt(query.page) || 0;
            let limit = query.limit || 9;
            let offers = await Offer.find(filters).skip(page * limit).limit(limit).sort(sort);
            let currentOfferCount = offers.length;

            offers = await Promise.all(offers.map(async (offer) => {
                const image = await Image.findOne({ offerID: offer._id });
                const imageName = image ? image.name : null;

                const promotion = await getPromotion(offer._id, user)
                const promotionPrice = promotion ? promotion.promotionPrice : null;

                const categoryName = await getCategoryName(offer.categoryID)

                return { ...offer.toObject(), imageName, promotionPrice, categoryName };
            }));

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
            const offer = await Offer.findOne({ _id: { $eq: id } });
            if (!offer) {
                return null;
            }

            const user = await User.findOne({ token: { $eq: token } });

            const promotion = await getPromotion(offer._id, user);

            const images = await Image.find({ offerID: offer._id });
            const imageNames = images.map(image => image.name);

            const promotionData = promotion ? promotion : [];


            return { ...offer.toObject(), imageNames, promotionData };
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