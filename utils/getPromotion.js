const Promotion = require('../models/Promotion')

const getPromotion = async (offerID, user) => {
    let query = {
        offerID: { $eq: offerID }
    };

    if (user) {
        query['userID'] = { $eq: user._id };
    } else {
        query['userID'] = { $exists: false };
    }

    const promotion = await Promotion.findOne(query);

    if (promotion) {
        const dateToCompare = new Date(promotion.endAt);
        const currentDate = new Date();
        if (currentDate > dateToCompare) {
            return null;
        }

        return promotion;
    }

    return null;
}

module.exports = getPromotion;