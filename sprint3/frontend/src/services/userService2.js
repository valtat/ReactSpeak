import axios from "axios";
const baseUrl = "api/v1/user";

const changePassword = async (password) => {
  const response = await axios.post(`${baseUrl}/change-password`, password);
  return response.data;
};

const deleteUser = async () => {
  const response = await axios.delete(`${baseUrl}/delete-user`);
  return response.data;
};

export default { changePassword, deleteUser };
