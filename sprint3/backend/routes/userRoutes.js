const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const { authJwtAccess } = require("../middleware/authMiddleware");

router.get("/", authJwtAccess, userController.getUser);

router.post("/change-password", authJwtAccess, userController.changePassword);

router.delete("/delete-user", authJwtAccess, userController.deleteUser);

module.exports = router;
