const jwt = require("jsonwebtoken");

const verifyJWT = function(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return response.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        function(error, decoded) {
            if (error) {
                return response.sendStatus(403);
            }
            request.user = decoded.username;
            request.roles = decoded.roles;
            next();
        }
    );
}

module.exports = verifyJWT;