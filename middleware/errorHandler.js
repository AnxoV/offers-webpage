const { logEvent } = require("./logEvent");

const errorHandler = function(error, request, response, next) {
    logEvent(`${error.name}: ${error.message}`, "errors.txt");
    console.error(error.stack);
    response.status(500);
    response.send(error.message); // Remove in production
}

module.exports = errorHandler;