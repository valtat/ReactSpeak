import axios from "axios";
const baseUrl = "http://localhost:3012/api/v1/admin";

const deletePhrase = async (englishMeaning) => {
  const response = await axios.delete(baseUrl, { data: { englishMeaning } });
  return response.data;
};

const deleteTranslation = async (payload) => {
  console.log(payload);
  try {
    const response = await axios.patch(
      baseUrl + "/delete-translation",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting translation:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
};

const addOrUpdatePhrase = async (payload) => {
  try {
    const response = await axios.post(
      baseUrl + "/add-or-update-phrase",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error adding phrase:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
};

const getTranslationInLanguage = async (englishMeaning, language) => {
  const response = await axios.get(baseUrl + "/get-translation", {
    params: {
      englishMeaning: englishMeaning,
      language: language,
    },
  });
  return response.data;
};

export default {
  deletePhrase,
  deleteTranslation,
  addOrUpdatePhrase,
  getTranslationInLanguage,
};
