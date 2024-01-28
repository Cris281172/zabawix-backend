const Customer = require('../models/Customer');
const CustomerService = require('../services/CustomerService')
module.exports = {
    createCustomer: async (req, res) => {
        try{
            const customerData = req.body;
            const customerExist = await Customer.findOne({
                userID: {
                    $eq: customerData.userID
                }
            })
            if(customerExist){
                return res.status(404).send('Customer already exist');
            }
            const customer = await CustomerService.createCustomer(customerData)
            return res.status(201).send(customer)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getCustomer: async (req, res) => {
        try{
            const {userID} = req.body
            const getCustomer = await Customer.findOne({
                userID: {
                    $eq: userID
                }
            })
            if(!getCustomer){
                return res.status(404).send('Customer not found!')
            }
            res.status(200).send(getCustomer)
        }
        catch(er){
            res.status(500).json({error: err})
        }
    },
    modifyCustomer: async (req, res) => {
        try{
            const customerData = req.body
            const modifyUser = await Customer.findOne({
                userID: {
                    $eq: customerData.userID
                }
            })
            if(!modifyUser){
                return res.status(404).send('Customer not found');
            }
            const modifyCustomer = await CustomerService.modifyCustomer(customerData)
            res.status(201).send(modifyCustomer)
        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
}