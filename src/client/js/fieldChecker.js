function validateLoc(location, userDate) {
    console.log(`Received ${userDate}`)
    //create object for values
    let validateValues = {}
    //checks for empty string in location
    if (location == ""){
        validateValues.location = false
    } else {
        validateValues.location = true
    };

    return validateValues;
}

export { validateLoc }
