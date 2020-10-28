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
        body: JSON.stringify({text: userLoc})
    })
    .then(res => res.json())
    // .then(function(res) {
    //     console.log(res);
    //     };
//         document.getElementById('agree').innerHTML = agrees;
//         document.getElementById('conf').innerHTML = res.confidence;
//         document.getElementById('irony').innerHTML = res.irony;
            document.getElementById('dispLoc').innerHTML = `<h1>${userLoc}</h1>`;
            document.getElementById('dispCountdown').innerHTML = `<h1>You are leaving in ${countdown} days</h1>`;
            document.getElementById('dispDate').innerHTML = `<h1>${friendlyDate(userDate)}</h1>`;

//     })
//}//bracket to close if / else statement
}//bracket to close function
export { handleSubmit }
