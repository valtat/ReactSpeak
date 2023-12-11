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
import Modal from "react-modal";
import userService2 from "../../services/userService2";
import { useNavigate } from "react-router-dom";
import 

Modal.setAppElement("#root");

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(
    dummyProfile.progressByLanguage[0].language
  );
  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] =
    useState(false);
  const [deleteAccountModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Navigate = useNavigate();

  const MODAL_TYPE = {
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    DELETE_ACCOUNT: "DELETE_ACCOUNT",
  };

  function openModal(modalType) {
    switch (modalType) {
      case MODAL_TYPE.CHANGE_PASSWORD:
        setChangePasswordModalIsOpen(true);
        break;
      case MODAL_TYPE.DELETE_ACCOUNT:
        setDeleteModalIsOpen(true);
        break;
      default:
        break;
    }
  }

  function closeModal(modalType) {
    switch (modalType) {
      case MODAL_TYPE.CHANGE_PASSWORD:
        setChangePasswordModalIsOpen(false);
        break;
      case MODAL_TYPE.DELETE_ACCOUNT:
        setDeleteModalIsOpen(false);
        break;
      default:
        break;
    }
  }

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (newPassword !== confirmNewPassword) {
      setErrorMessage(
        "The new password and confirm password fields do not match."
      );
      return;
    }
    userService2.changePassword(oldPassword, newPassword).then((res) => {
      if (res.status === 200) {
        closeModal(MODAL_TYPE.CHANGE_PASSWORD);
      } else {
        setErrorMessage(res.data.message);
      }
    });
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await userService2.deleteUser();
      if (res.status === 200) {
        await authService.logout();
        Navigate("/login");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
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
                <Modal
                  className="modal"
                  isOpen={changePasswordModalIsOpen}
                  onRequestClose={() => closeModal(MODAL_TYPE.CHANGE_PASSWORD)}
                >
                  <form onSubmit={handleSubmit}>
                    <h1>Change Password</h1>
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {errorMessage && <p>{errorMessage}</p>}
                    <button type="submit" className="button">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => closeModal(MODAL_TYPE.CHANGE_PASSWORD)}
                    >
                      Close
                    </button>
                  </form>
                </Modal>
                <Modal
                  className="modal"
                  isOpen={deleteAccountModalIsOpen}
                  onRequestClose={() => closeModal(MODAL_TYPE.DELETE_ACCOUNT)}
                >
                  <h1>Delete Account</h1>
                  <p>Are you sure you want to delete your account?</p>
                  <button className="button" onClick={handleDeleteAccount}>
                    Yes, delete my account
                  </button>
                  <button
                    className="button"
                    onClick={() => closeModal(MODAL_TYPE.DELETE_ACCOUNT)}
                  >
                    No, keep my account
                  </button>
                </Modal>
                <button
                  className="button"
                  onClick={() => openModal(MODAL_TYPE.CHANGE_PASSWORD)}
                >
                  Change Password
                </button>
                <button
                  className="button"
                  onClick={() => openModal(MODAL_TYPE.DELETE_ACCOUNT)}
                >
                  Delete Account
                </button>
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
