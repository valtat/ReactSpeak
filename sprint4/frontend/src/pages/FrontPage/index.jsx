import { useContext } from "react";
import { AuthStateContext } from "../../context/AuthContext";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import WelcomePage from "../WelcomePage";

const FrontPage = () => {
  const { isLogged, loading } = useContext(AuthStateContext);

  if (loading === null || loading) {
    return <span className="loader"></span>;
  }

  return <div>{isLogged ? <Dashboard /> : <WelcomePage />}</div>;
};

export default FrontPage;
