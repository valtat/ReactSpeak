import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import quizService from "../../services/quizService";
import { useLoaderData } from "react-router-dom";
import classes from "./StudyView.module.css";
import QuizResults from "../../components/Card/QuizResults";

export const loader = async () => {
  const defaultLanguage = localStorage.getItem("defaultLanguage");
  const languageData = await quizService.getNewQuiz(
    5,
    defaultLanguage.toLowerCase()
  );
  console.log("LANGUAGE DATA" + languageData);
  return { languageData };
};

const StudyView = () => {
  const { languageData } = useLoaderData();
  const useData = languageData.translations;

  const [activeWord, setActiveWord] = useState(0);
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [translationSelected, setTranslationSelected] = useState("");
  const [score, setScore] = useState(0);
  const [activeSession, setActiveSession] = useState(true);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (activeSession) {
      setStartTime(Date.now());
    }
  }, [activeSession]);

  useEffect(() => {
    if (activeWord > useData.length - 1) {
      const endTime = new Date();
      const durationSeconds = (endTime - startTime) / 1000;
      setDuration(durationSeconds);
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
    const timeoutId = setTimeout(() => {
      if (translationSelected === correctTranslation) {
        console.log("Correct");
        setScore((s) => s + 1);
      } else {
        console.log("Incorrect");
      }
      setActiveWord((a) => a + 1);
      setTranslationSelected("");
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [correctTranslation, translationSelected, activeSession]);

  useEffect(() => {
    if (!activeSession && startTime) {
      const endTime = new Date();
      const durationSeconds = (endTime - startTime) / 1000;
      setDuration(durationSeconds);
    }
  }, [activeSession, startTime]);

  useEffect(() => {
    const newProgress = (activeWord / useData.length) * 100;
    setProgress(newProgress);
  }, [activeWord, useData.length]);

  const resetQuiz = () => {
    setActiveWord(0);
    setCorrectTranslation("");
    setTranslationSelected("");
    setScore(0);
    setActiveSession(true);
    setProgress(0);
    setStartTime(new Date());
    setDuration(null);
    //updateQuizResults();
  };

  const stopQuiz = () => {
    setActiveSession(false);
    //updateQuizResults();
  };

  return (
    <div className={classes.StudyView}>
      {activeSession && (
        <>
          <Card
            {...useData[activeWord]}
            setCorrectTranslation={setCorrectTranslation}
            setTranslationSelected={setTranslationSelected}
            progress={progress}
            translationSelected={translationSelected}
            stopQuiz={stopQuiz}
          />
          <p className={classes.p}>Score: {score}</p>
        </>
      )}

      {!activeSession && (
        <QuizResults
          score={score}
          duration={duration}
          target={useData.length}
          restart={resetQuiz}
        />
      )}
    </div>
  );
};

export default StudyView;
