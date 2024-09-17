const validInput = function(input) {
    if (!input) {
        return false;
    }

    return /^\w+$/.test(input);
};

const sanitizeInput = function(input) {
    if (!input) {
        return false;
    }

    return input.replace(/[<>\/'"]+/g, '');
};

const sanitizeObject = function(object) {
    if (!object) {
        return false;
    }

    Object.keys(object).forEach(function(key) {
        object[key] = sanitizeInput(object[key])
    });

    return object;
};

const checkRequiredFields = function(fields, object) {
    if (!fields || !object) {
        return false;
    }

    fields.forEach(function(field) {
        if (!object[field]) {
            return false;
        }
    });

    return true;
}

module.exports = {
    validInput,
    sanitizeInput,
    sanitizeObject,
    checkRequiredFields
}