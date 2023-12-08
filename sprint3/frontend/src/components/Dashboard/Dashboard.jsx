import "./Dashboard.css";
import Courses from "./Courses";
import WelcomeBox from "./WelcomeBox";
import LatestResults from "./LatestResults";
import TimeSpent from "./TimeSpent";

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WelcomeBox />
      <div className="middle-section">
        <LatestResults />
        <TimeSpent />
      </div>
      <Courses />
    </div>
  );
};
