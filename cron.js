const cron = require('node-cron');
const removingObsoletePromotions = require('./crons/removingObsoletePromotions');
const removingInvalidAccount = require('./crons/removingInvalidAccount');
const updateXMLStorage = require('./crons/updateXMLStorage');
cron.schedule('0 0 * * *', async() => {
	await removingObsoletePromotions()
	await removingInvalidAccount()
	await updateXMLStorage()
});