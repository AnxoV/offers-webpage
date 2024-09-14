const {User} = require("../models/User");
const jwt = require("jsonwebtoken");
const {sanitizeObject} = require("../utils/validation");

const handleLogin = async function(request, response) {
    const {email, password} = sanitizeObject(request.body);
    if (!email || !password) {
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const foundUser = await User.findOne({email}).exec();
    if (!foundUser) {
        return response.sendStatus(409);
    }

    console.log(email, password);

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