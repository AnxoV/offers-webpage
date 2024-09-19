const jwt = require("jsonwebtoken");

const sign = async function(user) {
    console.log("[*] jwt.signJWT: signing accessToken");
    const accessToken = jwt.sign(
        {
            "email": user.email,
            "role": user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "300s"
        }
    );

    console.log("[*] jwt.signJWT: signing refreshToken");
    const refreshToken = jwt.sign(
        {
            "email": user.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    );

    console.log("[*] jwt.signJWT: attempting to save user refreshToken");
    user.refreshToken = refreshToken;
    try {
        await user.save();
        console.log("[^] jwt.signJWT: user refreshToken saved successfully");
    } catch(error) {
        console.log("[!] jwt.signJWT: error when saving user refreshToken");
        console.error(error);
    }

    return {refreshToken, accessToken};
}

module.exports = {sign}