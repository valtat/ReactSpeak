import classes from "./Welcome.module.css";
import { welcomeSection } from "../../data";
import Button from "../Navbar/Button";
import WelcomeSection from "./WelcomeSection";
import { useRef, useEffect } from "react";
import "animate.css";

const Welcome = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentRefs = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationClass =
              currentRefs.indexOf(entry.target) % 2 === 0
                ? "animate__fadeInLeft"
                : "animate__fadeInRight";
            entry.target.classList.add("animate__animated", animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    /*     if (currentRefs[0]) {
      currentRefs[0].style.opacity = 1;
    } */
    currentRefs.forEach((ref) => observer.observe(ref)); // Comment this out and uncomment the other two comments to skip the first section
    //currentRefs.slice(1).forEach((ref) => observer.observe(ref));
  }, []);

  return (
    <div className={classes.welcome}>
      {welcomeSection.map((section, i) => {
        return (
          <WelcomeSection
            key={section.id}
            ref={(element) => (sectionRefs.current[i] = element)}
            {...section}
          >
            {section.id === 3 && (
              <Button
                className={
                  "animate__animated animate__swing animate__infinite animate__slow"
                }
                name={"Get Started"}
              />
            )}
          </WelcomeSection>
        );
      })}
    </div>
  );
};

export default Welcome;
