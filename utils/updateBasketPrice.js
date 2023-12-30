const updateBasketPrice = (userBasket) => {
    let sum = 0
    userBasket.basket.forEach(el => {
        sum += el.quantity * el.productPrice
    })
    return sum
}

module.exports = updateBasketPrice