const Promotion = require('../models/Promotion')
const PromotionService = require('../services/PromotionService')

module.exports = {
    createPromotion: async (req, res) => {
        try{
            const {promotionName, userID, offerID, startAt, endAt, promotionPrice} = req.body;
            const userPromotionExist = await Promotion.findOne({
                offerID: {
                    $eq: offerID
                },
                userID: {
                    $eq: userID
                }
            })
            if(userPromotionExist){
                userPromotionExist.endAt = endAt
                await userPromotionExist.save()
                return res.status(201).send(userPromotionExist)
            }
            const newPromotion = await PromotionService.createPromotion(promotionName, userID, offerID, startAt, endAt, promotionPrice)
            res.status(201).send(newPromotion)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getAllPromotion: async (req, res) => {
        try{
            const promotions = await PromotionService.getAllPromotion()
            res.status(200).send(promotions)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getUserPromotion: async (req, res) => {
        try{
            const query = req.query;
            const {userID} = req.body;
            const userPromotion = await PromotionService.getUserPromotion(userID, req.query)
            res.status(200).send(userPromotion)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}