const { User, Student, Company, Supervisor, Admin } = require("../models/User");
const Role = require("../models/Role");

const handleNewStudent = async function(request, response) {
    const {email, name, surname} = request.body;
    
    const requiredFields = ["email", "name", "surname"];

    requiredFields.forEach(function(field) {
        if (!request.body[field]) {
            return response.status(400).json({
                "message": `Missing required value ${field}`
            });
        }
    });

    const duplicate =  await User.findOne({ email }).exec();

    if (duplicate) {
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "student" }).exec();

    if (!role) {
        return response.sendStatus(500);
    }

    try {
        const result = await Student.create({
            "email": email,
            "name": name,
            "surname": surname,
            "role": role.id
        });

        console.log(result);

        response.status(201);
        response.json({
            "success": `New user ${email} created`
        });
    } catch(error) {
        response.status(500);
        response.json({
            "message": error.message
        });
    }
}

const handleNewCompany = async function(request, response) {
    const {email, name} = request.body;
    
    const requiredFields = ["email", "name"];

    requiredFields.forEach(function(field) {
        if (!request.body[field]) {
            return response.status(400).json({
                "message": `Missing required value ${field}`
            });
        }
    });

    const duplicate =  await User.findOne({ email }).exec();

    if (duplicate) {
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "company" }).exec();

    if (!role) {
        return response.sendStatus(500);
    }

    try {
        const result = await Company.create({
            "email": email,
            "name": name,
            "role": role.id
        });

        console.log(result);

        response.status(201);
        response.json({
            "success": `New company ${email} created`
        });
    } catch(error) {
        response.status(500);
        response.json({
            "message": error.message
        });
    }
}

const handleNewSupervisor = async function(request, response) {
    const {email, name, surname} = request.body;
    
    const requiredFields = ["email", "name", "surname"];

    requiredFields.forEach(function(field) {
        if (!request.body[field]) {
            return response.status(400).json({
                "message": `Missing required value ${field}`
            });
        }
    });

    const duplicate =  await User.findOne({ email }).exec();

    if (duplicate) {
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "supervisor" }).exec();

    if (!role) {
        return response.sendStatus(500);
    }

    try {
        const result = await Supervisor.create({
            "email": email,
            "name": name,
            "surname": surname,
            "role": role.id
        });

        console.log(result);

        response.status(201);
        response.json({
            "success": `New supervisor ${email} created`
        });
    } catch(error) {
        response.status(500);
        response.json({
            "message": error.message
        });
    }
}

const handleNewAdmin = async function(request, response) {
    const {email, name, surname} = request.body;
    
    const requiredFields = ["email", "name", "surname"];

    requiredFields.forEach(function(field) {
        if (!request.body[field]) {
            return response.status(400).json({
                "message": `Missing required value ${field}`
            });
        }
    });

    const duplicate =  await User.findOne({ email }).exec();

    if (duplicate) {
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "admin" }).exec();

    if (!role) {
        return response.sendStatus(500);
    }

    try {
        const result = await Admin.create({
            "email": email,
            "name": name,
            "surname": surname,
            "role": role.id
        });

        console.log(result);

        response.status(201);
        response.json({
            "success": `New admin ${email} created`
        });
    } catch(error) {
        response.status(500);
        response.json({
            "message": error.message
        });
    }
}

module.exports = {
    handleNewStudent,
    handleNewCompany,
    handleNewSupervisor,
    handleNewAdmin
}