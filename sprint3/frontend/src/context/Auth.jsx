import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { set } from "react-hook-form";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLogged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const decodedToken = jwtDecode(token);
          setLogged(true);
          setUsername(decodedToken.username);
          setEmail(decodedToken.email);
          setRole(decodedToken.role);
        } else {
          setLogged(false);
          setUsername("");
          setEmail("");
          setRole("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async (user) => {
    setLoading(true);
    try {
      const response = await authService.login(user);
      if (response.status === 200) {
        const { access_token } = response.data;
        const decodedToken = jwtDecode(access_token);
        localStorage.setItem("access_token", access_token);
        setLogged(true);
        setUsername(decodedToken.username);
        setEmail(decodedToken.email);
        setRole(decodedToken.role);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLogged(false);
    setUsername("");
    setEmail("");
    setRole("");
  };

  const refreshToken = () => {
    // TO DO: Refresh token
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, login, username, email, role, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
