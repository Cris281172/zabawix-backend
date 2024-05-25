const RelateService = require('../services/RelateService')
module.exports = {
	createRelate: async (req, res) => {
		try{
			const {relateName} = req.body;
			if(!relateName){
				res.status(404).send('Relate name is required');
			}
			const relateNameData = await RelateService.createRelate(relateName)
			res.status(201).send(relateNameData)
		}
		catch (err){
			res.status(500).json({error: err})
		}
	},
	getRelates: async (req, res) => {
		try{
			const relates = await RelateService.getRelates()
			res.status(200).send(relates);
		}
		catch(err){
			res.status(500).json({error: err})
		}
	}
}