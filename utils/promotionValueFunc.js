const promotionValueFunc = (normalPrice, promotionPrice) => {
     return 100 - ((promotionPrice * 100) / normalPrice)
}
module.exports  = promotionValueFunc
