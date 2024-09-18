const {User} = require("../models/User");
const {sanitizeInput} = require("../utils/validation");
const page = require("../utils/page");

const handleLogout = async function(request, response) {
    console.log("[*] logoutController.handleLogout: logging out user");
    const cookies = request.cookies;
    if (!cookies?.jwt) {
        console.log("[^] logoutController.handleLogout: no jwt cookie found");
        page.load("/index.html");
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

    response.redirect("/");
}

module.exports = { handleLogout };