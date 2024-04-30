const User = require("../models/User");
const Observe = require("../models/Observe");
const customAggregate = require("../utils/customAggregate");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    changeObserve: async (userID, productID, observeStatus) => {
        try{
            if(observeStatus){
                const newObserve = {
                    userID: userID,
                    productID: productID,
                }
                const createdNewObserve = await new Observe(newObserve).save()
                await User.updateOne({
                    _id: userID
                }, {
                    observedOffersID: createdNewObserve._id
                })
                return {type: 'add', ...createdNewObserve}
            }
            else{
                await Observe.deleteOne({
                    productID: {
                        $eq: productID
                    }
                })
                return {type: 'delete', productID: productID}
            }
        }
        catch(err){
            console.log(err);
        }
    },
    // getObserve: async (userID) => {
    //     try{
    //         const aggregationObserve = customAggregate(Observe, {
    //             match: { userID: new ObjectId(userID) },
    //             lookups: [
    //                 {
    //                     from: 'offers',
    //                     localField: 'productID',
    //                     foreignField: '_id',
    //                     as: 'offer'
    //                 },
    //                 {
    //                     from: 'images',
    //                     localField: 'productID',
    //                     foreignField: 'offerID',
    //                     as: 'image'
    //                 },
    //                 {
    //                     from: 'promotions',
    //                     localField: 'productID',
    //                     foreignField: 'offerID',
    //                     as: 'promotions'
    //                 }
    //             ],
    //             addFields: {
    //                 imageName: { $arrayElemAt: ["$image.name", 0] },
    //                 promotionData: { $arrayElemAt: ["$promotions", 0] },
    //             },
    //             replaceRoot: { offer: { $mergeObjects: [{ $arrayElemAt: ["$offer", 0] }, "$$ROOT"] } },
    //         })
    //         const results = await aggregationObserve;
    //         const transformedResults = results.map(item => item.offer);
    //         const total = await Observe.countDocuments({userID: new ObjectId(userID)});
    //         return {count: total, data: transformedResults}
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }
}