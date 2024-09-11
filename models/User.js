const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        default: 300
    },
    refreshToken: String
});

module.exports = mongoose.model("User", userSchema);