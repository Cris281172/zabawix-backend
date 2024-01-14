const Promotion = require('../models/Promotion')
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
    getUserPromotion: async(userID) => {
        try{
            return await Promotion.find({
                userID: {
                    $eq: userID
                }
            })
        }
        catch(err){

        }
    }
}