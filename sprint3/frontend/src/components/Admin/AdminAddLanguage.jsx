import React from "react";
import { useState } from "react";
import styles from "./Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const AdminAddLanguage = () => {
  const [phrase, setPhrase] = useState({
    language: "English",
    englishMeaning: "",
    translation: "",
  });

  const [addSaved, setAddSaved] = useState(false);
  const [addFailed, setAddFailed] = useState(false);

  const handleChange = (e) => {
    setPhrase({
      ...phrase,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:5173/api/v1/add-phrase";

    phrase.language = phrase.language.toLowerCase();

    const newPhrase = {
      englishMeaning: phrase.englishMeaning,
      translations: {
        [phrase.language]: phrase.translation,
      },
    };

    console.log(newPhrase), console.log(JSON.stringify(newPhrase));

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhrase),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status !== 204) { // 204 means No Content
        const data = await response.json();
        console.log("Success:", data);
      }

      setAddSaved(true);
      setTimeout(() => {
        setAddSaved(false);
      }, 2000);

      setPhrase({
        language: "English",
        englishMeaning: "",
        translation: "",
      });
    } catch (error) {
      console.error("An error occurred while adding the phrase", error);
      setAddFailed(true);
    }
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Add a new phrase</h2>
      <div className={styles.tools}>
        <form action="">
          <div className={styles.formGroup}>
            <label htmlFor="language">Language: </label>
            <select
              name="language"
              id="language"
              value={phrase.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="englishMeaning-language">Phrase in English: </label>
            <input
              type="text"
              name="englishMeaning"
              id="englishMeaning"
              value={phrase.englishMeaning}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="translation">Translation: </label>
            <input
              type="text"
              name="translation"
              id="translation"
              value={phrase.translation}
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
