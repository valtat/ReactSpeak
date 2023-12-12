import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import adminService from "../../services/adminService";

const AdminDelete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);

  const [translation, setTranslation] = useState({
    englishMeaning: "",
    language: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "language") {
      value = value.toLowerCase();
    }
    setTranslation({
      ...translation,
      [e.target.name]: value,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Delete");
    console.log("Translation:", translation);

    try {
      const data = await adminService.deleteTranslation(translation);
      console.log("Phrase deleted successfully:", data);
      setDeleteSuccessfull(true);
      setTimeout(() => {
        setDeleteSuccessfull(false);
        setTranslation({
          englishMeaning: "",
          language: "",
        });
      }, 2000);
    } catch (error) {
      console.error("An error occurred while deleting the phrase", error);
      setDeleteFailed(true);
      setTimeout(() => {
        setDeleteFailed(false);
      }, 2000);
    }
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Delete</h2>
      <div className={styles.tools}>
        <form action="">
          <div className={styles.formGroup}>
            <label htmlFor="language">Language: </label>
            <select name="language" id="language" onChange={handleChange}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="original-language">Phrase in English: </label>
            <input
              type="text"
              name="englishMeaning"
              id="englishMeaning"
              onChange={handleChange}
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={openModal}>
          Delete
        </button>

        {isOpen && (
          <div className={styles.modalContent}>
            <p className={styles.subtitle}>
              Are you sure you want to delete this phrase from the database?
            </p>
            <div className={styles.modalsButtons}>
              <button className={styles.adminButton} onClick={handleDelete}>
                Yes
              </button>
              <button className={styles.adminButton} onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        )}

        {deleteFailed && (
          <p className={styles.paragraph}>Phrase not deleted. Try again.</p>
        )}

        {deleteSuccessfull && (
          <p className={styles.paragraph}>
            Phrase deleted! <FontAwesomeIcon icon={faCheck} />
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDelete;
