import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";

const AdminDelete = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [translation, setTranslation] = useState({
    englishMeaning: "",
    language: "",
  });

  const handleChange = (e) => {
    setTranslation({
      ...translation,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Delete");

    const apiUrl = "/api/v1/delete-translation";

    try{
      const response = await fetch(apiUrl, {
        method : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(translation),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    } catch (error) {
      console.error("An error occurred while deleting the phrase", error);
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
            <select name="language" id="language" onChange = {handleChange}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="original-language">Phrase in English: </label>
            <input
              type="text"
              name="englishMeaning"
              id="englishMeaning"
              onChange = {handleChange}
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
          <p className={styles.paragraph}> All translations will be removed.</p>
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
      </div>
    </div>
  );
};

export default AdminDelete;
