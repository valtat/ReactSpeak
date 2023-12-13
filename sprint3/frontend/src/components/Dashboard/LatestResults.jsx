import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import quizService from "../../services/quizService";
import "bootstrap/dist/css/bootstrap.css";

export const LatestResults = () => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        console.log("Fetching quiz results");
        const res = await quizService.getLatestQuizResults();
        console.log("Quiz results: ", res);
        if (res && res.data) {
          setQuizResults(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizResults();
  }, []);

  return (
    <div className="latest-results-container">
      <div className="latest-results-column">
        <div className="latest-results-row">
          <div className="latest-results-small-container">
            <h2>Latest Quiz Results</h2>
          </div>
        </div>
        {quizResults.length === 0 ? (
          <div>No data yet</div>
        ) : (
          quizResults.map((quiz, index) => {
            const percentage = (quiz.score / quiz.maxScore) * 100;
            let variant;
            if (percentage > 90) {
              variant = "success";
            } else if (percentage >= 30) {
              variant = "primary";
            } else {
              variant = "danger";
            }
            return (
              <div className="latest-results-row" key={index}>
                <div className="latest-results-small-container">
                  <p>{quiz.language}</p>
                </div>
                <div className="latest-results-small-container">
                  <ProgressBar
                    now={percentage}
                    label={`${Math.round(percentage)}%`}
                    variant={variant}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LatestResults;
