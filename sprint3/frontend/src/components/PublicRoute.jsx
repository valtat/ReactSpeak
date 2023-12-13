import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStateContext } from "../context/AuthContext";

export default function PublicRoute() {
  console.log("PublicRoute");
  let { isLogged, loading } = useContext(AuthStateContext);

  if (loading === null || loading) {
    return <Outlet />;
  }

  return !isLogged ? <Outlet /> : <Navigate to="/" />;
}
