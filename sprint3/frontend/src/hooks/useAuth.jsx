import { useContext } from "react";
import { AuthDispatchContext } from "../context/AuthContext";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const login = async (userLogin) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await authService.login(userLogin);
      const access_token = response.data.access_token;
      const decodedToken = jwtDecode(access_token);
      localStorage.setItem("access_token", access_token);
      dispatch({
        type: "LOGIN",
        payload: decodedToken,
      });
    } catch (error) {
      dispatch({ type: "ERROR", error });
    }
  };

  const logout = async () => {
    localStorage.clear();
    await authService.logout();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return { login, logout };
};
