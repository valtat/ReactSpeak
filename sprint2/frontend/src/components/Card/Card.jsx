import { useEffect } from "react";

const Card = ({
  phrase,
  translations,
  correctTranslation,
  setCorrectTranslation,
  setTranslationSelected,
}) => {
  const handleTranslationSelected = (translation) => {
    setTranslationSelected(translation);
  };

  useEffect(() => {
    setCorrectTranslation(correctTranslation);
    console.log("Correct translation: ", correctTranslation);
  });

  return (
    <div>
      <h1 className="styles.h1">{phrase}</h1>
      {translations.map((translation, index) => (
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
export default Card;
