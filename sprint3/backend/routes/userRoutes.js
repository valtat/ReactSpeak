const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const { jwtAuth } = require("../middleware/authMiddleware");

router.post("/change-password", jwtAuth, userController.changePassword);

router.delete("/delete-user", jwtAuth, userController.deleteUser);

module.exports = router;
