const OfferService = require('../services/OfferService');
const ImageUploadService = require('../utils/uploadFile');
const User = require('../models/User')
const Offer = require('../models/Offer')
module.exports = {
    createOffer: async (req, res) => {
        try{
            const createdOffer = await OfferService.createOffer(req.body)

            if(req.files){
                for(const prop in req.files){
                    const uploadResult = await ImageUploadService.uploadImage(req.files[prop])
                    await ImageUploadService.saveImage({
                        name: uploadResult.name,
                        originalName: uploadResult.originalName,
                        offerID: createdOffer._id
                    });
                }
            }


            res.status(200).send(createdOffer)
        }
        catch(err){
            res.status(500).json({error: err});
        }
    },
    getOffers: async (req, res) => {
        try{
            const query = req.query;
            const token = req.headers.authorization;
            const user = await User.findOne({
                token: {
                    $eq: token
                }
            })
            const offers = await OfferService.getOffers(query, user)
            res.status(200).send(offers)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getOffer: async (req, res) => {
        try{
            const token = req.headers.authorization;
            const user = await User.findOne({
                token: {
                    $eq: token
                }
            })
            const offer = await OfferService.getOffer(req.params.id, user)

            if(offer === null){
                return res.status(404).send('Offer not found')
            }
            res.status(200).send(offer)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    basketOffer: async (offerID) => {
        return await OfferService.basketOffer(offerID)
    },
    getOfferImages: async (req, res) => {
        try{
            const {offerID} = req.body;
            const images = await OfferService.getOfferImages(offerID)
            res.status(200).send(images);
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    deleteOffer: async (req, res) => {
        try{
            const {offerID} = req.body;
            const offerExist = await Offer.findOne({
                _id: {
                    $eq: offerID
                }
            })

            if(!offerExist){
                return res.status(404).send('Offer not found')
            }

            const deletedOffer = await OfferService.deleteOffer(offerID)
            res.status(201).send(deletedOffer)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    }
}