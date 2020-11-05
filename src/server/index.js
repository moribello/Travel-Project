//Enable environment variables using dotenv
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const http = require("https");
const getCountryName = require('./countryCodes.js');

dotenv.config();

// import { isoCountries } from './countryCodes.js';

// Setup empty JS object to act as endpoint for all routes
// let projectData = {};
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
    apiKeys.pixabay = process.env.pixabay_key; //get Pixabay key

    let geonamesURL =
    `http://api.geonames.org/geocodeJSON?q=${userLoc}&username=${apiKeys.geoname}` //create full URL for geonames query
    let response = await fetch(geonamesURL);
    let data = await response.json();
    latLong.lat = data.geoCoderResult.lat;
    latLong.long = data.geoCoderResult.lng;
    latLong.countryCode = data.geoCoderResult.countryCode;
    latLong.state = data.geoCoderResult.adminName1;
    let weatherbitURL = `http://api.weatherbit.io/v2.0/current?&lat=${latLong.lat}&lon=${latLong.long}&key=${apiKeys.weatherbit}`;
    let weatherData = getWeatherData(weatherbitURL);//run function to get weather data based on lat and long
    console.log(weatherData);
    getPixabay(userLoc);//run function to get pixabay data
    // res.send(weatherData);

    //get location from weather data
    // if (latLong.state != ""){
    //     travLocation = latLong.state;
    // } else {
    //     cCode = latLong.countryCode;
    //     let travLocation = getCountryName(latLong.countryCode);
    // };

});
// Get weather data function
var getWeatherData = async function (weatherbitURL) {
    //you will need to create an array and return it, then write it to the javascript object.
    let weatherDataLoc = {}
    let weatherResp = await fetch(weatherbitURL);
    let weathDataTemp = await weatherResp.json();
    tempC = weathDataTemp.data[0].temp;
    feelsLike = weathDataTemp.data[0].app_temp;
    desc = weathDataTemp.data[0].weather.description;
    return [tempC, feelsLike, desc];
};

// Get image from pixabay_key
var getPixabay = async function (travLocation) {
    let pixabayURL = `https://pixabay.com/api/?key=${apiKeys.pixabay}&q=${travLocation}&image_type=photo`
    console.log(pixabayURL);
    let pixabayResp = await fetch(pixabayURL);
    let pixabayTemp = await pixabayResp.json();
    weatherData.photo = pixabayTemp.hits[0].webformatURL;
}
