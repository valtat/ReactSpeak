const express = require("express");
const router = express.Router();

const {
  authJwtAccess,
  authJwtRefresh,
  localAuthNew,
  adminAuth,
} = require("../middleware/authMiddleware");

const {
  returnAllCountries,
  returnSingleCountry,
  addNewCountry,
  getUniqueLanguages,
} = require("../controllers/countryController");

router.get("/", returnAllCountries);

router.get("/countries/:country", returnSingleCountry);

router.post("/", addNewCountry);

router.get("/languages", getUniqueLanguages);

module.exports = router;
