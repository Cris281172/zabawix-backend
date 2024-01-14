const Basket = require('../models/Basket')
const OfferController = require('../controllers/offer.controller')
const updateBasketPrice = require('../utils/updateBasketPrice')
const User = require('../models/User')
const getPromotion = require('../utils/getPromotion')
const BasketHistory = require('../models/BasketHistory')

module.exports = {
    basketCreate: async(userID, price, basket) => {
        try{
            const newBasket = {
                userID: userID,
                price: price,
                basket: basket
            }
            return await new Basket(newBasket).save()
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
    basketAdd: async (userBasket, productID, quantity, token) => {
        try{
            const basketOffer = await OfferController.basketOffer(productID)
            const productPrice = basketOffer.price;
            const productTitle = basketOffer.title
            const productIndex = userBasket.basket.findIndex(item => item.productID === productID);
            const user = await User.findOne({
                token: {
                    $eq: token
                }
            })

            const promotion = await getPromotion(productID, user);
            const promotionPrice = promotion ? promotion.promotionPrice : null;
            if (productIndex > -1) {
                userBasket.basket[productIndex].quantity += quantity;
            } else {
                userBasket.basket.push({ productID, quantity, productPrice, productTitle, promotionPrice });
            }

            userBasket.price = updateBasketPrice(userBasket)
            await userBasket.save();
            return userBasket
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
            basket.price = updateBasketPrice(basket);
            await basket.save();
            return basket;
        }
        catch(err){
            console.log(err)
        }
    }
}