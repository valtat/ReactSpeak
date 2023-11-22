import { useEffect, useState } from "react";

const Card = ({
  phrase,
  translations,
  correctTranslation,
  setCorrectTranslation,
  setTranslationSelected,
}) => {
  const [shuffledTranslations, setShuffledTranslations] = useState([]);

  const handleTranslationSelected = (translation) => {
    setTranslationSelected(translation);
  };

  useEffect(() => {
    setCorrectTranslation(correctTranslation);
    const shuffled = shuffleTranslations(translations);
    setShuffledTranslations(shuffled);
    console.log("Correct translation: ", correctTranslation);
  }, [translations, correctTranslation, setCorrectTranslation]);

  return (
    <div>
      <h1 className="styles.h1">{phrase}</h1>
      {shuffledTranslations.map((translation, index) => (
        <button
          key={index}
          onClick={() => handleTranslationSelected(translation)}
        >
          {translation}
        </button>
      ))}
    </div>
  );
};

function shuffleTranslations(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default Card;
