const express = require('express');
const mongoose = require('mongoose');
const uploadFile = require('./utils/uploadFile');
const saveVisit = require('./middleware/saveVisitMiddleware');
const app = express();
// uploadFile('test.png', 'test.png').catch(console.error);
const mainRoutes = require('./routes/main');
const bodyParser = require('body-parser');
const https = require("https");
require('dotenv').config();

// Definiowanie własnych nagłówków CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // Zmień '*' na konkretną domenę, jeśli potrzebujesz większego bezpieczeństwa
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.json());
app.use('/', mainRoutes);

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.log(err);
});

app.listen(process.env.PORT || 8080, () => console.log(`Server listening on ${process.env.PORT || 8080} port`));