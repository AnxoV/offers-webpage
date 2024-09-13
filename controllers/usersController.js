const {User} = require("../models/User");
const {sanitizeInput, sanitizeObject} = require("../utils/validation");

const getAllUsers = async function(request, response) {
    const availableFilters = [
        "id",
        "email",
        "name",
        "surname",
        "role",
        "state"
    ];
    const filters = sanitizeObject(request.query);
    const filteredKeys = {};
    for (const [key, value] of Object.entries(filters)) {
        if (availableFilters.includes(key)) {
            filteredKeys[key] = value;
        }
    }

    const users = await User.find(filteredKeys);

    if (!users) {
        return response.status(204).json({
            "message": "No users found"
        });
    }

    response.json(users);
}

const deleteUser = async function(request, response) {
    const id = sanitizeInput(request.body.id);

    if (!id) {
        return response.status(400).json({
            "message": "ID parameter is required"
        });
    }

    const user = await User.findOne({ _id: request.body.id}).exec();

    if (!user) {
        return response.json(204).json({
            "message": `No user matches ID ${request.body.id}`
        });
    }

    user.state = 400;

    const result = await user.save();
    
    response.json(result);
}


module.exports = {
    getAllUsers,
    deleteUser
}