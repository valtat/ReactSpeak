const countryModel = require("../models/dummyCountryModel");

exports.returnSingleCountry = (req, res) => {
  const country = countryModel.returnSingleCountry(req.params.country);
  if (country) {
    res.status(200).json({
      status: "success",
      data: {
        country,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Country not found",
    });
  }
};

exports.returnAllCountries = (req, res) => {
  const countries = countryModel.returnAllCountries();
  res.status(200).json(countries);
};
