const verifyInputs = (inputs) => {
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        if (input=="") {
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


export { VerifyPassword, verifyPhoneNumber, verifyInputs };