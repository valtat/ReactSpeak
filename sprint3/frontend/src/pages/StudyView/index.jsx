import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import languageService from "../../services/languageService";
import { useLoaderData } from "react-router-dom";
import classes from "./StudyView.module.css";

export const loader = async () => {
  const languageData = await languageService.getLanguage("vietnamese");
  return { languageData };
};

const StudyView = () => {
  const { languageData } = useLoaderData();
  const useData = languageData.data.languages;
  console.log(useData);
  const [activeWord, setActiveWord] = useState(0);
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [translationSelected, setTranslationSelected] = useState("");
  const [score, setScore] = useState(0);
  const [activeSession, setActiveSession] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(0);

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

  useEffect(() => {
    setProgress((activeWord / (useData.length - 1)) * 100);
  }, [activeWord, useData.length]);

  useEffect(() => {
    let interval = null;
    if (activeSession) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!activeSession && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeSession, timer]);

  return (
    <div className={classes.StudyView}>
      {activeSession && (
        <Card
          {...useData[activeWord]}
          setCorrectTranslation={setCorrectTranslation}
          setTranslationSelected={setTranslationSelected}
          progress={progress}
        />
      )}
      <p>Time: {timer} seconds</p>
      <p className={classes.p}>Score: {score}</p>
    </div>
  );
};

export default StudyView;
