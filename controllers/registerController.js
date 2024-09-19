const { User, Student, Company, Supervisor, Admin } = require("../models/User");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const {sanitizeObject} = require("../utils/validation");

const handleNewStudent = async function(request, response) {
    console.log("[*] registerController.handleNewStudent: attempting to create new student user");
    const {
        email,
        name,
        surname,
        birthdate,
        password
    } = sanitizeObject(request.body);
    
    const requiredFields = [
        "email",
        "name",
        "surname",
        "birthdate",
        "password"
    ];

    for (field in requiredFields) {
        if (!request.body[field]) {
            console.log("[^] registerController.handleNewStudent: missing required values");
            return response.status(400).json({
                "message": "Missing required values"
            });
        }
    }

    const duplicate =  await User.findOne({ email }).exec();

    if (duplicate) {
        console.log(`[^] registerController.handleNewStudent: found duplicate user ${email}`);
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "student" }).exec();

    if (!role) {
        console.log("[^] registerController.handleNewStudent: user role not found");
        return response.sendStatus(500);
    }

    const accessToken = jwt.sign(
        {
            "email": email,
            "role": role.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "300s" }
    );

    console.log("[^] registerController.handleNewStudent: generated accessToken");

    const refreshToken = jwt.sign(
        { "email": email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    console.log("[^] registerController.handleNewStudent: generated refreshToken");

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    console.log("[^] registerController.handleNewStudent: jwt cookie set");

    try {
        const result = await Student.create({
            "email": email,
            "name": name,
            "surname": surname,
            "birthdate": birthdate,
            "password": password,
            "role": role.id,
            "refreshToken": refreshToken
        });

        console.log("[^] registerController.handleNewStudent: student user created");
    } catch(error) {
        console.log("[^] registerController.handleNewStudent: failed to save user");
        
        response.clearCookie(
            "jwt",
            {
                httpOnly: true,
                sameSite: "None"
            }
            // secure: true
        );

        response.status(500);
        response.json({
            "message": error.message
        });
    }

    response.json({ accessToken });
}

const handleNewCompany = async function(request, response) {
    const {email, name} = sanitizeObject(request.body);
    
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
    const {email, name, surname, password} = sanitizeObject(request.body);
    
    const requiredFields = ["email", "name", "surname", "password"];

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
            "password": password,
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
    const {email, name, surname, password} = sanitizeObject(request.body);
    
    const requiredFields = ["email", "name", "surname", "password"];

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
            "password": password,
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