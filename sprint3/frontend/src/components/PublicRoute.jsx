import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStateContext } from "../context/AuthContext";

export default function PublicRoute() {
  console.log("PublicRoute");
  let { isLogged, loading } = useContext(AuthStateContext);

  return (
    <>
      {(loading === null || loading) && <div className="loading-overlay"></div>}
      <Outlet />
      {isLogged && <Navigate to="/dashboard" replace />}
    </>
  );
}
