const languageData = require("../models/dummyLanguageModel");

exports.getLanguage = (req, res) => {
  console.log(req.params.language);
  const languages = languageData.getLanguageData(req.params.language);
  if (languages) {
    res.status(200).json({
      status: "success",
      data: {
        languages,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Language not found",
    });
  }
};
