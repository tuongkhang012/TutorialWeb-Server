//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config()
const schoolRouter = require("./routes/schoolRoute.js");
const studentRouter = require("./routes/studentRoute.js");
const equipmentRouter = require("./routes/equipmentRoute.js");
const userRouter = require("./routes/userRoute.js");

const app = express();
const PORT = process.env.PORT || 8081
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(logger('dev'))
//for using static files
app.use(express.static('public'));

//set up Routes
app.use('/api', schoolRouter)
app.use('/api', studentRouter)
app.use('/api', equipmentRouter)
app.use('/api', userRouter)

//connect to database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => console.log('Connected to database'))
 .catch(error => console.error('Connection error: ', error))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})