import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const AdminEditLanguage = () => {
  const [editSaved, setEditSaved] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [phrase, setPhrase] = useState({
    language: "English",
    original: "",
    translation: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search");

    // const apiUrl = `http://localhost:5173/api/get-translation/${phrase.original}/${phrase.language.toLowerCase()}`;

    // try {
    //   const response = await fetch(apiUrl);

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const data = await response.json();

    //   if (data[phrase.original]) {
    //     setPhrase((prevPhrase) => ({
    //       ...prevPhrase,
    //       translation: data[phrase.original],
    //     }));
    //     setIsFound(true);
    //   } else {
    //     setIsFound(false);
    //   }
    // } catch (error) {
    //   console.error("An error occurred while searching for the phrase", error);
    // }

    setIsFound(true);
    setSearchPerformed(true);
  };

  const handleChange = (e) => {
    setPhrase({
      ...phrase,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    // e.preventDefault();
    // console.log("Edit");
    // console.log(phrase);

    // const apiUrl = `http://localhost:5173/api/update-translation`;

    // const response = await fetch(apiUrl, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(phrase),
    // });
    
    // const data = await response.json();

    // console.log(data);

    setEditSaved(true);
    setIsFound(false);
    setSearchPerformed(false);
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
          <button className={styles.adminButton} onClick={handleSearch}>
            Search
          </button>{" "}
        </form>

        {/* show this if phrase is not found */}

        {searchPerformed && !isFound && (
          <p className={styles.paragraph}>Phrase not found. Try again.</p>
        )}

        {/* show this if phrase is found */}

        {isFound && (
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="current-translation">Current translation: </label>
              <div
                name="current-translation"
                id="current-translation"
                className={styles.paragraph}
              >
                {phrase.translation}
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
            <button className={styles.adminButton} onClick={handleEdit}>
              Save edits
            </button>
          </form>
        )}
        {editSaved && (
          <p className={styles.paragraph}>
            Edits saved! <FontAwesomeIcon icon={faCheck} />
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminEditLanguage;
