import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const AdminEditLanguage = () => {
  const [phrase, setPhrase] = useState({
    language: "English",
    original: "",
    translation: "",
  });

  const [editSaved, setEditSaved] = useState(false);

  const handleChange = (e) => {
    setPhrase({
      ...phrase,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Edit");
    console.log(phrase);

    // const response = await fetch(apiUrl, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(phrase),
    // });

    setEditSaved(true);
    setTimeout(() => {
      setEditSaved(false);
    }, 2000);
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Edit a phrase</h2>
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
            <label htmlFor="current-translation">Current translation: </label>
            <div name="current-translation" id="current-translation" className={styles.paragraph}>
              This is the current translation
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="translation">New translation: </label>
            <input
              type="text"
              name="translation"
              id="translation"
              value={phrase.translation}
              onChange={handleChange}
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={handleEdit}>
          Save edits
        </button>
        {editSaved && <p className={styles.paragraph}>Edits saved! <FontAwesomeIcon icon={faCheck} /></p> }
      </div>
    </div>
  );
};

export default AdminEditLanguage;
