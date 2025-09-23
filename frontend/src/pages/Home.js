import React, { useState } from "react";
import "../styles/Home.css";

// Background + main artist image
import bgImage from "../images/bg-main.jpg";
import mainImage from "../images/main-artist.png";

// 12 unique thumbnail images
import img1 from "../images/gallery1.jpg";
import img2 from "../images/gallery2.jpg";
import img3 from "../images/gallery3.jpg";
import img4 from "../images/gallery4.jpg";
import img5 from "../images/gallery5.jpg";
import img6 from "../images/gallery6.jpg";
import img7 from "../images/gallery7.png";
import img8 from "../images/gallery8.jpg";
import img9 from "../images/gallery9.jpg";
import img10 from "../images/gallery10.jpg";
import img11 from "../images/gallery11.jpg";
import img12 from "../images/gallery12.jpg";

const Home = () => {
  const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

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
          {/* LEFT PANEL */}
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

          {/* CENTER PANEL */}
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

            <div className="floating-buttons">
              <button
                className="blue"
                onClick={() => (window.location.href = "/beats")}
              >
                Beats Available
              </button>
              <button
                className="red"
                onClick={() => (window.location.href = "/news")}
              >
                Newsletter
              </button>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="right-panel">
            {galleryImages.map((img, i) => (
              <div className="thumb-wrapper" key={i} onClick={() => openModal(img)}>
                <img
                  src={img}
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

      {/* MODAL GALLERY */}
      {modalImage && (
        <div className="image-modal" onClick={closeModal}>
          <img src={modalImage} alt="Modal" className="modal-img" />
          <button className="modal-close" onClick={closeModal}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
