import { useContext } from "react";
import AuthContext from "../../context/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faLanguage,
  faFlag,
  faChartLine,
  faCalendarDays,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

export const Dashboard = () => {
  const { username, email } = useContext(AuthContext);

  return (
    <div className="parent-container">
      <div className="dashboard-container">
        <div className="user-info">
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <span>Username:</span>
              <span>{username}</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
              <span>Email:</span>
              <span>{email}</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faLanguage} className="fa-icon" />
              <span>Languages studied:</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faFlag} className="fa-icon" />
              <span>Courses completed:</span>
            </li>
          </ul>
          <button className="dashboard-button">Change password</button>
          <button className="dashboard-button">Delete Account</button>
        </div>
      </div>
      <div className="courses-container">
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
      </div>
      <div>
        <div className="activity-container">
          <div className="column">
            <p className="icon-text">
              <FontAwesomeIcon icon={faCalendarDays} className="fa-icon" />
              <span>Week 40</span>
            </p>
            <p className="icon-text">
              <FontAwesomeIcon icon={faChartLine} className="fa-icon" />
              <span>Activity</span>
            </p>
          </div>
          <div className="column">
            <div className="weekdays">
              <span>Monday</span>
              <span>Tuesday</span>
              <span>Wednesday</span>
              <span>Thursday</span>
              <span>Friday</span>
              <span>Saturday</span>
              <span>Sunday</span>
            </div>
            <div className="activities">
              <FontAwesomeIcon icon={faCheck} />
              <FontAwesomeIcon icon={faCheck} />
              <FontAwesomeIcon icon={faTimes} />
              <FontAwesomeIcon icon={faCheck} />
              <FontAwesomeIcon icon={faCheck} />
              <FontAwesomeIcon icon={faTimes} />
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
