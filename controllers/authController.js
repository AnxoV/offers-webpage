const {User} = require("../models/User");
const jwt = require("jsonwebtoken");
const {sanitizeObject} = require("../utils/validation");

const handleLogin = async function(request, response) {
    const {email, password} = sanitizeObject(request.body);
    console.log(`[*] authController.handleLogin: authenticating user ${email}`);
    if (!email || !password) {
        console.log("[^] authController.handleLogin: missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const foundUser = await User.findOne(
        {email},
        {email: true, password: true}
    ).exec();
    if (!foundUser) {
        console.log("[^] authController.handleLogin: user not found");
        return response.sendStatus(409);
    }

    console.log(`[^] authController.handleLogin: found user ${foundUser.email}`);

    const objectUser = foundUser.toObject();
    
    const match = password ===  objectUser.password;
    if (!match) {
        console.log("[^] authController.handleLogin: passwords doesn't match");
        return response.sendStatus(401);
    }

    const accessToken = jwt.sign(
        {
            "email": foundUser.email,
            "role": foundUser.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "300s" }
    );

    console.log("[^] authController.handleLogin: generated accessToken");

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    console.log("[^] authController.handleLogin: generated refreshToken");


    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    console.log("[^] authController.handleLogin: jwt cookie set");

    response.json({ accessToken });
}

module.exports = { handleLogin };