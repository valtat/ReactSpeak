const express = require("express");
const router = express.Router();
const {
  returnProfile,
  updateDefaultLanguage,
  addLanguageStudied,
} = require("../controllers/profileController");
const { jwtAuth } = require("../middleware/authMiddleware");

router.get("/", jwtAuth, returnProfile);
router.post("/defaultLanguage", jwtAuth, updateDefaultLanguage);
router.post("/addLanguage", jwtAuth, addLanguageStudied);

module.exports = router;
