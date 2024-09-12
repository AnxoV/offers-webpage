const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.post("/student", registerController.handleNewStudent);
router.post("/company", registerController.handleNewCompany);
router.post("/supervisor", registerController.handleNewSupervisor);
router.post("/admin", registerController.handleNewAdmin);

module.exports = router;