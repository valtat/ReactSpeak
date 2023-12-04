import "./Dashboard.css";
import Courses from "./Courses";
import WelcomeBox from "./WelcomeBox";

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WelcomeBox />
      <Courses />
    </div>
  );
};
