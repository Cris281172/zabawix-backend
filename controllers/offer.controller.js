const OfferService = require('../services/OfferService');
const ImageUploadService = require('../utils/uploadFile');
const User = require('../models/User')
const Offer = require('../models/Offer')
const filterNullValues = require('../utils/filterNullValues')
module.exports = {
    createOffer: async (req, res) => {
        try {
            const { title, desc, categoryID, price, createdTime, amount, relateID, ...parameterFields } = req.body;

            const parameter = {
                ean: parameterFields['parameter.ean'],
                age: parameterFields['parameter.age'],
                sex: parameterFields['parameter.sex'],
                weight: parameterFields['parameter.weight'],
                brand: parameterFields['parameter.brand'],
                packageSize: {
                    length: parameterFields['parameter.packageSize.length'],
                    width: parameterFields['parameter.packageSize.width'],
                    height: parameterFields['parameter.packageSize.height']
                },
                productSize: {
                    length: parameterFields['parameter.productSize.length'],
                    width: parameterFields['parameter.productSize.width'],
                    height: parameterFields['parameter.productSize.height']
                }
            };

            const filteredParameter = filterNullValues(parameter);

            const offerData = { title, desc, categoryID, price, createdTime, amount, parameter: filteredParameter };

            const filteredOfferData = filterNullValues(offerData);

            const createdOffer = await OfferService.createOffer(filteredOfferData);

            if(!createdOffer){
                res.status(500).send('Error with adding offer')
            }

            if (req.files) {
                for (const file of req.files) {
                    const uploadResult = await ImageUploadService.uploadImage(file);
                    await ImageUploadService.saveImage({
                        name: uploadResult.name,
                        originalName: uploadResult.originalName,
                        offerID: createdOffer._id
                    });
                }
            }

            res.status(200).send(createdOffer);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
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