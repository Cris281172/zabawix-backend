const ChestService = require('../services/ChestService')
const Chest = require('../models/Chest')
const User = require('../models/User')
const getOfferData = require('../utils/getOfferData')
const getUserData = require('../utils/getUserData')
module.exports = {
    createChest: async (req, res) => {
        try{
            const {chestName, pointsCost} = req.body;
            const newChest = await ChestService.createChest(chestName, pointsCost)
            res.status(201).send(newChest)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getChests: async (req, res) => {
        try{
            const chests = await Chest.find()
            res.status(200).send(chests)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getChest: async (req, res) => {
        try{
            const id = req.params.id
            const chest = await ChestService.getChest(id)
            if(!chest){
                return res.status(404).send('Chest not found!')
            }
            res.status(200).send(chest)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    chestAddItem: async (req, res) => {
        try{
            const {chestID ,offerID, promotionPrice, hittingChances} = req.body;
            const chest = await Chest.findOne({
                _id: {
                    $eq: chestID
                }
            })
            if(!chest){
                return res.status(404).send('Chest not found');
            }
            const offerData = await getOfferData(offerID)
            if(!offerData){
                return res.status(404).send('Offer not found!')
            }

            const newItem = await ChestService.chestAddItem(chest, offerData._id, offerData.title, offerData.price, promotionPrice, hittingChances)
            if(!newItem){
                return res.status(404).send('hittingChancesSum is greater than 100')
            }
            res.status(201).send(newItem)
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    chestOpen: async (req, res) => {
        try{
            const {userID, chestID} = req.body;
            const user = await User.findOne({
                _id: {
                    $eq: userID
                }
            })
            if(!user){
                return res.status(404).send('User ID not found')
            }
            const chest = await Chest.findOne({
                _id: {
                    $eq: chestID
                }
            })
            if(!chest){
                return res.status(404).send('Chest not found')
            }
            if(chest.pointsCost > user.points){
                return res.status(404).send('You dont have enough points')
            }
            const openChest = await ChestService.chestOpen(chest, user, res)
            res.status(200).send(openChest)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}