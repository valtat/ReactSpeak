import classes from "./Welcome.module.css";
import { welcomeSection } from "../../data";
import Button from "../Navbar/Button";
import WelcomeSection from "./WelcomeSection";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={classes.welcome}>
      {welcomeSection.map((section) => {
        return (
          <WelcomeSection
            key={section.id}
            {...section}
            // className={section.id === 2 ? classes.reverse : ""}
          >
            {section.id === 3 && <Link to="/countries"><Button name={"Get Started"}/></Link>}
          </WelcomeSection>
        );
      })}
    </div>
  );
};

export default Welcome;
