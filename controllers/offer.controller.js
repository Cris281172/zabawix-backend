const OfferService = require('../services/OfferService');
const ImageUploadService = require('../utils/uploadFile');
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
            const offers = await OfferService.getOffers(query)
            res.status(200).send(offers)
        }
        catch(err){
            res.status(500).json({error: err})
        }
    },
    getOffer: async (req, res) => {
        try{
            const offer = await OfferService.getOffer(req.params.id)
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
    }
}