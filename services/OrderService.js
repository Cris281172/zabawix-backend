const Order = require("../models/Order");
module.exports = {
    createOrder: async ({userID, status, deliveryName, deliverySurname, deliveryAddress, deliveryCity, deliveryCode, deliveryPhone, deliveryEmail, deliveryComments}) => {
        try{
            const newOrderData = {
                userID: userID,
                status: status,
                deliveryType: String,
                deliveryData: {
                    name: deliveryName,
                    surname: deliverySurname,
                    address: deliveryAddress,
                    city: deliveryCity,
                    code: deliveryCode,
                    phone: deliveryPhone,
                    email: deliveryEmail,
                    comments: deliveryComments
                },
                personalData: {
                    name: personalName,
                    surname: personalSurname,
                    address: personalAddress,
                    city: personalCity,
                    code: personalCode,
                    phone: personalPhone,
                    email: personalEmail,
                    comments: deliveryComments
                }
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