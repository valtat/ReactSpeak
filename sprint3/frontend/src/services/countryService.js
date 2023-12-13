import axios from "axios";
const baseUrl = "/api/v1/countries";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUniqueLanguages = async () => {
  const response = await axios.get(`${baseUrl}/languages`);
  return response.data;
};

export default { getAllCountries, getUniqueLanguages };
