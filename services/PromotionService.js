const Promotion = require('../models/Promotion')
module.exports = {
    createPromotion: async (promotionName, userID, offerID, discount) => {
        try{
            const newPromotionData = {
                promotionName: promotionName,
                userID: userID,
                offerID: offerID,
                discount: discount
            }
            return await new Promotion(newPromotionData).save()
        }
        catch(err){
            console.log(err);
        }
    }
}