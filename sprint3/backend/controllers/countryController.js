// const countryModel = require("../models/dummyCountryModel");
const Country = require("../models/countrySchema");

const returnSingleCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country == null) {
      return res.status(404).json({ message: "Cannot find country" });
    }
    res.json(country);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const returnAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addNewCountry = async (req, res) => {
  const country = new Country({
    name: req.body.name,
    languages: req.body.languages,
    description: req.body.description,
    map: req.body.map,
  });
  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUniqueLanguages = async (req, res) => {
  try {
    const result = await Country.aggregate([
      { $unwind: "$languages" },
      { $group: { _id: "$languages.language" } },
    ]);
    const languages = result.map((item) => item._id);
    res.status(200).json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  returnAllCountries,
  returnSingleCountry,
  addNewCountry,
  getUniqueLanguages,
};
