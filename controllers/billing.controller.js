const getUserByToken = require("../utils/getUserByToken");
const BillingService = require('../services/BillingService')
const Billing = require('../models/Billing')
module.exports = {
	createBilling: async (req, res) => {
		try{
			const token = req.headers.authorization
			const userByToken = await getUserByToken(token)
			const billingDetails = req.body;
			const checkCountBilling = await Billing.countDocuments({
				userID: {
					$eq: userByToken._id
				}
			})
			if(checkCountBilling >= 3){
				return res.status(204)
			}
			const billing = await BillingService.createBilling({billingDetails, userID: userByToken._id})
			if(!billing){
				return res.status(400).send('Error with adding billing')
			}
			res.status(201).send(billing)
		}
		catch(err){
			res.status(500).json({error: err})
		}
	},
	getBilling: async (req, res) => {
		try{
			const token = req.headers.authorization
			const userByToken = await getUserByToken(token)
			if(!userByToken){
				return res.status(404).send('User not found')
			}
			const billing = await Billing.findOne({
				userID: {
					$eq: userByToken._id
				}
			})
			if(!billing){
				return res.status(404).send('Billing not found')
			}
			return res.status(200).send(billing)
		}
		catch(err){
			res.status(500).json({error: err})
		}
	},
	getBillings: async (req, res) => {
		try{
			const token = req.headers.authorization
			const userByToken = await getUserByToken(token)
			if(!userByToken){
				return res.status(404).send('User not found')
			}
			const billings = await Billing.find({
				userID: {
					$eq: userByToken._id
				}
			})
			if(!billings){
				return res.status(404).send('Billings not found')
			}
			return res.status(200).send([...billings])
		}
		catch(err){
			res.status(500).json({error: err})
		}
	},
	editBilling: async (req, res) => {
		try{
			const id = req.body.id;
			const billingDetails = req.body.billingDetails;
			if(!id){
				return res.status(404).send('Billing id not found');
			}
			const editedBilling = await BillingService.editBilling({id, billingDetails})
			if(!editedBilling){
				return res.status(500).send('Error with editing bill')
			}
			return res.status(201).send(editedBilling)
		}
		catch(err){
			res.status(500).json({error: err})
		}
	},
	deleteBilling: async (req, res) => {
		try{
			const id = req.body.id;
			if(!id){
				return res.status(404).send('Billing id not found')
			}
			const deletedBilling = await Billing.deleteOne({
				_id: {
					$eq: id
				}
			})
			return res.status(200).send({deletedID: req.body.id})
		}
		catch(err){
			res.status(500).json({error: err})
		}
	}
}