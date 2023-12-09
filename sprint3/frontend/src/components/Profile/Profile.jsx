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
import "./Profile.css";
import { dummyProfile } from "../../../../backend/dummyData/dummyProfile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(
    dummyProfile.progressByLanguage[0].language
  );

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
                  <span>{dummyProfile.username}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                  <span>Email:</span>
                </div>
                <div className="info-card">
                  <span>{dummyProfile.email}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faCalendarDays} className="fa-icon" />
                  <span>Registration date:</span>
                </div>
                <div className="info-card">
                  <span>{dummyProfile.registrationDate}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faClock} className="fa-icon" />
                  <span>Last login:</span>
                </div>
                <div className="info-card">
                  <span>{dummyProfile.lastLogin}</span>
                </div>
              </div>
              <div className="column">
                <button className="button">Change Password</button>
                <button className="button">Delete Account</button>
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
                  <span>{dummyProfile.defaultLanguage}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faGlobe} className="fa-icon" />
                  <span>Languages studied:</span>
                </div>
                <div className="info-card">
                  <span>{dummyProfile.languagesStudied}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faChartLine} className="fa-icon" />
                  <span>Progress by language:</span>
                </div>
                <div className="info-card">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {dummyProfile.languagesStudied[0]
                      .split(", ")
                      .map((language, index) => (
                        <option key={index} value={language}>
                          {language}
                        </option>
                      ))}
                  </select>
                  <span>
                    Progress:
                    {dummyProfile.progressByLanguage.find(
                      (lang) => lang.language === selectedLanguage
                    )?.progress || 0}
                    %
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faFlag} className="fa-icon" />
                  <span>Sentences learned:</span>
                </div>
                <div className="info-card">
                  <span>{dummyProfile.sentencesLearned}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={activeTab === 3 ? "content active-content" : "content"}
          >
            <div className="column">
              <div className="info-card">
                <FontAwesomeIcon icon={faComments} className="fa-icon" />
                <span>Profile comments:</span>
              </div>
              <div className="info-card">
                {dummyProfile.profileComments.map((comment, index) => (
                  <div key={index}>
                    <p>
                      {comment.username} at {comment.time} said:
                    </p>
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
