import React from "react";
import { useState } from "react";
import styles from "./Admin.module.css";
import AdminAddLanguage from "./AdminAddLanguage.jsx";
import AdminEditLanguage from "./AdminEditLanguage.jsx";
import AdminDelete from "./AdminDelete.jsx";

const Admin = () => {
  const [activeMode, setActiveMode] = useState("add");

  const toggleMode = (mode) => {
    setActiveMode(mode);
  };

  return (
    <div className={styles.parentContainer}>
      <h1 className={styles.title}> Admin page </h1>
      <div className={styles.adminContainer}>
        <div className={styles.optionsContainer}>
          <h2 className={styles.subtitle}>Options</h2>
          <div className={styles.selectionBox}>
            <button
              className={styles.adminButton}
              name="add"
              onClick={() => toggleMode("add")}
            >
              Add
            </button>
            <button
              className={styles.adminButton}
              name="edit"
              onClick={() => toggleMode("edit")}
            >
              Edit
            </button>
            <button
              className={styles.adminButton}
              name="delete"
              onClick={() => toggleMode("delete")}
            >
              Delete
            </button>
          </div>
        </div>
        <div className={styles.toolsContainer}>
          {activeMode === "add" && <AdminAddLanguage />}
          {activeMode === "edit" && <AdminEditLanguage />}
          {activeMode === "delete" && <AdminDelete />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
