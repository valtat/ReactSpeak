import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faRedo,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./quizResults.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import quizService from "../../services/quizService";

const QuizResults = ({ score, duration, target, restart }) => {
  const navigate = useNavigate();
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration % 60);
  const scorePercentage = Math.round((score / target) * 100);

  useEffect(() => {
    const postData = async () => {
      const defaultLanguage = localStorage.getItem("defaultLanguage");
      const data = {
        language: defaultLanguage,
        score,
        duration,
        maxScore: 5,
        target,
      };
      console.log("DATA HERE : ", data);
      await quizService.postQuizResults(data);
    };

    postData();
  }, []);

  const handleFinishStudy = () => {
    navigate("/dashboard");
  };

  return (
    <div className={classes.quizResults}>
      <div className={classes.info}>
        <h1>Quiz Results</h1>
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="5x"
          className={classes.icon}
        />
        <h3>Good job!</h3>
        <p>You have finished the quiz.</p>
      </div>
      <div className={classes.results}>
        <section>
          <h4>Your Score</h4>
          <p>
            <span>{scorePercentage}</span>/100%
          </p>
        </section>
        <section>
          <h4>Your Points</h4>
          <p>
            <span>{score}</span>/{target}
          </p>
        </section>
        <section>
          <h4>Time spent</h4>
          <p>
            <span>{minutes}</span> min <span>{seconds}</span> sec
          </p>
        </section>
      </div>

      <div className={classes.resultsBtn}>
        <button onClick={handleFinishStudy}>
          <FontAwesomeIcon
            icon={faFlagCheckered}
            size="1x"
            className={classes.icon}
          />
        </button>
        <button onClick={restart}>
          <FontAwesomeIcon icon={faRedo} size="1x" className={classes.icon} />
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
