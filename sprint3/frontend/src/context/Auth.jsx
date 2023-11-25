import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

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
        const response = await authService.verifyToken();
        if (response.status === 200) {
          setLogged(true);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setRole(response.data.role);
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

  const login = (user) => {
    setLogged(true);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
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
