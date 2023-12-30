const Offer = require('../models/Offer')
const getOfferData = async (id) => {
    const offerData = await Offer.findOne({
        _id: {
            $eq: id
        }
    })
    if(!offerData){
        return undefined
    }
    return await offerData
}

module.exports = getOfferData