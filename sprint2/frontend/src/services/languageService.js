import axios from "axios";
const baseUrl = "/api/v1/languages";

const getLanguage = async (language) => {
  const response = await axios.get(`${baseUrl}/${language}`);
  return response.data;
};

export default { getLanguage };
