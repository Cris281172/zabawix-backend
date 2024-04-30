const Delivery = require('../models/Delivery')
module.exports = {
    deliveryCreate: async (deliveryData) => {
        try{
            let data;
            if(deliveryData.type === 'courier'){
                data = {
                    type: 'courier',
                    courierData: {
                        name: deliveryData.name,
                        surname: deliveryData.surname,
                        street: deliveryData.street,
                        addressNumber: deliveryData.addressNumber,
                        code: deliveryData.code,
                        phone: deliveryData.phone,
                        email: deliveryData.email,
                        comments: deliveryData.comments
                    }
                }
            }
            else if(deliveryData.type === 'parcelLocker'){
                data = {
                    type: 'parcelLocker',
                    parcelLocker: {
                        address: {
                            line1: '',
                            line2: ''
                        },
                        parcelLockerID: ''
                    }
                }
            }

            return await new Delivery(data).save()
        }
        catch(err){
            console.log(err)
        }
    }
}