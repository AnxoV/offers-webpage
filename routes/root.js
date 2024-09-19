const express = require("express");
const router = express.Router();

const page = require("../utils/page");
const sessionHandler = require("../middleware/sessionHandler");

const logoutController = require("../controllers/logoutController");

router.get("^/$|/index(.html)?|/login(.html)?",
    sessionHandler.activeSessionRedirect,
    page.load("index.html")
);

router.get("/register(.html)?",
    page.load("register.html")
);

router.get("/offers(.html)?",
    sessionHandler.inactiveSessionRedirect,
    page.load("offers.html")
);

router.get("/logout(.html)?",
    logoutController.handleLogout
);

module.exports = router;