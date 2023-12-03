import React from "react";

const AdminDelete = () => {
  return (
    <div>
      <h2 className="subtitle">Delete</h2>
      <div className="tools">
        <div className="form-group">
          <label htmlFor="language">Options: </label>
          <select name="language" id="language">
            <option value="English">User</option>
            <option value="Spanish">Sentence</option>
          </select>
        </div>
        <button className="admin-button">Save edits</button>
      </div>
    </div>
  );
};

export default AdminDelete;
