import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1/countries";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAllCountries };
