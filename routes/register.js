const express = require("express");
const router = express.Router();
const path = require("path");

const registerController = require("../controllers/registerController");

const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/student(.html)?", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "register", "student.html"));
});

router.get("/company(.html)?", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "register", "company.html"));
});

router.post("/student", registerController.handleNewStudent);
router.post("/company", registerController.handleNewCompany);
router.post("/supervisor", verifyRoles(ROLES_LIST.Admin), registerController.handleNewSupervisor);
router.post("/admin", verifyRoles(ROLES_LIST.Admin), registerController.handleNewAdmin);

module.exports = router;