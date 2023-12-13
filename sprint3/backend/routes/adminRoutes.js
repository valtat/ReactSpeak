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

router.post(
  "/add-or-update-phrase",
  authJwtAccess,
  adminAuth,
  addOrUpdatePhrase
);

router.get(
  "/get-translation/:englishMeaning/:language",
  authJwtAccess,
  adminAuth,
  getTranslationInLanguage
);

router.get("/get-phrase", authJwtAccess, adminAuth, getAllTranslations);

router.post("/add-phrase", authJwtAccess, adminAuth, addPhrase);

router.patch("/add-translation", authJwtAccess, adminAuth, addTranslation);

router.patch(
  "/update-translation",
  authJwtAccess,
  adminAuth,
  updateTranslation
);

router.patch(
  "/delete-translation",
  authJwtAccess,
  adminAuth,
  deleteTranslation
);

router.delete("/", authJwtAccess, adminAuth, deletePhrase);

module.exports = router;
