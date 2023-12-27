import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStateContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  console.log("ProtectedRoute");
  let { isLogged, loading } = useContext(AuthStateContext);

  if (loading === null || loading) {
    return <Outlet />;
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
