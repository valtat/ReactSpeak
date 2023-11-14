import logo from "../assets/images/ReactSpeakLogo.png";
import Navbar from "./Navbar";

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
