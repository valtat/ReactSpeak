import React from "react";
import styles from "./Admin.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import adminService from "../../services/adminService";
import countryService from "../../services/countryService";

const AdminEditLanguage = () => {
  const [editSaved, setEditSaved] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [language, setLanguage] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [translation, setTranslation] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [message, setMessage] = useState(
    "An error occurred while adding the phrase"
  );
  const [editClicked, setEditClicked] = useState(false);

  // Get list of languages

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const data = await countryService.getUniqueLanguages();
        setLanguagesList(data);
      } catch (error) {
        console.error("An error occurred while fetching languages", error);
      }
    };
    getLanguages();
  }, []);

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
    } else if (name === "newTranslation") {
      setNewTranslation(processedValue);
    }
  };

  //Search for the phrase in the database

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search");

    // Validate input
    if (!englishMeaning || !language) {
      console.error("All fields are required");
      setMessage("All fields are required");

      setSearchPerformed(true);
      setTimeout(() => {
        setSearchPerformed(false);
      }, 3000);
      return;
    }

    //Search for the phrase

    try {
      const data = await adminService.getTranslationInLanguage(
        englishMeaning,
        language.toLowerCase()
      );
      setTranslation(data[englishMeaning]);
      setIsFound(true);
    } catch (error) {
      console.error("An error occurred while searching for the phrase", error);
      if (error.response.status === 404) {
        setMessage("Phrase not found");
      } else setMessage("An error occurred while searching for the phrase");
      setSearchPerformed(true);
      setTimeout(() => {
        setSearchPerformed(false);
      }, 3000);
    }
    setSearchPerformed(true);
  };

  // Edit the phrase in the database

  const handleEdit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!englishMeaning || !language || !newTranslation) {
      setMessage("All fields are required");
      setEditClicked(true);
      setEditSaved(false);
      setTimeout(() => {
        setEditSaved(false);
        setEditClicked(false);
      }, 3000);
      return;
    }

    // Create payload

    const payload = {
      englishMeaning: englishMeaning,
      translations: {
        [language.toLowerCase()]: newTranslation,
      },
    };

    // Send payload to backend
    try {
      const data = await adminService.addOrUpdatePhrase(payload);

      console.log("Phrase edited successfully:", data);
    } catch (error) {
      console.error("An error occurred while editing the phrase", error);
      setMessage("An error occurred while editing the phrase");
      setEditClicked(true);
      setEditSaved(false);
      setTimeout(() => {
        setEditSaved(false);
        setEditClicked(false);
      }, 3000);
    }
    setEditSaved(true);
    setIsFound(false);
    setSearchPerformed(false);
    setTimeout(() => {
      setEditSaved(false);
      setEnglishMeaning("");
      setLanguage("");
      setTranslation("");
      setNewTranslation("");
      setEditClicked(false);
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
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              {languagesList.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
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
          <p className={styles.paragraph}>{message}</p>
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

        {/* show this if edits are saved */}
        {editSaved && (
          <p className={styles.paragraph}>
            Edits saved! <FontAwesomeIcon icon={faCheck} />
          </p>
        )}

        {/* show this if edit is unsuccessfull*/}

        {searchPerformed && !editSaved && editClicked && (
          <p className={styles.paragraph}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default AdminEditLanguage;
