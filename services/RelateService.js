const Relate = require('../models/Relate')
module.exports = {
	createRelate: async (relateName) => {
		try{
			return await new Relate({relateName: relateName}).save()
		}
		catch(err){
			console.log(err)
		}
	},
	getRelates: async () => {
		try{
			return await Relate.find({});
		}
		catch(err){
			console.log(err);
		}
	}
}