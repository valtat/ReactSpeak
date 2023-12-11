import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./CountryInformation.css";

function Language({ icon, languageName }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  return (
    <div className="language-card">
      <div onClick={handleOpenModal} className="language-link">
        <div className="language-image-container">
          <img src={icon} alt={languageName} />
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
        <button onClick={() => navigate("/study")}>Start</button>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Language;
