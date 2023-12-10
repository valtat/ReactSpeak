import React, { useState } from "react";
import { LineChart } from "recharts";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ResponsiveContainer } from "recharts";

const data = {
  week1: [
    { name: "Monday", JP: 100, FI: 50, amt: 100 },
    { name: "Tuesday", JP: 50, FI: 25, amt: 100 },
    { name: "Wednesday", JP: 20, FI: 70, amt: 100 },
    { name: "Thursday", JP: 12, FI: 21, amt: 100 },
    { name: "Friday", JP: 45, FI: 10, amt: 100 },
    { name: "Saturday", JP: 13, FI: 100, amt: 100 },
    { name: "Sunday", JP: 100, FI: 20, amt: 100 },
  ],
  week2: [
    { name: "Monday", JP: 50, FI: 100, amt: 100 },
    { name: "Tuesday", JP: 25, FI: 50, amt: 100 },
    { name: "Wednesday", JP: 70, FI: 20, amt: 100 },
    { name: "Thursday", JP: 21, FI: 12, amt: 100 },
    { name: "Friday", JP: 10, FI: 45, amt: 100 },
    { name: "Saturday", JP: 100, FI: 13, amt: 100 },
    { name: "Sunday", JP: 20, FI: 100, amt: 100 },
  ],
  week3: [
    { name: "Monday", JP: 100, FI: 50, IT: 30, amt: 100 },
    { name: "Tuesday", JP: 50, FI: 25, IT: 60, amt: 100 },
    { name: "Wednesday", JP: 20, FI: 70, IT: 40, amt: 100 },
    { name: "Thursday", JP: 12, FI: 21, IT: 80, amt: 100 },
    { name: "Friday", JP: 45, FI: 10, IT: 50, amt: 100 },
    { name: "Saturday", JP: 13, FI: 100, IT: 70, amt: 100 },
    { name: "Sunday", JP: 100, FI: 20, IT: 90, amt: 100 },
  ],
};

function getColorByLanguage(lang) {
  const colorMap = {
    FI: "#0051ff", // Blue for Finnish flag
    SE: "#fbff00", // Yellow for Swedish flag
    RU: "#0039a6", // Blue for Russian flag
    PL: "#dc143c", // Red for Polish flag
    IT: "#009246", // Green for Italian flag
    FR: "#002395", // Blue for French flag
    JP: "#ff0000", // Red for Japanese flag
  };

  return colorMap[lang] || "#000000"; // Default to black if no match
}

export const TimeSpent = () => {
  const [selectedWeek, setSelectedWeek] = useState("week1");
  const languageKeys = Object.keys(data[selectedWeek][0]).filter(
    (key) => key !== "name" && key !== "amt"
  );
  return (
    <div className="time-spent-container">
      <div className="column">
        <div className="row">
          <div className="small-container">
            <h2>Time Spent</h2>
          </div>
          <div className="small-container">
            <div className="row">
              <p>Week</p>
              <select
                className="select"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                <option value="week1">1</option>
                <option value="week2">2</option>
                <option value="week3">3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={730}
          height={250}
          data={data[selectedWeek]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {languageKeys.map((key, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={key}
              stroke={getColorByLanguage(key)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSpent;
