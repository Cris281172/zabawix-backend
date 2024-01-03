const Chest = require('../models/Chest')
const promotionValueFunc = require('../utils/promotionValueFunc')
const randomizeChestContent = require('../utils/randomizeChestContent')
const PromotionController = require('../controllers/promotion.controller')
module.exports = {
    createChest: async (chestName, pointsCost) => {
        try{
            const newChestData = {
                chestName: chestName,
                pointsCost: pointsCost,
                hittingChancesSum: 0,
                quantityItems: 0
            }
            return await new Chest(newChestData).save()
        }
        catch(err){
            console.log(err)
        }
    },
    getChest: async (id) => {
        try{
            return await Chest.findOne({
                _id: {
                    $eq: id
                }
            })
        }
        catch(err){
            console.log(err)
        }
    },
    chestAddItem: async(chest, productID, productTitle, normalPrice, promotionPrice, hittingChances) => {
        try{
            const promotionValue = Math.floor(promotionValueFunc(normalPrice, promotionPrice))
            chest.content.push({productID, productTitle, normalPrice, promotionPrice, hittingChances, promotionValue})
            if(chest.hittingChancesSum + hittingChances > 100){
                return null
            }
            chest.hittingChancesSum += hittingChances;
            chest.quantityItems++
            await chest.save();
            return chest
        }
        catch(err){
            console.log(err)
        }
    },
    chestOpen: async (chest, user, res) => {
        try{
            const chestResult = await randomizeChestContent(chest)
            user.points = user.points - chest.pointsCost
            await user.save();
            return chestResult
        }
        catch(err){
            console.log(err)
        }
    }
}
