const express = require("express");
const router = express.Router();
const page = require("../utils/page");

const sessionHandler = require("../middleware/sessionHandler");

router.get("/student(.html)?",
    sessionHandler.activeSessionRedirect,
    page.load("login", "student.html")
);
router.get("/company(.html)?",
    sessionHandler.activeSessionRedirect,
    page.load("login", "company.html")
);

module.exports = router;