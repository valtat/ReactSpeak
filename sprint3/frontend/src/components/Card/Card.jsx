import { useEffect, useState } from "react";
import classes from "./card.module.css";

const Card = ({
  phrase,
  translations,
  correctTranslation,
  setCorrectTranslation,
  setTranslationSelected,
  progress,
  translationSelected,
  stopQuiz,
}) => {
  const [shuffledTranslations, setShuffledTranslations] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleTranslationSelected = (translation) => {
    setIsButtonDisabled(true);
    setTranslationSelected(translation);
    // increaseProgress();

    setTimeout(() => {
      setIsButtonDisabled(false); // Re-enable the button after a delay
    }, 1500);
  };

  useEffect(() => {
    setCorrectTranslation(correctTranslation);
    const shuffled = shuffleTranslations(translations);
    setShuffledTranslations(shuffled);
    console.log("Correct translation: ", correctTranslation);
  }, [translations, correctTranslation, setCorrectTranslation]);

  return (
    <div className={classes.Card}>
      <div className={classes.progressContainer}>
        <i className={`fas fa-times ${classes.close}`}
        onClick={stopQuiz}></i>
        <div className={classes.progressBar}>
          <div
            className={classes.activeProgress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <h1>Pick the right option</h1>
      <div className={classes.phrasebox}>
        <h2>{phrase}</h2>
        <div className={classes.choices}>
          {shuffledTranslations.map((translation, index) => {
            let buttonClass = "";
            if (translationSelected) {
              if (translation === translationSelected) {
                buttonClass =
                  translation === correctTranslation
                    ? classes.correct
                    : classes.incorrect;
              } else if (translation === correctTranslation) {
                buttonClass = classes.correct;
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleTranslationSelected(translation)}
                className={buttonClass}
                disabled={isButtonDisabled}
              >
                {translation}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function shuffleTranslations(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default Card;
