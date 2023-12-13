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
import { useState, useEffect } from "react";
import "./Profile.css";
import { dummyProfile } from "../../../../backend/dummyData/dummyProfile";
import Modal from "react-modal";
import userService2 from "../../services/userService2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

Modal.setAppElement("#root");

const Profile = () => {
  console.log("Profile component rendered");
  const [activeTab, setActiveTab] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] =
    useState(false);
  const [deleteAccountModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("/api/v1/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
        setSelectedLanguage(res.data.defaultLanguage);

        const userRes = await axios.get("/api/v1/user/", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const getLanguageOptions = () => {
    return (
      profile?.languagesStudied.map((language, index) => (
        <option key={index} value={language}>
          {language}
        </option>
      )) || []
    );
  };

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

  function handleDeleteAccount(e) {
    e.preventDefault();
    userService2.deleteUser().then((res) => {
      if (res.status === 200) {
        Navigate("/login");
      } else {
        setErrorMessage(res.data.message);
      }
    });
  }

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
          {/* <div
            className={activeTab === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Comments
          </div> */}
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
                  <span>{user ? user.username : "Loading..."}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                  <span>Email:</span>
                </div>
                <div className="info-card">
                  <span>{user ? user.email : "Loading..."}</span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faCalendarDays} className="fa-icon" />
                  <span>Registration date:</span>
                </div>
                <div className="info-card">
                  <span>
                    {profile
                      ? new Date(profile.registrationDate).toLocaleDateString(
                          "en-GB"
                        )
                      : "Loading..."}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faClock} className="fa-icon" />
                  <span>Last login:</span>
                </div>
                <div className="info-card">
                  <span>
                    {profile
                      ? new Date(profile.lastLogin).toLocaleDateString("en-GB")
                      : "Loading..."}
                  </span>
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
                  <span>
                    {profile ? profile.defaultLanguage : "Loading..."}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faGlobe} className="fa-icon" />
                  <span>Languages studied:</span>
                </div>
                <div className="info-card">
                  <span>
                    {profile
                      ? profile.languagesStudied.join(", ")
                      : "Loading..."}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faChartLine} className="fa-icon" />
                  <span>Progress by language:</span>
                </div>
                <div className="info-card">
                  <select
                    className="profile-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {getLanguageOptions()}
                  </select>
                  <span>
                    Progress:{" "}
                    {profile?.progressByLanguage[selectedLanguage] || 0}{" "}
                    sentences
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="info-card">
                  <FontAwesomeIcon icon={faFlag} className="fa-icon" />
                  <span>Sentences learned:</span>
                </div>
                <div className="info-card">
                  <span>
                    {profile ? profile.sentencesLearned : "Loading..."}
                  </span>
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
