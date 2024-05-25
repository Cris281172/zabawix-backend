const filterNullValues = (obj) => {
	const filteredObj = {};
	Object.keys(obj).forEach(key => {
		if (obj[key] !== null && obj[key] !== undefined) {
			if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				const nestedObj = filterNullValues(obj[key]);
				if (Object.keys(nestedObj).length > 0) {
					filteredObj[key] = nestedObj;
				}
			} else {
				filteredObj[key] = obj[key];
			}
		}
	});
	return filteredObj;
};
module.exports = filterNullValues