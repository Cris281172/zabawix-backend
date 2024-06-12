const DeliveryService = require('../services/DeliveryService')
const Delivery = require('../models/Delivery')
const ObjectId = require('mongoose').Types.ObjectId;
const getUserByToken = require('../utils/getUserByToken')
module.exports = {
    deliveryGet: async (req, res) => {
        try {
            const token = req.headers.authorization
            const userByToken = await getUserByToken(token)
            if (!userByToken) {
                return res.status(404).send('user not found')
            }
            const getDelivery = await Delivery.findOne({
                userID: ObjectId(userByToken._id)
            })
            if (!getDelivery) {
                return res.status(404).send('Delivery not found')
            }
            return res.status(200).send(getDelivery)
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    },
    deliveryCreate: async (req, res) => {
        try{
            const token = req.headers.authorization
            const userByToken = await getUserByToken(token)
            const deliveryAddress = req.body;
            const delivery = await DeliveryService.deliveryCreate({deliveryAddress, userID: userByToken._id})
            res.status(201).send(delivery)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}