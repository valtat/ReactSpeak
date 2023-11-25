const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../controllers/authController");
const {
  adminAuth,
  userAuth,
  localAuth,
  jwtAuth,
  refreshAuth,
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", localAuth, loginUser);

router.post("/logout", logoutUser);

router.post("/refresh-token", refreshAuth, refreshAccessToken);

router.get("/verify-token", jwtAuth, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are logged in as " + req.user.username);
  }
);

module.exports = router;
