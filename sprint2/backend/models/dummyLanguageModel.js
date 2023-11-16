const { words } = require("../dummyData/dummyLanguageData");

exports.getLanguageData = (country) => {
  return words[country];
};
