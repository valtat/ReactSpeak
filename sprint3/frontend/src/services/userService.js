import axios from "axios";
const baseUrl = "api/v1/auth";

const register = async (newUser) => {
  const response = await axios.post(`${baseUrl}/register`, newUser);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${baseUrl}/login`, {email: email, password: password}, {withCredentials: true});
  console.log("RESPONSE: ", response);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`);
  return response.data;
};

const resetPassword = async (password) => {
  const response = await axios.post(`${baseUrl}/resetPassword`, password);
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/forgot-password`, { email });
  return response.data;
};

export default { register, login, logout, resetPassword, forgotPassword };
