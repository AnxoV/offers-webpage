const {User} = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async function(request, response) {
    const cookies = request.cookies;
    if (!cookies?.jwt) {
        return response.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        return response.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        function(error, decoded) {
            if (error || foundUser.username !== decoded.username) {
                return response.sendStatus(403);
            }
            const role = Object.values(foundUser.role);
            const accessToken = jwt.sign(
                {
                    "email": foundUser.email,
                    "role": role
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "300s" }
            );

            response.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };