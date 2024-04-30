const DeliveryService = require('../services/DeliveryService')
const Delivery = require('../models/Delivery')
module.exports = {
    deliveryGet: async (req, res) => {
        try{
            const {userID} = req.body;
            const getDelivery = await Delivery.findOne({
                userID: userID
            })
            if(!getDelivery){
                res.status(404).send('Delivery not found');
            }
            res.status(200).send(getDelivery)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    deliveryCreate: async (req, res) => {
        try{
            const deliveryData = req.body;
            const delivery = await DeliveryService.deliveryCreate(deliveryData)
            res.status(201).send(delivery)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}