import Course from "./Course";

const Courses = () => {
  return (
    <div className="courses-container">
      <h2>Your courses</h2>
      <div className="courses">
        <Course language="Italian" quantity="100" />
        <Course language="Finnish" quantity="12" />
        <Course language="Polish" quantity="30" />
        <Course language="Japanise" quantity="50" />
      </div>
    </div>
  );
};

export default Courses;
