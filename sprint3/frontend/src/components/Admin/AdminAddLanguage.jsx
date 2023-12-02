import React from "react";

const AdminAddLanguage = () => {
  return (
    <div>
      <h2 className="subtitle">Add a new sentence</h2>
      <div className="tools">
        <form action="">
          <label htmlFor="original-language">Original: </label>
          <input type="text" name="original-language" id="original-language" />
          <label htmlFor="translation">Translation: </label>
          <input type="text" name="translation" id="translation" />
        </form>
        <button className="admin-button">Save edits</button>
      </div>
    </div>
  );
};

export default AdminAddLanguage;
