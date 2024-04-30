const Observe = require('../models/Observe')
const ObserveService = require('../services/ObserveService')
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
    changeObserve: async (req, res) => {
        try{
            const {userID, productID} = req.body;
            const observed = await Observe.findOne({
                productID: {
                    $eq: ObjectId(productID)
                }
            })
            if(observed){
                const createObserve = await ObserveService.changeObserve(userID, productID, false)
                return res.status(201).send(createObserve)
            }
            else{
                const createObserve = await ObserveService.changeObserve(userID, productID, true)
                return res.status(201).send(createObserve)
            }
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getObserve: async (req, res) => {
        try{
            const {userID} = req.body;
            const userObserve = await ObserveService.getObserve(userID)
            return res.status(200).send(userObserve)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getObserveCount:  async (req, res) => {
        try{
            const {userID} = req.body;
            const count = await Observe.countDocuments({userID: userID});

            res.status(200).send(`${count}`);
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}