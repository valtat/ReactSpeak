import { authInstance as axios } from "../services/axiosInstance";

// const refreshToken = async () => {
//   const response = await axios.post("/refresh-token");
//   return response.data;
// };

const verifyToken = async () => {
  const response = await axios.get("auth/verify-token");
  return response;
};

const register = async (userRegister) => {
  console.log("register", userRegister);
  const response = await axios.post("/register", userRegister, {
    withCredentials: true,
  });
  console.log("register", response);
  return response;
};

const login = async (userLogin) => {
  const response = await axios.post("auth/login", userLogin, {
    withCredentials: true,
  });
  console.log("login", response);
  return response;
};

const logout = async () => {
  const response = await axios.post("auth/logout");
  console.log("logout", response);
  return response;
};

const createChatToken = async () => {
  const response = await axios.post("/chat-token");
  return response;
};

export default { verifyToken, login, logout, register, createChatToken };
