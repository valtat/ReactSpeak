import axios from "axios";
const baseUrl = "api/v1/auth";

const refreshToken = async () => {
  const response = await axios.post(`${baseUrl}/refresh-token`);
  return response.data;
};

const verifyToken = async () => {
  const response = await axios.get(`${baseUrl}/verify-token`);
  return response;
};

export default { refreshToken, verifyToken };
