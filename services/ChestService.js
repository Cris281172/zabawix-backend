const Chest = require('../models/Chest')
const promotionValueFunc = require('../utils/promotionValueFunc')
const randomizeChestContent = require('../utils/randomizeChestContent')
const Image = require('../models/Image')
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
            const chest = await Chest.findOne({ _id: id });

            if (chest && chest.content && chest.content.length > 0) {
                const contentWithImages = await Promise.all(chest.content.map(async (item) => {
                    const image = await Image.findOne({ offerID: item.productID });
                    const imageName = image ? image.name : null;
                    return { ...item.toObject(), imageName };
                }));

                return { ...chest.toObject(), content: contentWithImages };
            }

            return chest;
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
            let chestResult = await randomizeChestContent(chest);
            user.points = user.points - chest.pointsCost;
            await user.save();

            chestResult = chestResult.toObject();

            const image = await Image.findOne({ offerID: chestResult.productID });
            const imageName = image ? image.name : null;

            chestResult.imageName = imageName;

            return chestResult;
        }
        catch(err){
            console.log(err)
        }
    }
}
