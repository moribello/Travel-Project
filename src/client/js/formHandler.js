function handleSubmit(event) {
    event.preventDefault()

    // retrieve text entered into the form field
    console.log("Retrieving user data...");
    let userLoc = document.getElementById('userLocText').value;
    let userDate = new Date(document.getElementById('userDateText').value);
    let todayDate = new Date();
    let shortDate = friendlyDate(userDate);

    let countdown = Math.round((userDate - todayDate) / (1000 * 60 * 60 * 24));

    function friendlyDate(dateObj) {
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = month + "/" + day + "/" + year;
        return newdate;
    }


    //validate input text
    console.log("Checking user input...")
    validation = Client.validateLoc(userLoc)

    // Checks for returned value
    if (validation.location !== true) {
        alert("Please enter a city in the \'destination city\' field")
    } else {
        //
        // Send user location to server
        fetch('http://localhost:8084/getGeoName', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: userLoc,
                    days: countdown,
                    userDate: userDate
                })
            })
            .then(res => res.json())
            .then(function(res) {
                document.getElementById('dispLoc').innerHTML = `<h1>${userLoc}</h1>`;
                document.getElementById('dispCountdown').innerHTML = `<h1>You are leaving in ${countdown} days</h1>`;
                document.getElementById('dispDate').innerHTML = `<h1>${friendlyDate(userDate)}</h1>`;

                if (countdown <= 14) {
                    document.getElementById('weatherHeader').innerHTML = "<h1>Predicted Weather:</h1>";
                    document.getElementById('dispWeath').innerHTML = `<div class="weatherIcon"><img src=${res.icon} alt="Weather Icon"></div>
                    <br>
                    <div class="weatherData">
                    <em>Temperature: </em>${res.tempF}&deg; F<br>
                    <em>Feels like: </em>${res.feelsLike}&deg; F<br>
                    <em>Weather: </em>${res.desc}<br>
                    <em>High: </em>${res.high}&deg; F<br>
                    <em>Low: </em>${res.low}&deg; F
                    </div>
                    `;
        document.getElementById('photo').innerHTML = `<img src=${res.photo}>`;
                } else {
                    document.getElementById('weatherHeader').innerHTML = "<h1>Historic Weather Data:</h1>";
                    document.getElementById('dispWeath').innerHTML =
                        `<div class="weatherData">
        <em>Temperature: </em>${res.tempF}&deg; F<br>
        <em>High: </em>${res.max_temp}&deg; F<br>
        <em>Low: </em>${res.min_temp}&deg; F<br>
        <em>Average precipitation: </em>${res.precip} inches
        </div>
        `;
        document.getElementById('photo').innerHTML = `<img src=${res.photo}>`;
                }
            });
        //     })
        }//bracket to close if / else statement
    } //bracket to close function

export {
        handleSubmit
    }
