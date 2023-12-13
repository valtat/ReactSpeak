import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";


export const LatestResults = () => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("/api/v1/quizResults", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizResults(res.data);
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
