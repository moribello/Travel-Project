//Enable environment variables using dotenv
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const http = require("https")
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let latLong = {};

// Require express to run server and routes
const express = require('express') //include Express installation
const app = express() //create new instance of app
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist')) //set up distribution folder

console.log(__dirname)

app.get('/', function (req, res) {

    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8084, function () {
    console.log('Example app listening on port 8084!')
})

let geoname = {};
app.post('/getGeoName', async function (req, res) {
    let userLoc = req.body.text;
    geoname.username = process.env.geonames_username;
    let geonamesURL =
    `http://api.geonames.org/geocodeJSON?q=${userLoc}&username=${geoname.username}`
    let response = await fetch(geonamesURL);
    let data = await response.json();
    latLong.lat = data.geoCoderResult.lat;
    latLong.long = data.geoCoderResult.lng;
    console.log(latLong);

    // projectData.model = data.model; //new
    // projectData.polarity = data.score_tag;
    // projectData.confidence = data.confidence;
    // projectData.subjectivity = data.subjectivity;
    // projectData.agreement = data.agreement;
    // projectData.irony = data.irony;
    // res.send(projectData);
    // console.log(projectData);
});
