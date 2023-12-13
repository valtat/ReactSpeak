import Course from "./Course";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [hasStartedCourses, setHasStartedCourses] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("/api/v1/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const courses = res.data.languagesStudied.map((language) => ({
          language,
          progress: res.data.progressByLanguage[language],
        }));
        setCourses(courses);
        setHasStartedCourses(res.data.languagesStudied.length > 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
      <h2>Your courses</h2>
      <div className="courses">
        {!hasStartedCourses ? (
          <div>You have not started any courses yet.</div>
        ) : (
          courses.map((course, index) => (
            <Course
              key={index}
              language={course.language}
              quantity={course.progress}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
