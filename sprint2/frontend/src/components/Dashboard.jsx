import React from "react";

export const Dashboard = () => {
  return (
    <div className="parent-container">
      <div className="dashboard-container">
        <div className="user-info">
          <ul>
            <li>Username:</li>
            <li>Email:</li>
            <li>Languages studied:</li>
            <li>Courses completed:</li>
          </ul>
        </div>
      </div>
      <div className="courses-container">
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
        <div className="course">
          <p>Language:</p>
          <p>Progress:</p>
        </div>
      </div>
      <div>
        <div className="activity-container">
          <div>
            <p>Week 44 Activity</p>
          </div>
          <div className="inline-row">
            <ul>
              <li>Monday</li>
              <li>Tuesday</li>
              <li>Wednesday</li>
              <li>Thursday</li>
              <li>Friday</li>
              <li>Saturday</li>
              <li>Sunday</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
