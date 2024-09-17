const jwt = require("jsonwebtoken");

const verifyJWT = function(request, response, next) {
    console.log("[*] verifyJWT: verifying token");
    
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        console.log("[^] verifyJWT: bad formed request");
        return response.sendStatus(401);
    }

    console.log("[^] verifyJWT: well formed request");

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        function(error, decoded) {
            if (error) {
                return response.sendStatus(403);
            }
            console.log("[^] verifyJWT: token verified");
            request.user = decoded.username;
            request.roles = decoded.roles;
            next();
        }
    );
}

module.exports = verifyJWT;