const BasketService = require('../services/BasketService')
const Basket = require("../models/Basket");
const BasketHistory = require('../models/BasketHistory')
module.exports = {
    basketCreate: async (req, res) => {
        try{
            const { userID, price, basket } = req.body;
            const userBasket = await Basket.findOne({
                userID: {
                    $eq: userID
                }
            })
            if(userBasket){
                return res.status(404).send("You have an active basket")
            }
            const newBasket = await BasketService.basketCreate(userID, price, basket)
            return res.status(201).send(newBasket)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    basketReplace: async (req, res) => {
        try{
            const {userID} = req.body;
            const userBasket = await Basket.findOne({
                userID: {
                    $eq: userID
                }
            })
            const newBasketHistory = await BasketService.basketReplace(userBasket)
            res.status(201).send(newBasketHistory)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    basketAdd: async (req,res) => {
        try{
            const { userID, productID, quantity } = req.body;
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
                _id: {
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
            const {userID} = req.body;
            const basket = await Basket.findOne({
                userID: {
                    $eq: userID
                }
            })
            if(!basket){
                return res.status(404).send('Basket not found')
            }
            res.status(200).send(basket)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}