function handleSubmit(event) {
    event.preventDefault()

    // retrieve text entered into the form field
    let userLoc = document.getElementById('userLocText').value;
    let userDate = new Date(document.getElementById('userDateText').value);
    let todayDate = new Date();
    let shortDate = friendlyDate(userDate);

    let countdown = Math.round((userDate-todayDate)/(1000*60*60*24));

    function friendlyDate(dateObj) {
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate =  month + "/" + day + "/" + year;
        return newdate;
    }


    //validate input text
//     Client.validateText(formText)
//
//     //Checks for returned value
//     if (Client.validateText(formText) !== true){
//         alert("Please enter text in the text field")
//     } else {
//
// Send user location to server
fetch('http://localhost:8084/getGeoName', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: userLoc, days: countdown, userDate: userDate})
    })
    .then(res => res.json())
    .then(function(res) {
        // console.log(res);
    document.getElementById('dispLoc').innerHTML = `<h1>${userLoc}</h1>`;
    document.getElementById('dispCountdown').innerHTML = `<h1>You are leaving in ${countdown} days</h1>`;
    document.getElementById('dispDate').innerHTML = `<h1>${friendlyDate(userDate)}</h1>`;

    if (countdown <= 14) {
        console.log(`Predicted Weather: Temp: ${res.tempF}, high: ${res.high}, icon: ${res.icon}, photo: ${res.photo}`);
        document.getElementById('weatherHeader').innerHTML = "<h1>Predicted Weather:</h1>";
        document.getElementById('dispWeath').innerHTML = `<div class="weatherIcon"><img src=${res.icon} alt="Weather Icon"></div>
        <br>
        <div class="weatherData">
        <em>Temperature: </em>${res.tempF}<br>
        <em>Feels like: </em>${res.feelsLike}<br>
        <em>Weather: </em>${res.desc}<br>
        <em>High: </em>${res.high}<br>
        <em>Low: </em>${res.low}
        </div>
        `;
        document.getElementById('photo').innerHTML = `<img src=${res.photo}>`;
        // set up string for projected weather
        // fields: .tempF, .high, .low, .feelslike, .icon, .desc, .photo
    } else {
        console.log(`Predicted Weather: Temp: ${res.tempF}, high: ${res.max_temp}, low: ${res.min_temp}, photo: ${res.photo}`);
        //set up string for historical weather.
        //fields: .tempF, .min_temp, .max_temp, .precip, .photo
    }
});
//     })
//}//bracket to close if / else statement
}//bracket to close function
export { handleSubmit }
