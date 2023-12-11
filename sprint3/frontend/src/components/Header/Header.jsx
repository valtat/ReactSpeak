import logo from "../../assets/images/logo.png";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
        <img src={logo} alt="reactSpeak logo" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
