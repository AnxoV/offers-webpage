const express = require("express");
const router = express.Router();
const page = require("../utils/page");

router.get("^/$|/index(.html)?", page.load("index.html"));

module.exports = router;