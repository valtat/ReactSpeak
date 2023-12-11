import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";

const AdminDelete = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Delete");

    // const response = await fetch(apiUrl, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(sentence),
    // });
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const handleModal = () => {
  //   const modal = document.querySelector(".modal");
  //   modal.style.display = "block";

  //   window.onclick = function (event) {
  //     if (event.target === modal) {
  //       modal.style.display = "none";
  //     }
  //   };

  //   const span = document.querySelector(".close");
  //   span.onclick = function () {
  //     modal.style.display = "none";
  //   };
  // };

  return (
    <div>
      <h2 className={styles.subtitle}>Delete</h2>
      <div className={styles.tools}>
        <form action="">
          <div className={styles.formGroup}>
            <label htmlFor="language">Language: </label>
            <select name="language" id="language">
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="original-language">Phrase in English: </label>
            <input
              type="text"
              name="original-language"
              id="original-language"
            />
          </div>
        </form>
        <button className={styles.adminButton} onClick={openModal}>
          Delete
        </button>

        {isOpen && (
          <div className={styles.modalContent}>
          <p className={styles.subtitle}>
            Are you sure you want to delete this phrase from the database?
          </p>
          <p className={styles.paragraph}> All translations will be removed.</p>
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
      </div>
    </div>
  );
};

export default AdminDelete;
