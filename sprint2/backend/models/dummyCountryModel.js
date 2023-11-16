const {
  dummyCountries,
  countryPageCountries,
} = require("../dummyData/dummyCountryData");

exports.returnSingleCountry = (country) => {
  return dummyCountries.find((c) => c.name === country);
};

exports.returnAllCountries = () => {
  return countryPageCountries;
};
