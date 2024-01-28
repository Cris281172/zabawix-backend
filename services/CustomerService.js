const Customer = require("../models/Customer");
const {modifyCustomer} = require("../controllers/customer.controller");
module.exports = {
    createCustomer: async (customerData) => {
        try{
            const data = {
                userID: customerData.userID,
                orderID: customerData.orderID,
                companyName: customerData.companyName,
                nip: customerData.nip,
                name: customerData.name,
                surname: customerData.surname,
                street: customerData.street,
                addressNumber: customerData.address,
                city: customerData.city,
                code: customerData.code,
                email: customerData.email
            }
            return await new Customer(data).save()
        }
        catch(err){
            console.log(err)
        }
    },
    modifyCustomer: async (customerData) => {
        try{
            return await Customer.updateOne({ userID: customerData.userID}, customerData)
        }
        catch(err){
            console.log(err)
        }
    }
}