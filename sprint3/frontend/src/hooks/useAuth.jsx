import { useReducer, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (userLogin) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await authService.login(userLogin);
      const access_token = response.data.access_token;
      const decodedToken = jwtDecode(access_token);
      localStorage.setItem("access_token", access_token);
      dispatch({
        type: "LOGIN",
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    } catch (error) {
      dispatch({ type: "ERROR", error: response.error });
    } finally {
      dispatch({ type: "DONE_LOADING" });
    }
  };

  const logout = async () => {
    localStorage.clear();
    await authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  return { state, login, logout };
};
