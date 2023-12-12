const express = require("express");
const router = express.Router();

const {
  addTranslation,
  addPhrase,
  updateTranslation,
  deleteTranslation,
  deletePhrase,
  getAllTranslations,
  getTranslationInLanguage,
  addOrUpdatePhrase,
} = require("../controllers/adminController");

const {
  authJwtAccess,
  authJwtRefresh,
  localAuthNew,
  adminAuth,
} = require("../middleware/authMiddleware");
const { get } = require("../models/phraseSchema");

router.post("/add-or-update-phrase", addOrUpdatePhrase);

router.get("/get-translation", getTranslationInLanguage);

router.get("/get-phrase", getAllTranslations);

router.post("/add-phrase", addPhrase);

router.patch("/add-translation", addTranslation);

router.patch("/update-translation", updateTranslation);

router.patch("/delete-translation", deleteTranslation);

router.delete("/", deletePhrase);

module.exports = router;
