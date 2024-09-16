const express = require("express");
const router = express.Router();
const page = require("../utils/page");

const sessionHandler = require("../middleware/sessionHandler");

router.get("/",
    sessionHandler.inactiveSessionRedirect,
    page.load("offers.html")
);

module.exports = router;