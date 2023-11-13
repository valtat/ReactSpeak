//import Header from "./components/Header";
//import Welcome from "./components/Welcome";
//import Footer from "./components/Footer";
import Home from "./pages/Home/index.jsx";
import NoMatch from "./pages/404.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
