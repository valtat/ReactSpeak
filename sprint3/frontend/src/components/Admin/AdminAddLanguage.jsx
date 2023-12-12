import React from "react";
import { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import adminService from "../../services/adminService";

const AdminAddLanguage = () => {
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [language, setLanguage] = useState("");
  const [translation, setTranslation] = useState("");

  const [addSaved, setAddSaved] = useState(false);
  const [addFailed, setAddFailed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "englishMeaning") {
      setEnglishMeaning(value);
    } else if (name === "language") {
      setLanguage(value);
    } else if (name === "translation") {
      setTranslation(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      englishMeaning: englishMeaning,
      translations: {
        [language.toLowerCase()]: translation,
      },
    };

    console.log("Payload:", payload);

    try {
      const data = await adminService.addOrUpdatePhrase(payload);
      // Handle the response data as needed
      console.log("Phrase added successfully:", data);

      // Reset form and show success message
      setAddSaved(true);
      setTimeout(() => {
        setAddSaved(false);
        setEnglishMeaning("");
        setLanguage("");
        setTranslation("");
      }, 2000);
    } catch (error) {
      console.error("An error occurred while adding the phrase", error);
      setAddFailed(true);
      setTimeout(() => {
        setAddFailed(false);
      }, 2000);
    }
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Add a new phrase</h2>
      <div className={styles.tools}>
        <form action="">
          <div className={styles.formGroup}>
            <label htmlFor="language">Language: </label>
            <input
              type="text"
              name="language"
              id="language"
              value={language}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="englishMeaning-language">Phrase in English: </label>
            <input
              type="text"
              name="englishMeaning"
              id="englishMeaning"
              value={englishMeaning}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="translation">Translation: </label>
            <input
              type="text"
              name="translation"
              id="translation"
              value={translation}
              onChange={handleChange}
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={handleSubmit}>
          Add phrase
        </button>
        {addFailed && (
          <p className={styles.paragraph}>Phrase not added. Try again.</p>
        )}
        {addSaved && (
          <p className={styles.paragraph}>
            Phrase added! <FontAwesomeIcon icon={faCheck} />
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminAddLanguage;
