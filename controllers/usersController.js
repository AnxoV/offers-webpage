const {User} = require("../models/User");


const getAllUsers = async function(request, response) {
    const users = await User.find();

    if (!users) {
        return response.status(204).json({
            "message": "No users found"
        });
    }

    response.json(users);
}

const createNewUser = async function(request, response) {
    if (!request?.body?.email) {
        return response.status(400).json({
            "message": "Email is required"
        });
    }

    const foundUser = await User.find({ email: request.body.email }).exec();

    if (foundUser) {
        return response.sendStatus(409);
    }

    try {
        const result = await User.create({
            email: request.body.email
        });

        response.status(201);
        response.json(result);
    } catch(error) {
        console.error(error);
    }
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

const getUser = async function(request, response) {
    if (!request?.params?.id) {
        return response.status(400).json({
            "message": "ID parameter is required"
        });
    }

    const user = await User.findOne({ _id: request.params.id }).exec();

    if (!user) {
        return response.status(204).json({
            "message": `No user matches ID ${request.params.id}`
        });
    }

    response.json(user);
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}