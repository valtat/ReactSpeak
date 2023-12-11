import React from "react";
import { useState } from "react";
import styles from "./Admin.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const apiUrl = "http://localhost:5000/";

const AdminAddLanguage = () => {
  const [phrase, setPhrase] = useState({
    language: "English",
    original: "",
    translation: "",
  });

  const [addSaved, setAddSaved] = useState(false);

  const handleChange = (e) => {
    setPhrase({
      ...phrase,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phrase);

    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(phrase),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    // const data = await response.json();

    // console.log(data);

    setAddSaved(true);
    setTimeout(() => {
      setAddSaved(false);
    }, 2000);

    setPhrase({
      language: "English",
      original: "",
      translation: "",
    });
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
            <label htmlFor="original-language">Phrase in English: </label>
            <input
              type="text"
              name="original"
              id="original"
              value={phrase.original}
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
        {addSaved && <p className={styles.paragraph}>Phrase added! <FontAwesomeIcon icon={faCheck} /></p> }
      </div>
    </div>
  );
};

export default AdminAddLanguage;
