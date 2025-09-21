import React from "react";
import "../styles/Home.css";

// Background + main (medium) image
import bgImage from "../images/bg-main.jpg";
import mainImage from "../images/main-artist.png";

// Six small gallery images
import img1 from "../images/gallery1.jpg";
import img2 from "../images/gallery2.jpg";
import img3 from "../images/gallery3.jpg";
import img4 from "../images/gallery4.jpg";
import img5 from "../images/gallery5.jpg";
import img6 from "../images/gallery6.jpg";

const Home = () => {
  const smallImages = [img1, img2, img3, img4, img5, img6];

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
        <main className="main-content">
          {/* LEFT PANEL - News */}
          <section className="left-panel">
            <div className="news-box">
              <h3>Latest Interview</h3>
              <p>The sound of the year. A deep dive into the artist’s process.</p>
            </div>
            <div className="news-box">
              <h3>Studio Life</h3>
              <p>Behind the scenes of the latest hit-making session.</p>
            </div>
            <div className="news-box">
              <h3>Album Incoming</h3>
              <p>Everything you need to know about the next release.</p>
            </div>
          </section>

          {/* CENTER PANEL - Main Artist Image & Buttons */}
          <section className="center-panel">
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt="Main Artist"
                className="main-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/fallback.jpeg";
                }}
              />
              <div className="main-image-overlay"></div>
            </div>

            <div className="buttons">
              <button
                className="btn blue"
                onClick={() => (window.location.href = "/beats")}
              >
                Beats Available
              </button>
              <button
                className="btn red"
                onClick={() => (window.location.href = "/news")}
              >
                Newsletter
              </button>
              <button
                className="btn blue-light"
                onClick={() => (window.location.href = "/admin")}
              >
                Follow the show
              </button>
            </div>
          </section>

          {/* RIGHT PANEL - 12 Small Thumbnails */}
          <section className="right-panel">
            {[...Array(12)].map((_, i) => (
              <div className="thumb-wrapper" key={i}>
                <img
                  src={smallImages[i % smallImages.length]}
                  alt={`Thumb ${i + 1}`}
                  className="thumb"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/fallback.jpeg";
                  }}
                />
                <div className="thumb-overlay"></div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
