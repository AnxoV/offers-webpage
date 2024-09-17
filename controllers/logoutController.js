const {User} = require("../models/User");
const {sanitizeInput} = require("../utils/validation");

const handleLogout = async function(request, response, next) {
    console.log("[*] logoutController.handleLogout: logging out user");
    const cookies = request.cookies;
    if (!cookies?.jwt) {
        console.log("[^] logoutController.handleLogout: no jwt cookie found");
        next();
    }

    const refreshToken = sanitizeInput(cookies.jwt);

    const foundUser = await User.findOne(
        {refreshToken},
        {email: true, refreshToken: true}
    ).exec();
    if (foundUser) {
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        console.log(`[^] logoutController.handleLogout: found user ${result.email}`)
    }


    response.clearCookie(
        "jwt",
        {
            httpOnly: true,
            sameSite: "None"
        }
        // secure: true
    );

    console.log("[^] logoutController.handleLogout: cookie cleared");

    next();
}

module.exports = { handleLogout };