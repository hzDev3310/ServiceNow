const verifyInputs = (inputs) => {
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        if (input == "") {
            return false
        }
    }
    return true

}

const VerifyPassword = (password) => {
    if (password.length >= 6 || password === "")
        return true;
    else
        return false;
};


const verifyPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 0) return true
    const regex = /^[245379]\d{7}$/;
    return regex.test(phoneNumber);
};


const isServiceAvailableToday = (isAvailable, days) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDayName = daysOfWeek[currentDayIndex];
    if (isAvailable) {
        return true;
    } else return days[currentDayName]
};

function isEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email=== "" ) return true
    else return pattern.test(email);
}

function verifyName(name) {
    if (name === "") {
        return true; 
    } else {

        return name.length >= 3 && /^[a-zA-Z]+$/.test(name);
    }
}



export { VerifyPassword, verifyPhoneNumber, verifyName,verifyInputs, isServiceAvailableToday , isEmail };