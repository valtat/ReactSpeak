import React from "react";
import { useState } from "react";
import styles from "./Admin.module.css";

const apiUrl = "http://localhost:5000/";

const AdminAddLanguage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sentence);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentence),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const data = await response.json();

    console.log(data);

    setSentence({
      language: "English",
      original: "",
      translation: "",
    });
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Add a new sentence</h2>
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
            <label htmlFor="translation">Translation: </label>
            <input
              type="text"
              name="translation"
              id="translation"
              value={sentence.translation}
              onChange={handleChange}
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={handleSubmit}>
          Add sentence
        </button>
      </div>
    </div>
  );
};

export default AdminAddLanguage;
