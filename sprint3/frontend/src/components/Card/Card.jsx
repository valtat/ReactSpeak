import { useEffect, useState } from "react";
import classes from "./Card.module.css";

const Card = ({
  phrase,
  translations,
  correctTranslation,
  setCorrectTranslation,
  setTranslationSelected,
  progress,
}) => {
  const [shuffledTranslations, setShuffledTranslations] = useState([]);



  const handleTranslationSelected = (translation) => {
    setTranslationSelected(translation);
    increaseProgress();
  };

  useEffect(() => {
    setCorrectTranslation(correctTranslation);
    const shuffled = shuffleTranslations(translations);
    setShuffledTranslations(shuffled);
    console.log("Correct translation: ", correctTranslation);
  }, [translations, correctTranslation, setCorrectTranslation]);

  return (
    <div className={classes.Card}>
       <div className={classes.progressBar}>
      <div className={classes.activeProgress} style={{ width: `${progress}%`}}></div>
    </div>
      
      <h1>Pick the right option</h1>
      <div className={classes.phrasebox}>
        <h2>{phrase}</h2>
        <div className={classes.choices}>
          {shuffledTranslations.map((translation, index) => (
            <button
              key={index}
              onClick={() => {handleTranslationSelected(translation)
              increaseProgress()}}
            >
              {translation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function shuffleTranslations(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default Card;
