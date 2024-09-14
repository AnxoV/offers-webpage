const {User} = require("../models/User");
const jwt = require("jsonwebtoken");
const {sanitizeInput} = require("../utils/validation");

const handleLogin = async function(request, response) {
    const {loginCode} = request.params;
    const email = sanitizeInput(request.query.email);
    console.log(loginCode, email    );
    if (!email || !loginCode) {
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const foundUser = await User.findOne({email}).exec();
    if (
        !foundUser
        || foundUser.loginCode !== loginCode
    ) {
        return response.sendStatus(409);
    }

    console.log(email, loginCode);

    const accessToken = jwt.sign(
        {
            "email": foundUser.email,
            "role": foundUser.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "300s" }
    );

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    //foundUser.loginCode = ""; Commented for testing
    const result = await foundUser.save();
    console.log(result);

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    response.json({ accessToken });
}

module.exports = { handleLogin };