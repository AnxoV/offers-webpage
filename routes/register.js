const express = require("express");
const router = express.Router();
const page = require("../utils/page");

router.get("^/$|/index(.html)?", page.load("index.html"));
router.get("/student(.html)?", page.load("register", "student.html"));
router.get("/company(.html)?", page.load("register", "company.html"));

module.exports = router;