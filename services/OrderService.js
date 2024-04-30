const Order = require("../models/Order");
module.exports = {
    createOrder: async ({status, deliveryID, customerID, shippingMethod}) => {
        try{
            const newOrderData = {
                status: status,
                deliveryID: deliveryID,
                customerID: customerID,
                shippingMethod: shippingMethod
            }
            return await new Order(newOrderData).save();
        }
        catch(err){
            console.log(err)
        }
    },
    getAllUserOrders: async ({userID, status}) => {
        try{
            if(status === undefined){
                return await Order.find({
                    userID: {
                        $eq: userID
                    }
                })
            }
            return await Order.find({
                userID: {
                    $eq: userID
                },
                status: {
                    $eq: status
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }
}