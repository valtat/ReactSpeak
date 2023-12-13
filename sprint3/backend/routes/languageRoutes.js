const express = require("express");
const router = express.Router();

const {
  authJwtAccess,
  authJwtRefresh,
  localAuthNew,
  adminAuth,
} = require("../middleware/authMiddleware");

const languageController = require("../controllers/realLanguageController");

router.get("/", authJwtAccess, languageController.getRandomPhrases);

router.get("/all", authJwtAccess, languageController.getAllPhrases);

module.exports = router;
