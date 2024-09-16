const verifyRoles = function(...allowedRoles) {
    return function(request, response, next) {
        if (!request?.role) {
            return response.sendStatus(401);
        }

        if (!allowedRoles.includes(request.role)) {
            return response.sendStatus(401);
        }

        next();
    }
}

module.exports = verifyRoles;