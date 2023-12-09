import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  let { isLogged, loading } = useContext(AuthContext);

  if (loading) {
    return <Outlet />;
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
