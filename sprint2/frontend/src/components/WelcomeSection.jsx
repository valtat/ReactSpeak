import React from 'react'
import classes from "../assets/css/Welcome.module.css";

const WelcomeSection = ({image, name, title, paragraph, children, className}) => {
  return (
    <section className={`${classes.section}`}>
      <div>
        <img src={image} alt={name} />
      </div>
      <div className={classes.text}>
        <h1>{title}</h1>
        <p>
          {paragraph}
        </p>
        {children} {/* Button component */}
      </div>
      </section>
  )
}

export default WelcomeSection