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

  const [message, setMessage] = useState(
    "An error occurred while adding the phrase"
  );

  //Handle change in the input fields

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sanitise input
    let processedValue = value.replace(
      /[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi,
      ""
    );

    if (name === "englishMeaning") {
      setEnglishMeaning(processedValue);
    } else if (name === "language") {
      setLanguage(processedValue);
    } else if (name === "translation") {
      setTranslation(processedValue);
    }
  };

  //Add the phrase to the database

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!englishMeaning || !language || !translation) {
      setMessage("All fields are required");
      setAddFailed(true);
      setTimeout(() => {
        setAddFailed(false);
      }, 3000);
      return;
    }

    // Create payload

    const payload = {
      englishMeaning: englishMeaning,
      translations: {
        [language.toLowerCase()]: translation,
      },
    };

    // Send payload to backend

    try {
      const data = await adminService.addOrUpdatePhrase(payload);

      // Reset form and show success message
      setAddSaved(true);
      setTimeout(() => {
        setAddSaved(false);
        setEnglishMeaning("");
        setLanguage("");
        setTranslation("");
      }, 3000);
    } catch (error) {
      console.error("An error occurred while adding the phrase", error);
      setMessage("An error occurred while adding the phrase");
      setAddFailed(true);
      setTimeout(() => {
        setAddFailed(false);
      }, 3000);
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

        {/* show this if phrase is not added */}
        {addFailed && <p className={styles.paragraph}>{message}</p>}

        {/* show this if phrase is added */}
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
