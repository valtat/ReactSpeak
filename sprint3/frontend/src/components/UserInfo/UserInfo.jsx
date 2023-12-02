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
            <div className="column">
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faUser} className="fa-icon" />
                  <span>Username:</span>
                </div>
                <div className="info-card">
                  <span>Test</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                  <span>Email:</span>
                </div>
                <div className="info-card">
                  <span>test@gmail.com</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faCalendarDays} className="fa-icon" />
                  <span>Registration date:</span>
                </div>
                <div className="info-card">
                  <span>2.12.2023</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faClock} className="fa-icon" />
                  <span>Last login:</span>
                </div>
                <div className="info-card">
                  <span>1.12.2023 12:00</span>
                </div>
              </div>
              <div className="column">
                <button className="button">Delete Account</button>
                <button className="button">Change Password</button>
              </div>
            </div>
          </div>
          <div
            className={activeTab === 2 ? "content active-content" : "content"}
          >
            <div className="column">
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faLanguage} className="fa-icon" />
                  <span>Default Language:</span>
                </div>
                <div className="info-card">
                  <span>Finnish</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faGlobe} className="fa-icon" />
                  <span>Languages studied:</span>
                </div>
                <div className="info-card">
                  <span>FI, SWE, JP, PL, RU, IT, FR</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faChartLine} className="fa-icon" />
                  <span>Progress by language:</span>
                </div>
                <div className="info-card">
                  <span>FI: 100%</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faFlag} className="fa-icon" />
                  <span>Sentences learned:</span>
                </div>
                <div className="info-card">
                  <span>125</span>
                </div>
              </div>
            </div>
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
