const jwt = require("jsonwebtoken");

const verifyJWT = function(request, response, next) {
    console.log("[*] VerifyJWT: verifying token");
    
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        console.log("[^] VerifyJWT: bad formed request");
        return response.sendStatus(401);
    }

    console.log("[^] VerifyJWT: well formed request");

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        function(error, decoded) {
            if (error) {
                return response.sendStatus(403);
            }
            console.log("[^] VerifyJWT: token verified");
            request.user = decoded.username;
            request.roles = decoded.roles;
            next();
        }
    );
}

module.exports = verifyJWT;