require('dotenv').config()
const express = require("express");
const expressLayout = require("express-ejs-layouts")

const app = express();
const port = 5000;


//for storing css js image files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


//connecting the database
const connectdb = require('./server/config/db')

connectdb();



app.use('/', require('./server/routes/main_routes.js'))


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})