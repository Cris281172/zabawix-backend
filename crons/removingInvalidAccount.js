const User = require('../models/User')
const removingInvalidAccount = async () => {
	const time = new Date();
	time.setDate(time.getDate() - 30);
	try{
		await User.deleteMany({
			emailVerifiedAt: {$eq: null},
			createdAt: {$lt: time}
		})
	}
	catch(err){
		console.log(err);
	}
}

module.exports = removingInvalidAccount;