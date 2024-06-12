require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: process.env.GOOGLE_STORAGE_KEY_NAME
});
const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;

const deleteFileFromStorage = async (fileName) => {
	await storage.bucket(bucketName).file(`uploads/${fileName}`).delete();
}
module.exports = deleteFileFromStorage;