import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

function Language({ flag, languageName }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [redirectToStudy, setRedirectToStudy] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const handleStart = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "/api/v1/profile/defaultLanguage",
        {
          language: languageName,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.post(
        "/api/v1/profile/addLanguage",
        {
          language: languageName,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("defaultLanguage", languageName);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  }, [languageName]);

  return redirectToStudy ? (
    <Link to="/study">Go to Study</Link>
  ) : (
    <div className="language-card">
      <div onClick={handleOpenModal} className="language-link">
        <div className="language-image-container">
          <img src={flag} alt={languageName} />
        </div>
        <div className="language-footer">
          <h3>{languageName}</h3>
        </div>
      </div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2>Start studying {languageName}?</h2>
        <p>By clicking Start, you will be redirected to the study session.</p>
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleStart();
          }}
        >
          Start
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setModalIsOpen(false);
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Language;
