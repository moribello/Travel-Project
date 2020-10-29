//Enable environment variables using dotenv
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const http = require("https")
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let latLong = {}; //JS object for lat / long data
let weatherData = {} //JS object for weather data


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

let apiKeys = {};

app.post('/getGeoName', async function (req, res) {
    let userLoc = req.body.text;
    apiKeys.geoname = process.env.geonames_username; //get geonames username
    apiKeys.weatherbit = process.env.weatherbit_key; // get weatherbit api key
    let geonamesURL =
    `http://api.geonames.org/geocodeJSON?q=${userLoc}&username=${apiKeys.geoname}` //create full URL for geonames query
    let response = await fetch(geonamesURL);
    let data = await response.json();
    latLong.lat = data.geoCoderResult.lat;
    latLong.long = data.geoCoderResult.lng;
    console.log(latLong);
    let weatherbitURL = `http://api.weatherbit.io/v2.0/current?&lat=${latLong.lat}&lon=${latLong.long}&key=${apiKeys.weatherbit}`;
    getWeatherData(weatherbitURL);
    });

// Get weather data
var getWeatherData = async function (weatherbitURL) {
    let weatherResp = await fetch(weatherbitURL);
    let weathDataTemp = await weatherResp.json();
    console.log(weathDataTemp);
    weatherData.temp = weathDataTemp.data.temp;
    weatherData.feelsLike = weathDataTemp.data.app_temp;
    console.log(weatherData);
    }
