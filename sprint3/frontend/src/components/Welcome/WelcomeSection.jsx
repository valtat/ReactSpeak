import { forwardRef } from "react";
import classes from "./Welcome.module.css";

const WelcomeSection = forwardRef(
  ({ image, name, title, paragraph, children, className = "" }, ref) => {
    return (
      <section ref={ref} className={`${classes.section} ${className}`}>
        <div>
          <img src={image} alt={name} />
        </div>
        <div className={classes.text}>
          <h1>{title}</h1>
          <p>{paragraph}</p>
          {children} {/* Button component */}
        </div>
      </section>
    );
  }
);

WelcomeSection.displayName = "WelcomeSection";

export default WelcomeSection;
