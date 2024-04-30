const Promotion = require('../models/Promotion')
const Offer = require("../models/Offer");
module.exports = {
    createPromotion: async (promotionName, userID, offerID, startAt, endAt, promotionPrice) => {
        try{
            const newPromotionData = {
                promotionName: promotionName,
                userID: userID,
                offerID: offerID,
                startAt: startAt,
                endAt: endAt,
                promotionPrice: promotionPrice
            }
            return await new Promotion(newPromotionData).save()
        }
        catch(err){
            console.log(err);
        }
    },
    getAllPromotion: async () => {
        try{
            return await Promotion.find()
        }
        catch(err){
            console.log(err)
        }
    },
    getUserPromotion: async(userID, query) => {
        try{
            const currentDate = new Date();
            let page = parseInt(query.page) || 0;
            let limit = query.limit || 2;
            let queryCondition = {
                userID: { $eq: userID }
            };

            if (query.status === 'active') {
                queryCondition.endAt = { $gt: currentDate };
            }

            if(query.status === 'end'){
                queryCondition.endAt = { $lt: currentDate };
            }

            const promotion = await Promotion.find(queryCondition).skip(page * limit).limit(limit);
            const total = await Promotion.countDocuments(queryCondition);
            return {
                promotion,
                limit,
                total,
                page: page + 1,
                pages: Math.ceil(total / limit)
            }

        }
        catch(err){

        }
    }
}