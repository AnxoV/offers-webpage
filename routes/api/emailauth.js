const express = require("express");
const router = express.Router();
const emailAuthController = require("../../controllers/emailAuthController");

router.get("/:loginCode", emailAuthController.handleLogin);

module.exports = router;