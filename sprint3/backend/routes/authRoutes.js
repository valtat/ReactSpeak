const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  generateChatToken,
} = require("../controllers/authController");
const {
  authJwtAccess,
  authJwtRefresh,
  localAuthNew,
  adminAuth,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", localAuthNew, loginUser);

router.post("/logout", logoutUser);

router.post("/chat-token", authJwtAccess, generateChatToken);

router.post("/refresh-token", authJwtRefresh, refreshAccessToken);

router.get("/verify-token", authJwtAccess, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

router.get("/check", authJwtAccess, (req, res) => {
  res.send("You are logged in as " + req.user.username);
});

router.get("/admin", authJwtAccess, adminAuth, (req, res) => {
  res.send(
    "You are logged in as " + req.user.username + " and you are an admin"
  );
});

module.exports = router;
