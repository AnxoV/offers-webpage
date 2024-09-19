const {User} = require("../models/User");
const path = require("path");
const jwt = require("../utils/jwt");
const {log} = require("../utils/logger");
const {sanitizeInput, sanitizeObject, checkRequiredFields} = require("../utils/validation");

const FILE = path.basename(__filename, path.extname(__filename));

const handleLogin = async function(request, response) {
    log("*", FILE, handleLogin, "attempting to log in user");
    const requiredFields = ["email", "password"];

    if (!checkRequiredFields(requiredFields, request.body)) {
        log("!", FILE, handleLogin, "missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const {email, password} = sanitizeObject(request.body);

    const foundUser = await User.findOne({email}).exec();
    if (!foundUser) {
        log("!", FILE, handleLogin, "user not found");
        return response.status(409).json({
            "message": "Email or password incorrect"
        });
    }
    
    log("^", FILE, handleLogin, `found user ${foundUser.email}`);

    const objectUser = foundUser.toObject();
    
    const match = password ===  objectUser.password;
    if (!match) {
        log("!", FILE, handleLogin, "passwords doesn't match");
        return response.status(409).json({
            "message": "Email or password incorrect"
        });
    }

    const {refreshToken, accessToken} = await jwt.sign(foundUser);

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    log("^", FILE, handleLogin, "jwt cookie set");
    log("^", FILE, handleLogin, "user log in successful");

    response.json({accessToken});
}

const handleEmailLogin = async function(request, response) {
    log("*", FILE, handleEmailLogin, "attempting to log in user");
    const loginCode = sanitizeInput(request.params.loginCode);
    const email = sanitizeInput(request.query.email);

    if (!loginCode || !email) {
        log("!", FILE, handleLogin, "missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const foundUser = await User.findOne({email}).exec();
    if (!foundUser || (foundUser.loginCode !== loginCode)) {
        return response.status(409).json({
            "message": "Email or login code incorrect"
        });
    }

    const {refreshToken, accessToken} = await jwt.sign(foundUser);

    //foundUser.loginCode = "";
    //const result = await foundUser.save();

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    log("^", FILE, handleEmailLogin, "jwt, cookie set");
    log("^", FILE, handleEmailLogin, "user log in successful");

    response.json({accessToken});
}

module.exports = {
    handleLogin,
    handleEmailLogin
};