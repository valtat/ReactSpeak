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
  const [score, setScore] = useState(0);
  const [activeSession, setActiveSession] = useState(true);

  useEffect(() => {
    if (activeWord >= useData.length - 1) {
      setActiveSession(false);
    }
  }, [activeWord, useData.length]);

  useEffect(() => {
    if (
      correctTranslation === "" ||
      translationSelected === "" ||
      !activeSession
    ) {
      return;
    }
    if (translationSelected === correctTranslation) {
      console.log("Correct");
      setScore((s) => s + 1);
    } else {
      console.log("Incorrect");
    }
    setActiveWord((a) => a + 1);
    setTranslationSelected("");
  }, [correctTranslation, translationSelected, activeSession]);

  return (
    <div>
      {activeSession && (
        <Card
          {...useData[activeWord]}
          setCorrectTranslation={setCorrectTranslation}
          setTranslationSelected={setTranslationSelected}
        />
      )}
      <p>Score: {score}</p>
    </div>
  );
};

export default StudyView;
