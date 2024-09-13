const {User} = require("../models/User");


const getAllUsers = async function(request, response) {
    const availableFilters = ["name", "surname", "role", "state"];
    const filteredKeys = {};
    for (const [key, value] of Object.entries(request.query)) {
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

const updateUser = async function(request, response) {
    if (!request?.body?.id) {
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

    if (request.body?.email) {
        user.email = request.body.email
    }

    if (request.body?.state) {
        user.state = request.body.state;
    }

    const result = await user.save();
    
    response.json(result);
}

const deleteUser = async function(request, response) {
    if (!request?.body?.id) {
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
    updateUser,
    deleteUser
}