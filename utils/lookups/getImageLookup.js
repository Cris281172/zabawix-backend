const getImageLookup = () => {
	return {from: 'images', localField: '_id', foreignField: 'offerID', as: 'images'}
}

module.exports = getImageLookup;