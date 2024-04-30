const Basket = require('../models/Basket')
const OfferController = require('../controllers/offer.controller')
const updateBasketPrice = require('../utils/updateBasketPrice')
const User = require('../models/User')
const getPromotion = require('../utils/getPromotion')
const BasketHistory = require('../models/BasketHistory');
const customAggregate = require('../utils/customAggregate')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    basketCreate: async(userID, price, basket) => {
        try{
            const newBasket = {
                userID: userID,
                price: price,
                basket: basket
            }
            await new Basket(newBasket).save()
            return await module.exports.getBasket(userID);
        }
        catch(err){
            console.log(err)
        }
    },
    basketReplace: async(userBasket) => {
        try{
            await Basket.deleteOne({
                _id: {
                    $eq: userBasket._id
                }
            })

            return await new BasketHistory({...userBasket._doc}).save()

        }
        catch(err){
            console.log(err)
        }
    },
    basketAdd: async (userBasket, productID, quantity) => {
        try{
            const productIndex = userBasket.basket.findIndex(item => item.productID.toString() === productID.toString());

            if (productIndex > -1) {
                userBasket.basket[productIndex].quantity += quantity;
            } else {
                userBasket.basket.push({ productID, quantity });
            }
            await userBasket.save();
            userBasket.price = updateBasketPrice(await module.exports.getBasket(userBasket.userID))
            await userBasket.save();
            return await module.exports.getBasket(userBasket.userID);
        }
        catch(err){
            console.log(err)
        }
    },
    basketDelete: async (id) => {
        try{
            await Basket.deleteOne({
                _id: id
            })
        }
        catch(err){
            console.log(err)
        }
    },
    basketModify: async (basket, quantity, productID) => {
        try{
            const productIndex = basket.basket.findIndex(item => item.productID.toString() === productID);

            if (quantity <= 0) {
                basket.basket.splice(productIndex, 1);
            }
            else {
                basket.basket[productIndex].quantity = quantity;
            }
            await basket.save();
            basket.price = updateBasketPrice(await module.exports.getBasket(basket.userID))
            await basket.save();
            return await module.exports.getBasket(basket.userID);
        }
        catch(err){
            console.log(err)
        }
    },
    getBasket: async (userID) => {
        try{
            const query = {
                match: { userID: userID },
                unwind: '$basket',
                lookups: [
                    {
                        from: 'images',
                        localField: 'basket.productID',
                        foreignField: 'offerID',
                        as: 'basket.imageDetails'
                    },
                    {
                        from: 'offers',
                        localField: 'basket.productID',
                        foreignField: '_id',
                        as: 'basket.offer'
                    },
                    {
                        from: 'promotions',
                        let: { productID: '$basket.productID', userID: new ObjectId(userID) },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$offerID', '$$productID'] },
                                            {
                                                $or: [
                                                    { $eq: ['$userID', '$$userID'] },
                                                    { $eq: ['$userID', null] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'basket.promotionPrice'
                    }
                ],
                addFields: {
                    "basket.imageName": { $arrayElemAt: ["$basket.imageDetails.name", 0] },
                    "basket.productTitle": { $arrayElemAt: ["$basket.offer.title", 0] },
                    "basket.productPrice": { $arrayElemAt: ["$basket.offer.price", 0] },
                    "basket.promotionData": { $arrayElemAt: ["$basket.promotionPrice", 0] }
                },
                group: {
                    _id: "$_id",
                    userID: { $first: "$userID" },
                    price: { $first: "$price" },
                    basket: { $push: "$basket" }
                },
                project: {
                    customFields: {
                        userID: 1,
                        "basket.productID": 1,
                        "basket.quantity": 1,
                        "basket.productPrice": 1,
                        "basket.productTitle": 1,
                        "basket.promotionData": 1,
                        "basket.imageName": 1,
                    }
                }
            };
            const aggregateBasket = await customAggregate(Basket, query);
            if(aggregateBasket.length === 0){
                return{
                    userID: userID,
                    price: 0,
                    basket: []
                }
            }
            return {
                ...aggregateBasket[0],
                price: updateBasketPrice(aggregateBasket[0])
            };
        }
        catch (err){
            console.log(err)
        }
    }
}