const getCategoriesLookup = () => {
	return {from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category'}
}

module.exports = getCategoriesLookup