const Visit = require('../models/Visit');

const saveVisitMiddleware = async (ip) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const existingVisit = await Visit.findOne({
        ip: ip,
        date: { $gt: new Date(Date.now() - 24*60*60*1000) }
    });
    if (existingVisit === null) {
        const newVisit = new Visit({ ip, date: new Date() }); // Ustawia obecną datę i godzinę dla nowej wizyty
        await newVisit.save();
    }
};

module.exports = saveVisitMiddleware;