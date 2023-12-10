import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";

const AdminEditLanguage = () => {
  const [sentence, setSentence] = useState({
    language: "English",
    original: "",
    translation: "",
  });

  const handleChange = (e) => {
    setSentence({
      ...sentence,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Edit");
    console.log(sentence);

    // const response = await fetch(apiUrl, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(sentence),
    // });
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Edit a sentence</h2>
      <div className={styles.tools}>
        <form action="">
          <div className={styles.formGroup}>
            <label htmlFor="language">Language: </label>
            <select
              name="language"
              id="language"
              value={sentence.language}
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
              value={sentence.original}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="current-translation">Current translation: </label>
            <div name="current-translation" id="current-translation">
              This is the current translation
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="translation">New translation: </label>
            <input
              type="text"
              name="translation"
              id="translation"
              value={sentence.translation}
              onChange={handleChange}
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={handleEdit}>
          Save edits
        </button>
      </div>
    </div>
  );
};

export default AdminEditLanguage;
