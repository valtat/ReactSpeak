import React from "react";
import styles from "./Admin.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import adminService from "../../services/adminService";
import countryService from "../../services/countryService";

const AdminDelete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [language, setLanguage] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [message, setMessage] = useState(
    "An error occurred while deleting the phrase"
  );

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
    let { name, value } = e.target;
    // Sanitise input
    let processedValue = value.replace(
      /[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi,
      ""
    );

    if (name === "englishMeaning") {
      setEnglishMeaning(processedValue);
    }
    if (name === "language") {
      setLanguage(processedValue);
    }
  };

  //Delete the phrase from the database

  const handleDelete = async (e) => {
    e.preventDefault();

    // Validate input
    if (!englishMeaning || !language) {
      console.error("All fields are required");
      setDeleteFailed(true);
      closeModal();
      setMessage("All fields are required");
      setTimeout(() => {
        setDeleteFailed(false);
      }, 3000);
      return;
    }

    // Create payload

    const payload = {
      englishMeaning,
      language: language.toLowerCase(),
    };

    // Delete the phrase

    try {
      const data = await adminService.deleteTranslation(payload);
      console.log("Phrase deleted successfully:", data);
      setDeleteSuccessfull(true);
    } catch (error) {
      console.error("An error occurred while deleting the phrase", error);
      if (error.response.status === 404) {
        setMessage("Phrase not found");
      } else setMessage("An error occurred while deleting the phrase");
      setDeleteFailed(true);
      setTimeout(() => {
        setDeleteFailed(false);
        setEnglishMeaning("");
        setLanguage("");
      }, 2000);
    }
    setEnglishMeaning("");
    setLanguage("");
    setTimeout(() => {
      setDeleteSuccessfull(false);
    }, 3000);
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Delete</h2>
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
            <label htmlFor="original-language">Phrase in English: </label>
            <input
              type="text"
              name="englishMeaning"
              id="englishMeaning"
              value={englishMeaning}
              onChange={handleChange}
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={openModal}>
          Delete
        </button>

        {/* Modal */}

        {isOpen && (
          <div className={styles.modalContent}>
            <p className={styles.subtitle}>
              Are you sure you want to delete this phrase from the database?
            </p>
            <div className={styles.modalsButtons}>
              <button className={styles.adminButton} onClick={handleDelete}>
                Yes
              </button>
              <button className={styles.adminButton} onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        )}

        {/* show this if phrase is not found */}

        {deleteFailed && <p className={styles.paragraph}>{message}</p>}

        {/* show this if phrase is deleted */}

        {deleteSuccessfull && (
          <p className={styles.paragraph}>
            Phrase deleted! <FontAwesomeIcon icon={faCheck} />
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDelete;
