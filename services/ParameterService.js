const Parameter = require('../models/Parameter')
module.exports = {
	createParameter: async (data) => {
		try{
			return await new Parameter(data).save()
		}
		catch(err){
			console.log(err)
		}
	}
}