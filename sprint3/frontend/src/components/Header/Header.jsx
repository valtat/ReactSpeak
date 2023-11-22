import logo from "../../assets/images/ReactSpeakLogo.png";
import "./Header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="reactSpeak logo" />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
