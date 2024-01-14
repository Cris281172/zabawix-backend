const Offer = require('../models/Offer')
const User = require('../models/User')
const OfferService = require("../services/OfferService");
const ImageUploadService = require("../utils/uploadFile");
const Visit = require('../models/Visit')

module.exports = {
    getStatisticsNumber: async (req, res) => {
        try{
            const offersCount = await Offer.countDocuments()
            const usersCount = await User.countDocuments()
            const userVisitCount = await Visit.countDocuments()
            const statisticsData = {
                offersCount: offersCount,
                usersCount: usersCount + 50,
                userVisitCount: userVisitCount + 500,
                transactionsCount: 120
            }
            res.status(201).send(statisticsData)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
}