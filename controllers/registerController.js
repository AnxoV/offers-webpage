const {User, Student, Company, Supervisor, Admin} = require("../models/User");
const Role = require("../models/Role");
const path = require("path");
const jwt = require("../utils/jwt");
const {log} = require("../utils/logger");
const {sanitizeObject, checkRequiredFields} = require("../utils/validation");

const FILE = path.basename(__filename, path.extname(__filename));

const handleNewStudent = async function(request, response) {
    log("*", FILE, handleNewStudent, "attempting to create new student user");
    const requiredFields = [
        "email",
        "name",
        "surname",
        "birthdate",
        "password"
    ];

    if (!checkRequiredFields(requiredFields, request.body)) {
        log("!", FILE, handleNewStudent, "missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }
    
    const {
        email,
        name,
        surname,
        birthdate,
        password
    } = sanitizeObject(request.body);

    const duplicate =  await User.findOne({ email }).exec();
    if (duplicate) {
        log("!", FILE, handleNewStudent, "found duplicate user");
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "student" }).exec();
    if (!role) {
        log("!", FILE, handleNewStudent, "user role not found");
        return response.sendStatus(500);
    }

    try {
        await Student.create({
            "email": email,
            "name": name,
            "surname": surname,
            "birthdate": birthdate,
            "password": password,
            "role": role.id
        });

        log("^", FILE, handleNewStudent, "student user created successfully");
    } catch(error) {
        log("!", FILE, handleNewStudent, "failed to create student user");
        response.status(500);
        response.json({
            "message": error.message
        });
    }

    const user = await User.findOne({email}).exec();
    const {refreshToken, accessToken} = await jwt.sign(user);

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    log("^", FILE, handleNewStudent, "jwt cookie set");

    response.json({ accessToken });
}

const handleNewCompany = async function(request, response) {
    log("*", FILE, handleNewCompany, "attempting to create new company user");
    const requiredFields = [
        "email",
        "name"
    ];

    if (!checkRequiredFields(requiredFields, request.body)) {
        log("!", FILE, handleNewCompany, "missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }
    
    const {email, name} = sanitizeObject(request.body);

    const duplicate = await User.findOne({email}).exec();
    if (duplicate) {
        log("!", FILE, handleNewCompany, "found duplicate user");
        return response.sendStatus(409);
    }

    const role = await Role.findOne({"name": "company"}).exec();
    if (!role) {
        log("!", FILE, handleNewCompany, "user role not found");
        return response.sendStatus(500);
    }

    try {
        await Company.create({
            "email": email,
            "name": name,
            "role": role.id
        });

        log("^", FILE, handleNewCompany, "company user created successfully");
    } catch(error) {
        log("!", FILE, handleNewCompany, "failed to create company user")
        response.status(500);
        response.json({
            "message": error.message
        });
    }

    const user = await User.findOne({email}).exec();
    const {refreshToken, accessToken} = await jwt.sign(user);

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    log("^", FILE, handleNewCompany, "jwt cookie set");

    response.json({ accessToken });
}

const handleNewSupervisor = async function(request, response) {
    log("*", FILE, handleNewSupervisor, "attempting to create new supervisor user");
    const requiredFields = [
        "email",
        "name",
        "surname",
        "password"
    ];

    if (!checkRequiredFields(requiredFields, request.body)) {
        log("!", FILE, handleNewSupervisor, "missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }

    const {email, name, surname, password} = sanitizeObject(request.body);

    const duplicate =  await User.findOne({ email }).exec();
    if (duplicate) {
        console.log("!", FILE, handleNewSupervisor, "found duplicate user");
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "supervisor" }).exec();
    if (!role) {
        log("!", FILE, handleNewSupervisor, "user role not found");
        return response.sendStatus(500);
    }

    try {
        await Supervisor.create({
            "email": email,
            "name": name,
            "surname": surname,
            "password": password,
            "role": role.id
        });

        log("^", FILE, handleNewSupervisor, "supervisor user created successfully");
    } catch(error) {
        log("!", FILE, handleNewSupervisor, "failed to create supervisor user");
        response.status(500);
        response.json({
            "message": error.message
        });
    }

    const user = await User.findOne({email}).exec();
    const {refreshToken, accessToken} = await jwt.sign(user);

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    log("^", FILE, handleNewSupervisor, "jwt cookie set");

    response.json({ accessToken });
}

const handleNewAdmin = async function(request, response) {
    log("*", FILE, handleNewAdmin, "attempting to create new admin user");
    const requiredFields = [
        "email",
        "name",
        "surname",
        "password"
    ];

    if (!checkRequiredFields(requiredFields, request.body)) {
        log("!", FILE, handleNewAdmin, "missing required values");
        return response.status(400).json({
            "message": "Missing required values"
        });
    }
    
    const {email, name, surname, password} = sanitizeObject(request.body);

    const duplicate =  await User.findOne({ email }).exec();
    if (duplicate) {
        log("!", FILE, handleNewAdmin, "found duplicate user");
        return response.sendStatus(409);
    }

    const role = await Role.findOne({ "name": "admin" }).exec();
    if (!role) {
        log("!", FILE, handleNewAdmin, "user role not found");
        return response.sendStatus(500);
    }

    try {
        await Admin.create({
            "email": email,
            "name": name,
            "surname": surname,
            "password": password,
            "role": role.id
        });

        log("^", FILE, handleNewAdmin, "admin user created successfully");
    } catch(error) {
        log("!", FILE, handleNewAdmin, "failed to create admin user");
        response.status(500);
        response.json({
            "message": error.message
        });
    }

    const user = await User.findOne({email}).exec();
    const {refreshToken, accessToken} = await jwt.sign(user);

    response.cookie(
        "jwt",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        }
    );

    log("^", FILE, handleNewAdmin, "jwt cookie set");

    response.json({ accessToken });
}

module.exports = {
    handleNewStudent,
    handleNewCompany,
    handleNewSupervisor,
    handleNewAdmin
}