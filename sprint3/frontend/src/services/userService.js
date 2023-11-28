import axios from "axios";
const baseUrl = "api/v1/auth";

const register = async (newUser) => {
  const response = await axios.post(`${baseUrl}/register`, newUser);
  return response.data;
};

const login = async (userLogin) => {
  const response = await axios.post(`${baseUrl}/login`, userLogin, {
    withCredentials: true,
  });
  return response;
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
