const {User} = require("../models/User");
const { v4: uuid } = require("uuid");

const handleRequestCode = async function(request, response) {
    const {email} = request.body;
    
    if (!email) {
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
        return response.sendStatus(409);
    }
    
    response.sendStatus(204);
    console.log(uuid());
}

module.exports = { handleRequestCode };