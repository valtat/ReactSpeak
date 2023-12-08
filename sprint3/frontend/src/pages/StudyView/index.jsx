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
  const [activeWord, setActiveWord] = useState(0);
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [translationSelected, setTranslationSelected] = useState("");
  const [score, setScore] = useState(0);
  const [activeSession, setActiveSession] = useState(true);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

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
    setTimeout(() => {
      if (translationSelected === correctTranslation) {
        console.log("Correct");
        setScore((s) => s + 1);
      } else {
        console.log("Incorrect");
      }
      setActiveWord((a) => a + 1);
      setTranslationSelected("");
    }, 1500);
  }, [correctTranslation, translationSelected, activeSession]);

  useEffect(() => {
    setProgress((activeWord / (useData.length - 1)) * 100);
  }, [activeWord, useData.length]);

  useEffect(() => {
    if (!activeSession && startTime) {
      const endTime = new Date();
      const durationSeconds = (endTime - startTime) / 1000;
      setDuration(durationSeconds);
    }
  }, [activeSession, startTime]);

  return (
    <div className={classes.StudyView}>
      {activeSession && (
        <Card
          {...useData[activeWord]}
          setCorrectTranslation={setCorrectTranslation}
          setTranslationSelected={setTranslationSelected}
          progress={progress}
          translationSelected={translationSelected}
        />
      )}
      <p className={classes.p}>Score: {score}</p>
      {!activeSession && (
        <div>
          <p>Duration: {duration} seconds</p>
        </div>
      )}
    </div>
  );
};

export default StudyView;
