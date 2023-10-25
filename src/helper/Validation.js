const isEmailValid = (email)=> {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(email).toLowerCase(),
    );
};

const isPasswordValid = (password) => {
    // between 8 to 30 characters which contain at least:
    // one lowercase letter
    // one uppercase letter
    // one numeric digit
    // one special character
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,30}$/.test(String(password));
};

const isPhoneNumberValid = (phoneNumber) => {
    if (!phoneNumber) return false;
    const noGlobalCode = phoneNumber?.replace('+1', '');
    // leave only numeric characters
    if (!String(noGlobalCode).match(/^[0-9()-\s]*$/)) return false;
    const short = noGlobalCode.replace(/\D+/g, '');
    return short.length === 10;
};

const valuesEqual = (value1, value2) => {
    return String(value1).toLowerCase(), String(value2).toLowerCase()
};

const validZip = (zip) => {
    if (!String(zip).match(/^[0-9]*$/)) return false;
    return zip.length === 5;
};

const isNotEmpty = (value) => {
    if (!value) return false;
    return !!value.trim();
};

const atLeastOneLetter = (value) => {
    if (!value) return false;
    if (String(value).match(/^(?=.*[a-zA-Z]).{1,}$/)) return true;
};

const isTrue = (value) => {
    return value === true;
};

const isNumber = (value) => {
    if (!value) return false;
    return !isNaN(value);
};

const isYear = (value) => {
    if (!value) return false;
    return !isNaN(value) && value.length === 4;
};

export {
    isEmailValid,
    isPasswordValid,
    isPhoneNumberValid,
    valuesEqual,
    validZip,
    isNotEmpty,
    atLeastOneLetter,
    isTrue,
    isNumber,
    isYear,
};