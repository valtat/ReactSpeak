import React from "react";
import styles from "./Admin.module.css";

const AdminDelete = () => {

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
    
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Delete</h2>
      <div className={styles.tools}>
        <form action="">
          <div className="formGroup">
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
        <button className={styles.adminButton} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default AdminDelete;
