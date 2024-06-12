const Delivery = require('../models/Delivery')
module.exports = {
    deliveryCreate: async ({deliveryAddress, userID}) => {
        console.log(deliveryAddress)
        try{
            let data;
            if(deliveryAddress.type === 'courier'){
                data = {
                    type: 'courier',
                    deliveryAddress: {
                        name: deliveryAddress.name,
                        surname: deliveryAddress.surname,
                        address: deliveryAddress.address,
                        zip: deliveryAddress.zip,
                        phone: deliveryAddress.phone,
                        city: deliveryAddress.city,
                    },
                    userID
                }
            }
            else if(deliveryAddress.type === 'parcelLocker'){
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
            console.log(data);
            return await new Delivery(data).save()
        }
        catch(err){
            console.log(err)
        }
    }
}