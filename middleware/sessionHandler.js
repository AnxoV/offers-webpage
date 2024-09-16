const activeSessionRedirect = function(request, response, next) {
    const cookies = request.cookies;
    if (cookies?.jwt) {
        response.redirect("/offers");
    } else {
        next();
    }
}

const inactiveSessionRedirect = function(request, response, next) {
    const cookies = request.cookies;
    if (!cookies?.jwt) {
        response.redirect("/");
    } else {
        next();
    }
}

module.exports = {
    activeSessionRedirect,
    inactiveSessionRedirect
}