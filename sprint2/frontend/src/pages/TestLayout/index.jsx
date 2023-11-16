import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import { useState } from "react";

const TestLayout = () => {
  const [user, setUser] = useState(null);
  const handleLogin = () => setUser({ id: "1", name: "robin" });
  const handleLogout = () => setUser(null);

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
