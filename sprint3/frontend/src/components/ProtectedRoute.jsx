import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth";

export default function ProtectedRoute({ requiresAdmin = false }) {
  let { isLogged, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <Outlet />;
  }

  if (requiresAdmin && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
