const ParameterService = require('../services/ParameterService')
module.exports = {
	createParameter: async (req, res) => {
		try{
			const data = req.body;
			const parameter = await ParameterService.createParameter(data)
			if(!parameter){
				return res.status(400).send('Error')
			}
			return res.status(201).send(parameter)
		}
		catch(err){
			res.status(500).json({error: err})
		}
	}
}