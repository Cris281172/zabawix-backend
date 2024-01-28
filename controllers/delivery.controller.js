const DeliveryService = require('../services/DeliveryService')
module.exports = {
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