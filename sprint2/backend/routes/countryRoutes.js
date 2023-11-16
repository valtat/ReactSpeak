const express = require("express");
const router = express.Router();
const {
  returnAllCountries,
  returnSingleCountry,
} = require("../controllers/countryController");

router.get("/", returnAllCountries);

router.get("/countries/:country", returnSingleCountry);

module.exports = router;
