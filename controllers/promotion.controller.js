const Promotion = require('../models/Promotion')
const PromotionService = require('../services/PromotionService')

module.exports = {
    createPromotion: async (req, res) => {
        try{
            const {promotionName, userID, offerID, discount} = req.body;
            // const promotionExist = await Promotion.findOne({
            //     offerID: {
            //         $eq: offerID
            //     }
            // })
            // if(!promotionExist){
            //     return res.status(404).send('Promotion already exist')
            // }
            const newPromotion = await PromotionService.createPromotion(promotionName, userID, offerID, discount)
            res.status(201).send(newPromotion)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}