const validInput = function(input) {
    return /^\w+$/.test(input);
};

const sanitizeInput = function(input) {
    return input.replace(/[<>\/'"]+/g, '');
};

const sanitizeObject = function(object) {
    Object.keys(object).forEach(function(key) {
        object[key] = sanitizeInput(object[key])
    });

    return object;
};

module.exports = {
    validInput,
    sanitizeInput,
    sanitizeObject
}