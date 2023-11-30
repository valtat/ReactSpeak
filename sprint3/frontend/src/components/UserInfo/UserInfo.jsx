import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faLanguage,
  faChartLine,
  faCalendarDays,
  faGlobe,
  faClock,
  faComments,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./UserInfo.css";

const UserInfo = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="parent-container">
      <div className="user-info-container">
        <div className="tabs-container">
          <div
            className={activeTab === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Basic Info
          </div>
          <div
            className={activeTab === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Language Info
          </div>
          <div
            className={activeTab === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Comments
          </div>
        </div>
        <div className="content-container">
          <div
            className={activeTab === 1 ? "content active-content" : "content"}
          >
            <ul>
              <li>
                <FontAwesomeIcon icon={faUser} className="fa-icon" />
                <span>Username:</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                <span>Email:</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarDays} className="fa-icon" />
                <span>Registration date:</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} className="fa-icon" />
                <span>Last login:</span>
              </li>
            </ul>
          </div>
          <div
            className={activeTab === 2 ? "content active-content" : "content"}
          >
            <ul>
              <li>
                <FontAwesomeIcon icon={faLanguage} className="fa-icon" />
                <span>Default Language:</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faGlobe} className="fa-icon" />
                <span>Languages studied:</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faChartLine} className="fa-icon" />
                <span>Progress by language:</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faFlag} className="fa-icon" />
                <span>Sentences learned:</span>
              </li>
            </ul>
          </div>

          <div
            className={activeTab === 3 ? "content active-content" : "content"}
          >
            <ul>
              <li>
                <FontAwesomeIcon icon={faComments} className="fa-icon" />
                <span>Profile comments:</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
