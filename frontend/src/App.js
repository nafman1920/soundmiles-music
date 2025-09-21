// frontend/src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import News from "./pages/News";
import Beats from "./pages/Beats";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

// Layout Components
import Header from "./pages/Header";
import Footer from "./pages/Footer";

// Global styles
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Header always visible */}
        <Header />

        <div className="main-wrapper">
          <AppRoutes />
        </div>

        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
};

// ✅ Allows us to use useNavigate for redirection
function AppRoutes() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // After successful login, redirect to /admin
    navigate("/admin");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/beats" element={<Beats />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="*"
        element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
