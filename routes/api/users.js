const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/usersController");

router.route("/")
    .get(usersController.getAllUsers)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;