import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import languageService from "../../services/languageService";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const languageData = await languageService.getLanguage("vietnamese");
  return { languageData };
};

const StudyView = () => {
  const { languageData } = useLoaderData();
  const useData = languageData.data.languages;
  const [activeWord, setActiveWord] = useState(0);
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [translationSelected, setTranslationSelected] = useState("");

  useEffect(() => {
    if (correctTranslation === "") {
      return;
    }
    if (translationSelected === correctTranslation) {
      console.log("Correct");
      setActiveWord(activeWord + 1);
    } else {
      console.log("Incorrect");
    }
  }, [correctTranslation, translationSelected]);

  return (
    <div>
      <Card
        {...useData[activeWord]}
        setCorrectTranslation={setCorrectTranslation}
        setTranslationSelected={setTranslationSelected}
      />
    </div>
  );
};

export default StudyView;
