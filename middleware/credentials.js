const allowedOrigins = require("../config/allowedOrigins");

const credentials = function(request, response, next) {
    const origin = request.headers.origin;
    if (allowedOrigins.includes(origin)) {
        response.setHeader("Access-Control-Allow-Credentials", true);
    }
    next();
}

module.exports = credentials;