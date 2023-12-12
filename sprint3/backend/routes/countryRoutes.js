const express = require("express");
const router = express.Router();
const {
  returnAllCountries,
  returnSingleCountry,
  addNewCountry,
} = require("../controllers/countryController");

router.get("/", returnAllCountries);

router.get("/countries/:country", returnSingleCountry);

router.post("/", addNewCountry);

module.exports = router;
