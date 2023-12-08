import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth";

export default function AdminRoute() {
  let { isLogged, role, loading } = useContext(AuthContext);

  const isAdmin = role === "admin";

  if (loading) {
    return <Outlet />;
  }

  return isLogged && isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
