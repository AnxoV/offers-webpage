const {User} = require("../models/User");
const {sanitizeInput} = require("../utils/validation");

const handleLogout = async function(request, response) {
    const cookies = request.cookies;
    if (!cookies?.jwt) {
        return response.sendStatus(204);
    }

    const refreshToken = sanitizeInput(cookies.jwt);

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (foundUser) {
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        console.log(result);
    }

    response.clearCookie(
        "jwt",
        {
            httpOnly: true,
            sameSite: "None"
        }
        // secure: true
    );
    
    response.sendStatus(204);
}

module.exports = { handleLogout };