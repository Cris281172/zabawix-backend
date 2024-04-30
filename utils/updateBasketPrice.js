const checkDateValid = require('../utils/checkDateValid')
const updateBasketPrice = (userBasket) => {
    let sum = 0
    userBasket.basket.forEach(el => {
        // if(checkDateValid(el.promotionData.endAt)){
            sum += el.quantity * (el.promotionData ? el.promotionData.promotionPrice : el.productPrice)
        // }
        // else{
        //     sum += el.quantity * el.productPrice
        // }
    })
    return sum
}

module.exports = updateBasketPrice