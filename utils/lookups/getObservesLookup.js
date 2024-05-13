const getObservesLookup = () => {
	return {from: 'observes', localField: '_id', foreignField: 'productID', as: 'observe'}
}

module.exports = getObservesLookup