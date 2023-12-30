const express = require('express');
const mongoose = require('mongoose');
const uploadFile = require('./utils/uploadFile')
const app = express()
// uploadFile('test.png', 'test.png').catch(console.error);
const mainRoutes = require('./routes/main');
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true})
require('dotenv').config()
app.use(cors);
app.use(bodyParser.json())
app.use('/', mainRoutes)

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to DB');
})
    .catch(err => {
        console.log(err)
    })

app.listen(8080, () => console.log(`Server listening on ${process.env.PORT} port`))