const Delivery = require('../models/Delivery')
module.exports = {
    deliveryCreate: async (deliveryData) => {
        try{
            const data = {
                name: deliveryData.name,
                surname: deliveryData.surname,
                street: deliveryData.street,
                addressNumber: deliveryData.addressNumber,
                code: deliveryData.code,
                phone: deliveryData.phone,
                email: deliveryData.email,
                comments: deliveryData.comments
            }
            return await new Delivery(data).save()
        }
        catch(err){
            console.log(err)
        }
    }
}