import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Course = (props) => {
    const navigate = useNavigate();
    const handleCourseClick = () => {
        navigate(`/study`);
    }
  return (
    <div className="course" onClick={handleCourseClick}>
      <FontAwesomeIcon icon={faPlane} className="fa-icon" />
      <div className="course-info">
        <p>{props.language}</p>
        <p>Progress: {props.quantity} sentences</p>
      </div>
    </div>
  );
};

export default Course;
