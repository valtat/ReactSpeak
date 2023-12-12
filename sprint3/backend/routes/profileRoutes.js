const express = require("express");
const router = express.Router();
const { returnProfile } = require("../controllers/profileController");
const { updateDefaultLanguage } = require("../controllers/profileController");
const { jwtAuth } = require("../middleware/authMiddleware");

router.get("/", returnProfile);
router.post("/defaultLanguage", jwtAuth, updateDefaultLanguage);

module.exports = router;
