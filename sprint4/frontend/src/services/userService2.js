import axios from "axios";
const baseUrl = "api/v1/user";

// Create a new instance of axios
const axiosInstance = axios.create();

// Add an interceptor to attach the bearer token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const changePassword = async (password) => {
  const response = await axiosInstance.post(
    `${baseUrl}/change-password`,
    password
  );
  return response.data;
};

const deleteUser = async () => {
  const response = await axiosInstance.delete(`${baseUrl}/delete-user`);
  return response.data;
};

export default { changePassword, deleteUser };
