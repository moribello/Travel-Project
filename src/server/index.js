//Enable environment variables using dotenv
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const http = require("https");


dotenv.config();



// Setup empty JS object to act as endpoint for all routes

let latLong = {}; //JS object for lat / long data
var weatherData = {} //JS object for weather data
let apiKeys = {}; //Empty JS object to hold all of the API keys

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


//function to convert from Celcius to Farenheit
function cToF(tempC) {
    let tempF = +((tempC * (9/5)) + 32).toFixed(0);
    return tempF;
}

app.post('/getGeoName', async function (req, res) {
    let userLoc = req.body.text;
    let countdown = req.body.days;
    let userDate = req.body.userDate;
    apiKeys.geoname = process.env.geonames_username; //get geonames username
    apiKeys.weatherbit = process.env.weatherbit_key; // get weatherbit api key
    apiKeys.pixabay = process.env.pixabay_key; //get Pixabay key

    let geonamesURL =
    `http://api.geonames.org/searchJSON?q=${userLoc}&maxRows=1&username=${apiKeys.geoname}` //create full URL for geonames query
    console.log(geonamesURL);
    let response = await fetch(geonamesURL);
    let data = await response.json();
    latLong.lat = data.geonames[0].lat;
    latLong.long = data.geonames[0].lng;
    weatherData.city = data.geonames[0].name;
    weatherData.state = data.geonames[0].adminName1;
    weatherData.countryCode = data.geonames[0].countryCode;

    //run function to get weather data based on lat and long
    if (countdown <= 14){
        console.log("Less than 2 weeks to go!")
        await getWeatherData();
    } else {
        console.log(`Searching for historical weather data for ${userDate}`);
        await getHistWeatherData(userDate);
    }

    await getPixabay(userLoc);

    res.send(weatherData);


});
// Get weather data function
var getWeatherData = async function () {
    let weatherbitURL = `http://api.weatherbit.io/v2.0/forecast/daily?&lat=${latLong.lat}&lon=${latLong.long}&key=${apiKeys.weatherbit}`;
    let weatherDataLoc = {}
    let weatherResp = await fetch(weatherbitURL);
    let weathDataTemp = await weatherResp.json();
    weatherData.tempF = cToF(weathDataTemp.data[0].temp);
    weatherData.high = cToF(weathDataTemp.data[0].max_temp)
    weatherData.low = cToF(weathDataTemp.data[0].min_temp)
    weatherData.feelsLike = (cToF(weathDataTemp.data[0].app_max_temp) + cToF(weathDataTemp.data[0].app_min_temp)) / 2;
    weatherData.icon = `https://www.weatherbit.io/static/img/icons/${weathDataTemp.data[0].weather.icon}.png`;
    weatherData.desc = weathDataTemp.data[0].weather.description;
};

var getHistWeatherData = async function (userDate) {
    let histWeatherLoc = {}; //local javascript object to hold data
    const month = userDate.substring(5,7);//month is kept as a string because we don't need to do anything to it
    const date = parseInt(userDate.substring(8,10));//get int value for day of month
    const datePlusOne = date + 1; //add one to the user date to get the end point
    const shortDate = userDate.substring(5,10);
    const sdPlusOne = month + "-" + datePlusOne;
    const weatherbitURL = `https://api.weatherbit.io/v2.0/normals?lat=${latLong.lat}&lon=${latLong.long}&start_day=${shortDate}&end_day=${sdPlusOne}&tz=local&key=${apiKeys.weatherbit}`;
    let weatherResp = await fetch(weatherbitURL);
    let weathDataTemp = await weatherResp.json();
    weatherData.tempF = cToF(weathDataTemp.data[0].temp);
    weatherData.min_temp = cToF(weathDataTemp.data[0].min_temp);
    weatherData.max_temp = cToF(weathDataTemp.data[0].min_temp);
    weatherData.precip = weathDataTemp.data[0].precip;
}

// Get image from pixabay_key
var getPixabay = async function (travLocation) {
    let pixabayURL = `https://pixabay.com/api/?key=${apiKeys.pixabay}&q=${travLocation}&image_type=photo`
    // console.log(pixabayURL);
    let pixabayResp = await fetch(pixabayURL);
    let pixabayTemp = await pixabayResp.json();
    weatherData.photo = pixabayTemp.hits[0].webformatURL;
}
