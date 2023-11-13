import Navbar from "./Navbar";
import logo from "../assets/images/ReactSpeakLogo.png";
import Button from "./Button";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="reactSpeak logo" />
      </div>
      <Navbar />
      <div className="header-buttons">
        <Button name="Log in" />
        <Button name="Register" />
      </div>
    </header>
  );
};

export default Header;
