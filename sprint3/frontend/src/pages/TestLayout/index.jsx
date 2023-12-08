import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AuthContext from "../../context/Auth";

const TestLayout = () => {
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged) 
      navigate("/dashboard");
    else
      navigate("/login");
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default TestLayout;
