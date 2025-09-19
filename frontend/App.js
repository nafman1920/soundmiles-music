// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import News from "./pages/News";
import Beats from "./pages/Beats";
import AdminPanel from "./pages/AdminPanel";

// Global styles
import "./assets/styles/App.css";

// Background image (same for all pages)
import bgImage from "./assets/images/bg-main.jpeg";

const App = () => {
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className="overlay">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/beats" element={<Beats />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
