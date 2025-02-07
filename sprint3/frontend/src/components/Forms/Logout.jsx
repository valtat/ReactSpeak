import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

export default Logout;
