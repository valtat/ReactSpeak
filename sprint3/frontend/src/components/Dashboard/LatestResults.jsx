import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const quizResults = [
  { language: "Italian", result: 20 },
  { language: "French", result: 70 },
  { language: "Japanese", result: 80 },
  { language: "Polish", result: 95 },
];

export const LatestResults = () => {
  return (
    <div className="latest-results-container">
      <div className="column">
        <div className="row">
          <div className="latest-results-small-container">
            <h2>Latest Quiz Results</h2>
          </div>
        </div>
        {quizResults.map((quiz, index) => {
          let variant;
          if (quiz.result > 90) {
            variant = "success";
          } else if (quiz.result >= 30) {
            variant = "primary";
          } else {
            variant = "danger";
          }
          return (
            <div className="row" key={index}>
              <div className="latest-results-small-small-container">
                <h4>{quiz.language}</h4>
              </div>
              <div className="latest-results-small-small-container">
                <ProgressBar
                  now={quiz.result}
                  label={`${quiz.result}%`}
                  variant={variant}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestResults;
