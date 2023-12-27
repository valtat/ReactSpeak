const express = require("express");
const router = express.Router();
const {
  returnProfile,
  updateDefaultLanguage,
  addLanguageStudied,
  updateProgressByLanguage,
} = require("../controllers/profileController");
const { authJwtAccess } = require("../middleware/authMiddleware");

router.get("/", authJwtAccess, returnProfile);

router.post("/defaultLanguage", authJwtAccess, updateDefaultLanguage);

router.post("/addLanguage", authJwtAccess, addLanguageStudied);

router.put("/progress", authJwtAccess, updateProgressByLanguage);

module.exports = router;
