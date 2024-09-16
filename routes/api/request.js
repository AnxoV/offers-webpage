const express = require("express");
const router = express.Router();

const requestCodeController = require("../../controllers/requestCodeController");

router.post("/", requestCodeController.handleRequestCode);

module.exports = router;