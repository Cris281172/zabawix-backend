const customAggregate = require("../customAggregate");
const Image = require("../../models/Image");
const deleteFileFromStorage = require('./deleteFileFromStorage')
const ObjectId = require('mongoose').Types.ObjectId;
const deleteFilesFromStorage = async (offerID) => {
	const offerImages = await customAggregate(Image, {
		match: {offerID: ObjectId(offerID)},
		project: {
			fields: ['name']
		}
	})
	for(let i = 0; i < offerImages.length; i++){
		await deleteFileFromStorage(offerImages[i].name)
	}
}
module.exports = deleteFilesFromStorage;