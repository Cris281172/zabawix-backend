const User = require('../models/User')
const getUserData = async (id) => {
    const userData = await User.findOne({
        _id: {
            $eq: id
        }
    })
    if(!userData){
        return undefined
    }
    return userData
}

module.exports = getUserData