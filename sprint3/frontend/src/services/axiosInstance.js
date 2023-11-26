import axios from "axios";

const authInstance = axios.create({
  baseURL: "api/v1/auth",
});

authInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { authInstance };
