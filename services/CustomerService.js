const Customer = require("../models/Customer");
const {modifyCustomer} = require("../controllers/customer.controller");
module.exports = {
    createCustomer: async (customerData) => {
        try{
            return await new Customer(customerData).save()
        }
        catch(err){
            console.log(err)
        }
    },
    modifyCustomer: async (customerData) => {
        try{
            return await Customer.findOneAndUpdate(
                { userID: customerData.userID },
                customerData,
                { new: true }
            );
        }
        catch(err){
            console.log(err)
        }
    }
}