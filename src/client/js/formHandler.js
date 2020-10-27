function handleSubmit(event) {
    event.preventDefault()

    // retrieve text entered into the form field
    let userLoc = document.getElementById('userLocText').value;
    let userDate = new Date(document.getElementById('userDateText').value);
    let todayDate = new Date();
    let shortDate = friendlyDate(todayDate);
    console.log(`User text date is ${userDate}.`)
    console.log(`Today's date is ${shortDate}`)
    let countdown = Math.round((userDate-todayDate)/(1000*60*60*24));
    // let countdown = userDate - shortDate;
    console.log(userDate - shortDate);
    alert(`You are going to ${userLoc} on ${userDate}, which is in ${countdown} days.`)

    function friendlyDate(dateObj) {
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = new Date(year + "/" + month + "/" + day + "/");
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
// //new section to have server request API data and return it
// fetch('http://localhost:8084/getAPIdata', {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({text: formText})
//     })
//     .then(res => res.json())
//     .then(function(res) {
//         console.log(res);
//         let agrees = ""
//         if (res.agreement == "AGREEMENT"){
//             agrees = "Yes"
//         } else {
//             agrees = "No"
//         };
//         document.getElementById('agree').innerHTML = agrees;
//         document.getElementById('conf').innerHTML = res.confidence;
//         document.getElementById('irony').innerHTML = res.irony;
            document.getElementById('dispCountdown').innerHTML = `<h1>You are leaving in ${countdown} days`;
//     })
//}//bracket to close if / else statement
}//bracket to close function
export { handleSubmit }
