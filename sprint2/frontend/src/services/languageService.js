import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1/languages";

const getLanguage = async (language) => {
  const response = await axios.get(`${baseUrl}/${language}`);
  return response.data;
};

export default { getLanguage };
