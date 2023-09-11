//import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { set } from 'mongoose';
import logger from 'morgan';
import 'dotenv/config'
import schoolRouter from "./routes/schoolRoute.js";
import studentRouter from "./routes/studentRoute.js";
import equipmentRouter from "./routes/equipmentRoute.js";

const app = express();
const PORT = process.env.PORT || 6969;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('dev'))
app.set('views', './views')
app.set('view engine', 'ejs')
//for using static files
app.use(express.static('public'));

//set up Routes
app.use('/api', schoolRouter)
app.use('/api', studentRouter)
app.use('/api', equipmentRouter)

//index page
app.get('/', (req, res) => {
    res.render('pages/index')
})

//about page
app.get('/about', (req, res) => {
    res.render('pages/about')
})

//random page
app.get('/test', (req, res) => {
    res.render('pages/test')
})

//connect to database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => console.log('Connected to database'))
 .catch(error => console.error('Connection error: ', error))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})