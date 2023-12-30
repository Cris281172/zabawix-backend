const Basket = require('../models/Basket')
const OfferController = require('../controllers/offer.controller')
const updateBasketPrice = require('../utils/updateBasketPrice')

module.exports = {
    basketCreate: async(userID) => {
        try{
            const newBasket = {
                userID: userID
            }
            return await new Basket(newBasket).save()
        }
        catch(err){
            console.log(err)
        }
    },
    basketAdd: async (userBasket, productID, quantity) => {
        try{
            const basketOffer = await OfferController.basketOffer(productID)
            const productPrice = basketOffer.price;
            const productTitle = basketOffer.title
            const productIndex = userBasket.basket.findIndex(item => item.productID === productID);
            if (productIndex > -1) {
                userBasket.basket[productIndex].quantity += quantity;
            } else {
                userBasket.basket.push({ productID, quantity, productPrice, productTitle });
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
            const productIndex = basket.basket.findIndex(item => item.productID === productID);
            basket.basket[productIndex].quantity = quantity;
            basket.price = updateBasketPrice(basket)
            await basket.save()
            return basket
        }
        catch(err){
            console.log(err)
        }
    }
}