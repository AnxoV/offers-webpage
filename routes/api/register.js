const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router.post("/student", registerController.handleNewStudent);
router.post("/company", registerController.handleNewCompany);
router.post("/supervisor",
    verifyRoles(ROLES_LIST.Admin),
    registerController.handleNewSupervisor
);
router.post("/admin",
    verifyRoles(ROLES_LIST.Admin),
    registerController.handleNewAdmin
);

module.exports = router;