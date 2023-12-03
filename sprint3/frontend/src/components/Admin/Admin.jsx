import React from "react";
import "./Admin.css";
import AdminAddLanguage from "./AdminAddLanguage.jsx";
import AdminEditLanguage from "./AdminEditLanguage.jsx";
import AdminDelete from "./AdminDelete.jsx";

const Admin = () => {
  return (
    <div className="parent-container">
      <h1 className="title"> Admin page </h1>
      <div className="admin-container">
        <div className="options-container">
          <h2 className="subtitle">Options</h2>
          <div className="selection-box">
            <button className="admin-button"> Add</button>
            <button className="admin-button"> Edit </button>
            <button className="admin-button"> Delete </button>
          </div>
        </div>
        <div className="tools-container">
          <AdminAddLanguage />
          <AdminEditLanguage />
          <AdminDelete />
        </div>
      </div>
    </div>
  );
};

export default Admin;
