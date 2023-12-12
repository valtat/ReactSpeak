import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import adminService from "../../services/adminService";

const AdminEditLanguage = () => {
  const [editSaved, setEditSaved] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [language, setLanguage] = useState("");
  const [translation, setTranslation] = useState("");
  const [newTranslation, setNewTranslation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "englishMeaning") {
      setEnglishMeaning(value);
    } else if (name === "language") {
      setLanguage(value);
    } else if (name === "newTranslation") {
      setNewTranslation(value);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search");

    try {
      const data = await adminService.getTranslationInLanguage(
        englishMeaning,
        language.toLowerCase()
      );

      console.log("Phrase found:", data);
      setTranslation(data[englishMeaning]);
      setIsFound(true);
    } catch (error) {
      console.error("An error occurred while searching for the phrase", error);
    }
    setSearchPerformed(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Edit");

    const payload = {
      englishMeaning: englishMeaning,
      translations: {
        [language.toLowerCase()]: newTranslation,
      },
    };

    try {
      const data = await adminService.addOrUpdatePhrase(payload);
      // Handle the response data as needed
      console.log("Phrase edited successfully:", data);
    } catch (error) {
      console.error("An error occurred while editing the phrase", error);
    }
    setEditSaved(true);
    setIsFound(false);
    setSearchPerformed(false);
    setTimeout(() => {
      setEditSaved(false);
      setEnglishMeaning("");
      setLanguage("");
      setTranslation("");
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
              value={language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Finnish">Finnish</option>
              <option value="Swedish">Swedish</option>
            </select>
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
                {translation}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newTranslation">New translation: </label>
              <input
                type="text"
                name="newTranslation"
                id="newTranslation"
                value={newTranslation}
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
