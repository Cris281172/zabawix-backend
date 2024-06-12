const fs = require('fs');
const stream = require('stream');
const csvParser = require('csv-parser');
module.exports = {
	importCSV: async (req, res) => {
		try{
			const bufferStream = new stream.PassThrough();
			bufferStream.end(req.file.buffer);

			const results = [];

			bufferStream
				.pipe(csvParser())
				.on('data', (data) => results.push(data))
				.on('end', async () => {
					// Save data to MongoDB
					console.log(results)
					res.send('Import successful');
				});
		}
		catch(err){
			res.status(500).json({error: err})
		}
	}
}