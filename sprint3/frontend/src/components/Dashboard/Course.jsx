import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import Modal from "react-modal";
import axios from "axios";

const Course = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
          language: props.language,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //localStorage.setItem("defaultLanguage", languageName);
      navigate("/study");
    } catch (error) {
      console.error("Error:", error);
    }
  }, [props.language, navigate]);

  return (
    <div className="course" onClick={handleOpenModal}>
      <FontAwesomeIcon icon={faPlane} className="fa-icon" />
      <div className="course-info">
        <p>{props.language}</p>
        <p>Progress: {props.quantity} sentences</p>
      </div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2>Continue studying {props.language}?</h2>
        <p>
          By clicking Continue, you will be redirected to the study session.
        </p>
        <button onClick={handleStart}>Continue</button>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Course;
