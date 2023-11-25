import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLogged, setLogged] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const login = (user) => {
    setLogged(true);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, username, email, role }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
