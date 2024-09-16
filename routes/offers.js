const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "views", "offers.html"));
});

module.exports = router;