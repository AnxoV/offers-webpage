const verifyRoles = function(...allowedRoles) {
    return function(request, response, next) {
        console.log("[*] VerifyRoles: verifying roles");

        if (!request?.role) {
            console.log("[^] VerifyRoles: role not found");
            return response.sendStatus(401);
        }

        if (!allowedRoles.includes(request.role)) {
            console.log("[^] VerifyRoles: role not included in allowedRoles");
            return response.sendStatus(401);
        }

        next();
    }
}

module.exports = verifyRoles;