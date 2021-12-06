
const express = require('express')
var request =require('request')
const app = express()
require('dotenv').config()

//const db = require('./config/dbconfig.js')

var bodyParser = require('body-parser')
const port = 5000
var cors = require('cors')
app.use(cors())
 
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


var instructorroutes1 = require('./routes/instructorroutes');
var teacherroutes1 = require('./routes/teacherroutes');
app.use(instructorroutes1);
app.use(teacherroutes1);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})