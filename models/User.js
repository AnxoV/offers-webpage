const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        Student: Number,
        Company: Number,
        Supervisor: Number,
        Admin: Number
    },
    state: {
        type: Number,
        default: 300
    },
    refreshToken: String
});

module.exports = mongoose.model("User", userSchema);