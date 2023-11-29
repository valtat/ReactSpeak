import axios from "axios";

const authInstance = axios.create({
  baseURL: "api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const response = await authInstance.post("/refresh-token");
    console.log("REfresh token from axiosInstance: ", response.data.access_token);

    return response.data.access_token;
  } catch (error) {
    console.log("Failed to REFRESH", error);
    throw error;
  }
};

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log('Interceptor error:', error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('401 status code detected, attempting to refresh token...');
      originalRequest._retry = true;
      const access_token = await refreshToken();
      
      console.log("Token refreshed:", access_token);
      localStorage.setItem("access_token", access_token);
      authInstance.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
      return authInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { authInstance, refreshToken };
