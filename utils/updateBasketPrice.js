const updateBasketPrice = (userBasket) => {
    let sum = 0
    userBasket.basket.forEach(el => {
        sum += el.quantity * (el.promotionPrice ? el.promotionPrice : el.productPrice)
    })
    return sum
}

module.exports = updateBasketPrice