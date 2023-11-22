const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/forgot-password", userController.forgotPassword);

module.exports = router;
