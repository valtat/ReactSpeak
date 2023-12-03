import React from "react";

const AdminEditLanguage = () => {
  return (
    <div>
      <h2 className="subtitle">Edit a sentence</h2>
      <div className="tools">
        <form action="">
          <div className="form-group">
            <label htmlFor="language">Language: </label>
            <select name="language" id="language">
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="original-language">Original: </label>
            <input
              type="text"
              name="original-language"
              id="original-language"
            />
          </div>
          <div className="form-group">
            <label htmlFor="translation">Translation: </label>
            <input type="text" name="translation" id="translation" />
          </div>
        </form>
        <button className="admin-button">Save edits</button>
      </div>
    </div>
  );
};

export default AdminEditLanguage;
