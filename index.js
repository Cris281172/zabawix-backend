const express = require('express');
const mongoose = require('mongoose');
require('./cron');
mongoose.set('strictQuery', true);
const uploadFile = require('./utils/uploadFile')
const saveVisit = require('./middleware/saveVisitMiddleware');
const app = express()
// uploadFile('test.png', 'test.png').catch(console.error);
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser');
const https = require("https");
const cors = require('cors')
app.use(cors({
    origin: 'https://zabawix.com'
}))
require('dotenv').config()
app.use(bodyParser.json({
    limit: '100mb'
}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use('/', mainRoutes)
app.use('/', adminRoutes)

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to DB');
})
    .catch(err => {
        console.log(err)
    })

// https.createServer({}, app)
//     .listen(8443, () => {
//         console.log('Server listen on 8080 port')
//     })

app.listen(8080, () => console.log(`Server listening on ${process.env.PORT} port`))