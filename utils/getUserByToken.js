const User = require('../models/User')
const getUserByToken = async (token) => {
	try{
		const user = await User.findOne({
			token: {
				$eq: token
			}
		})
		if(user){
			return user
		}
		return undefined
	}
	catch(err){
		console.log(err)
	}
}

module.exports = getUserByToken