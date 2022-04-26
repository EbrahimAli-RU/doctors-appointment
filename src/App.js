import "./assets/sass/main.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
