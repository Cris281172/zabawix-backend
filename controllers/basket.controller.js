const BasketService = require('../services/BasketService')
const Basket = require("../models/Basket");
const BasketHistory = require('../models/BasketHistory')
module.exports = {
    basketCreate: async (req, res) => {
        try {

            const userID = req.body.userID ? req.body.userID : (req.headers.sessionID);
            const { price, basket } = req.body;
            const userBasket = await Basket.findOne({ userID });
            // if (userBasket && basket.length !== 0) {
            //     await BasketService.basketReplace(userBasket);
            // }
            console.log(userBasket)
            if(userBasket){
                return res.status(409).send('Basket already exists')
            }

            const newBasket = await BasketService.basketCreate(userID, price, basket);
            if (!req.user) {
                res.cookie('sessionID', userID, { httpOnly: true, maxAge: 86400000 });
            }
            return res.status(201).send(newBasket);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    basketAdd: async (req,res) => {
        try{
            const { productID, quantity } = req.body;
            const userID = req.body.userID ? req.body.userID : (req.headers.sessionID)
            const token = req.headers.authorization
            const userBasket = await Basket.findOne({
                userID: {
                    $eq: userID
                }
            })
            if(!userBasket){
                return res.status(404).send('Basket not found!')
            }

            const basket = await BasketService.basketAdd(userBasket, productID, quantity, token)
            return res.status(201).send(basket)

        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    basketDelete: async (req, res) => {
        try{
            const {basketID} = req.body
            const basket = await Basket.findOne({
                _id: {
                    $eq: basketID
                }
            })
            if(!basket){
                return res.status(404).send('Basket not found!')
            }
            const deleteBasket = await BasketService.basketDelete(basketID)
            return res.status(200).send(deleteBasket)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    basketModify: async(req, res) => {
        try{
            const { basketID, quantity, productID } = req.body;
            const basket = await Basket.findOne({
                userID: {
                    $eq: basketID
                }
            })
            if(!basket){
                return res.status(404).send('Basket not found')
            }
            const modifyBasket = await BasketService.basketModify(basket, quantity, productID)
            return res.status(200).send(modifyBasket)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    basketGet: async(req, res) => {
        try{
            const userID = req.body.userID ? req.body.userID : req.headers.sessionID;
            const basket = await Basket.findOne({
                userID: {
                    $eq: userID
                }
            })
            if(!basket){
                return res.status(404).send('Basket not found')
            }
            const basketData = await  BasketService.getBasket(userID, basket)
            res.status(200).send(basketData)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}