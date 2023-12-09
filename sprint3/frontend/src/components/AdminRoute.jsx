import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStateContext } from "../context/AuthContext";

export default function AdminRoute() {
  let { isLogged, role, loading } = useContext(AuthStateContext);

  const isAdmin = role === "admin";

  if (loading) {
    return <span className="loader"></span>;
  }

  return isLogged && isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
