const Order = require('../models/Order')
const OrderService = require('../services/OrderService');
const {getAllUserOrders} = require("../services/OrderService");

module.exports = {
    createOrder: async (req, res) => {
        try{
            const {userID} = req.body;
            const newOrder = await Order.findOne({
                userID: {
                    $eq: userID
                }
            })
            const order = await OrderService.createOrder(req.body)
            res.status(201).send(order)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getAllUserOrders: async (req, res) => {
        try{
            const {userID, status} = req.body;
            const userOrders = await Order.find({
                userID: {
                    $eq: userID
                }
            })
            if(!userOrders){
                return res.status(404).send('No orders!@')
            }
            const orders = await OrderService.getAllUserOrders(req.body)
            res.status(200).send(orders)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}