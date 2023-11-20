require("dotenv").config();

const baseUrl = `http://localhost:${process.env.PORT}/images/`;

exports.dummyCountries = [
  {
    name: "Sweden",
    languages: ["Swedish", "Sami"],
    description:
      "Sweden is a country in Northern Europe known for its beautiful landscapes and rich cultural heritage. Swedish is the official language, but Sami is also recognized as an official minority language.",
  },
  {
    name: "Finland",
    languages: ["Finnish", "Swedish"],
    description:
      "Finland is a country in Northern Europe known for its stunning natural beauty and vibrant cultural scene. Finnish is the official language, but Swedish is also recognized as an official minority language.",
  },
];

exports.countryPageCountries = [
  {
    id: 1,
    name: "Finland",
  },
  {
    id: 2,
    name: "France",
  },
  {
    id: 3,
    name: "Russia",
  },
  {
    id: 4,
    name: "Italy",
  },
  {
    id: 5,
    name: "Japan",
  },
  {
    id: 6,
    name: "Poland",
  },
].map((country) => ({
  ...country,
  image: `${baseUrl}${country.name.toLowerCase()}.jpg`,
}));
