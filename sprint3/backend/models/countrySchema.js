const mongoose = require("mongoose");
const languageSchema = require("./languageSchema");

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    languages: [languageSchema],
    description: {
        type: String,
        required: true,
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
    map: {
        type: String,
        required: true,
    },
    });

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;