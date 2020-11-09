function validateDate(userDate) {
    const today = new Date();
    today.setHours(0,0,0,0); //sets hours for "today" to be 0s so only the date is compared.
    if (userDate < today){
        return false;
    } else {
        return true;
    };

}

export { validateDate }
