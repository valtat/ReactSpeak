import { authInstance as axios } from "../services/axiosInstance";

// const refreshToken = async () => {
//   const response = await axios.post("/refresh-token");
//   return response.data;
// };

const verifyToken = async () => {
  const response = await axios.get("/verify-token");
  return response;
};

const register = async (userRegister) => {
  const response = await axios.post("/register", userRegister, {
    withCredentials: true,
  });
  console.log("register", response);
  return response;
}

const login = async (userLogin) => {
  const response = await axios.post("/login", userLogin, {
    withCredentials: true,
  });
  console.log("login", response);
  return response;
};

const logout = async () => {
  const response = await axios.post("/logout");
  console.log("logout", response);
  return response;
}

export default { verifyToken, login, logout, register };
