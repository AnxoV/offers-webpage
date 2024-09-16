const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/student(.html)?", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "login", "student.html"));
});

router.get("/company(.html)?", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "login", "company.html"));
});

module.exports = router;