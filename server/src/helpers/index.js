/**
 * Current Date Time
 */
export const getNow = () => {
    let dateTime = new Date(Date.now())
    return dateTime.toISOString()
}


export const sendErrorResponse = (res, message, err_code = 422) => {
    return res.status(err_code).send([message]);
}


export const generateJoiError = errors => {
    let newError = {}
    errors.forEach(err => {
        switch (err.code) {
            case "any.required":
                addErrorMessage(newError, err.local.key, "Value is required");
                break;
            case "any.empty":
                addErrorMessage(newError, err.local.key, "Value cannot be empty");
                break;
            case "string.base":
                addErrorMessage(newError, err.local.key, "Value must be a string");
                break;
            case "string.email":
                addErrorMessage(newError, err.local.key, "Value must be a valid email");
                break;
            case "number.base":
                addErrorMessage(newError, err.local.key, "Value must be a number");
                break;
            case "phoneNumber.invalid":
                addErrorMessage(newError, err.local.key, "Value must be a valid phone number");
                break;
            case "date.format":
                addErrorMessage(newError, err.local.key, "Value must be a valid date");
                break;
            case "number.integer":
                addErrorMessage(newError, err.local.key, "Value cannot be a decimal number");
                break;
            case "number.positive":
                addErrorMessage(newError, err.local.key, "Value cannot be a negative number");
                break;
            case "string.alphanum":
                addErrorMessage(newError, err.local.key, "Value cannot contain any special characters");
                break;
            case "string.uri":
                addErrorMessage(newError, err.local.key, "Value must be a valid web address");
                break;
            case "string.max":
                addErrorMessage(newError, err.local.key, `Value cannot contain more than ${err.local.limit} characters`);
                break;
            case "date.min":
                addErrorMessage(newError, err.local.key, `Date must be after ${err.local.limit.toDateString()}`);
                break;
            case "date.max":
                addErrorMessage(newError, err.local.key, `Date must be before ${err.local.limit.toDateString()}`);
                break;
            case "number.min":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
            case "number.max":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
            case "string.empty":
                addErrorMessage(newError, err.local.key, "Value cannot be empty");
                break;
            case "date.base":
                addErrorMessage(newError, err.local.key, "Invalid date");
                break;
            case "any.only":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
            case "number.unsafe":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
            case "string.length":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
            case "string.pattern.base":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
            case "any.invalid":
                addErrorMessage(newError, err.local.key, "Value is invalid");
                break;
        }
    });
    return new Error(JSON.stringify(newError));
};

const addErrorMessage = (obj, key, value) => {
    if (!!obj[key]) {
        if (Array.isArray(obj[key]) && !obj[key].includes(value))
            obj[key].push(value);
        else if (obj[key] !== value)
            obj[key] = [obj[key], value];
    }
    else obj[key] = value;
    return obj;
}

export const sendValidationError = (res, error, errCode) => res.status(errCode).send({ "error": JSON.parse(error.message) });