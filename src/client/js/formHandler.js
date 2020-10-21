function handleSubmit(event) {
    event.preventDefault()

    // retrieve text entered into the form field
    let formText = document.getElementById('userText').value

    //validate input text
    Client.validateText(formText)

    //Checks for returned value
    if (Client.validateText(formText) !== true){
        alert("Please enter text in the text field")
    } else {

//new section to have server request API data and return it
fetch('http://localhost:8084/getAPIdata', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: formText})
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        let agrees = ""
        if (res.agreement == "AGREEMENT"){
            agrees = "Yes"
        } else {
            agrees = "No"
        };
        document.getElementById('agree').innerHTML = agrees;
        document.getElementById('conf').innerHTML = res.confidence;
        document.getElementById('irony').innerHTML = res.irony;
    })
}//bracket to close if / else statement
}//bracket to close function
export { handleSubmit }
