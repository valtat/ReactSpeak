import Navbar from "./Navbar";
import logo from "../assets/images/reactSpeakLogo.png";
import Button from "./Button";

const Header = () => {
  return (
    <header className="header">
      <img
        src={logo}
        alt="reactSpeak logo"
        className="header-logo"
      />
      <Navbar />
      <div className="header-buttons">
        <Button name="Log in" />
        <Button name="Register" />
      </div>
    </header>
  );
};

export default Header;
