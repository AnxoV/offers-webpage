const express = require("express");
const router = express.Router();
const path = require("path");

const registerController = require("../controllers/registerController");

router.get("/student(.html)?", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "register", "student.html"));
});

router.get("/company(.html)?", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "register", "company.html"));
});

router.post("/student", registerController.handleNewStudent);
router.post("/company", registerController.handleNewCompany);
router.post("/supervisor", registerController.handleNewSupervisor);
router.post("/admin", registerController.handleNewAdmin);

module.exports = router;