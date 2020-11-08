function validateLoc(inputText) {
    //create object for values
    let validateValues = {}
    //checks for empty string
    if (inputText==""){
        validateValues.location = false
    } else {
        validateValues.location = true
    }
    console.log(validateValues.location);
    return validateValues;
}
export { validateLoc }
