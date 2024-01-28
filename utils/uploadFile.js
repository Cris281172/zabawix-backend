const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: 'white-proxy-409418-22b00de7111e.json'
});
const bucketName = 'zabawix-image';
const Image = require('../models/Image')

module.exports = class ImageUploadService {
    static async uploadImage(file) {
        // Generowanie nowej nazwy pliku
        const filenameArray = file.originalname.split('.');
        const ext = filenameArray.pop();
        const filename = new Date().getTime() + '_' + filenameArray.join('.') + '.' + ext;
        const destination = `uploads/${filename}`;

        // Przesyłanie pliku do Google Cloud Storage
        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(destination);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });
        await new Promise((resolve, reject) => {
            blobStream.on('error', err => {
                console.error('Wystąpił błąd podczas przesyłania pliku:', err);
                reject(err);
            });
            blobStream.on('finish', () => {
                console.log('Przesyłanie zakończone pomyślnie');
                resolve();
            });
            blobStream.end(file.buffer);
        });
        return {
            name: filename,
            originalName: file.originalname,
            url: `https://storage.googleapis.com/${bucketName}/${destination}` // URL do pliku
        };
    }

    static async saveImage(imageData) {
        // Zapisywanie danych obrazu w bazie danych

        await new Image(imageData).save();
    }
};