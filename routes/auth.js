const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/:loginCode", authController.handleLogin);

module.exports = router;