const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        default: 300
    },
    refreshToken: String,
    loginCode: String
});

const extend = function(schema, obj) {
    return new mongoose.Schema(Object.assign({}, schema.obj, obj));
}

const StudentSchema = extend(UserSchema, {
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});

const CompanySchema = extend(UserSchema, {
    name: {
        type: String,
        required: true
    }
});

const SupervisorSchema = extend(UserSchema, {
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});

const AdminSchema = extend(UserSchema, {
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema, "users");
const Student = mongoose.model("Student", StudentSchema, "users");
const Company = mongoose.model("Company", CompanySchema, "users");
const Supervisor = mongoose.model("Supervisor", SupervisorSchema, "users");
const Admin = mongoose.model("Admin", AdminSchema, "users");

module.exports = {
    User,
    Student,
    Company,
    Supervisor,
    Admin
}