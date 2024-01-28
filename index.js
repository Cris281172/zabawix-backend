const express = require('express');
const mongoose = require('mongoose');
const uploadFile = require('./utils/uploadFile')
const saveVisit = require('./middleware/saveVisitMiddleware');
const app = express()
// uploadFile('test.png', 'test.png').catch(console.error);
const mainRoutes = require('./routes/main');
const bodyParser = require('body-parser');
const https = require("https");
const cors = require('cors')({origin: true})
require('dotenv').config()
app.use(cors);
app.use(bodyParser.json())
app.use(async (req, res, next) => {
    const ip = req.ip;
    if (req.method === 'GET'  && !req.path.includes('favicon.ico') && !req.path.match(/\.(js|css|png|jpg|jpeg|svg|webp)$/)) {
        await saveVisit(ip);
    }
    next();
});
app.use('/', mainRoutes)



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