// frontend/src/pages/Home.js
import React from "react";
import "../assets/styles/Home.css";
import bgImage from "../assets/images/bg-main.jpeg"; // replace with your uploaded background
import gallery1 from "../assets/images/gallery1.jpeg"; // replace with your images
import gallery2 from "../assets/images/gallery2.jpeg";

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className="overlay">
        <header className="header">
          <h1 className="title">Music Portal</h1>
        </header>

        <main className="main-content">
          <section className="image-section">
            <img src={gallery1} alt="Main" className="main-image" />

            <div className="image-gallery">
              <img src={gallery1} alt="Gallery 1" className="small-image" />
              <img src={gallery2} alt="Gallery 2" className="small-image" />
              {/* Add more small images here */}
            </div>
          </section>

          <section className="text-section">
            <div className="buttons">
              <button
                className="nav-button"
                onClick={() => (window.location.href = "/news")}
              >
                News Updates
              </button>
              <button
                className="nav-button"
                onClick={() => (window.location.href = "/beats")}
              >
                Fresh Beats
              </button>
              <button
                className="nav-button"
                onClick={() => (window.location.href = "/admin")}
              >
                Contact Admin
              </button>
            </div>
          </section>
        </main>

        <footer className="footer">
          <button className="buy-button">Buy Beat</button>
          <a
            href="mailto:admin@example.com"
            className="contact-link"
            target="_blank"
            rel="noreferrer"
          >
            Contact via Gmail
          </a>
          <a
            href="https://wa.me/your-whatsapp-number"
            className="contact-link"
            target="_blank"
            rel="noreferrer"
          >
            Contact via WhatsApp
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
