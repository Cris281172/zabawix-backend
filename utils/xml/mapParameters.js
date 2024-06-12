const mapParameters = (parameters) => {
	const mappedParameters = {
		ean: null,
		age: null,
		sex: null,
		weight: null,
		packageSize: {
			length: null,
			width: null,
			height: null
		},
		productSize: {
			length: null,
			width: null,
			height: null
		},
		brand: null
	};

	const sexConfig = {

	}

	parameters.forEach(param => {
		const id = param.$.id;
		const value = param.value && param.value[0] ? param.value[0] : null;

		if (value !== null) {
			switch (id) {
				case '1403':
					mappedParameters.productSize.length = value.$.name;
					break;
				case '1405':
					mappedParameters.productSize.height = value.$.name;
					break;
				case '1407':
					mappedParameters.productSize.width = value.$.name;
					break;
				case '1409':
					mappedParameters.weight = Number(value.$.name) / 1000;
					break;
				case '1419':
					mappedParameters.age = Number(value.$.name.substring(0, value.$.name.length - 1));
					break;
				case '1429':
					if(value.$.name === 'Chłopiec'){
						mappedParameters.sex = 'male';
					}
					break;
				default:
					break;
			}
		}
	});

	return mappedParameters;
}

module.exports = mapParameters