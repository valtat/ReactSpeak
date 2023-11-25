const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/forgot-password", userController.forgotPassword);

router.post("/login", userController.login);

module.exports = router;
