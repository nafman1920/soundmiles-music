import React, { useState } from "react";
import "../styles/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaSpotify,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <footer className="main-footer">
      <div className="footer-info-row">
        <span>© {new Date().getFullYear()} SOUNDMILES MUSIC | All Rights Reserved</span>

        <span className="footer-contact-item">
          <FaPhoneAlt className="footer-icon" />
          <a href="tel:+2348104103936">+2348104103936</a>,{" "}
          <a href="tel:+2347055752292">+2347055752292</a>
        </span>

        <span className="footer-contact-item">
          <FaEnvelope className="footer-icon" />
          <a href="mailto:legitbeat1@gmail.com">legitbeat1@gmail.com</a>
        </span>

        <span className="footer-social-label">Follow on Social Media Handles</span>
      </div>

      {/* Toggle button only visible on mobile */}
      <button
        className="social-toggle-button"
        onClick={() => setShowIcons(!showIcons)}
      >
        {showIcons ? "Hide Socials" : "Show Socials"}
      </button>

      <div className={`social-icons ${showIcons ? "visible" : "collapsed"}`}>
        <a href="https://www.facebook.com/share/1GmvxqFSzg/" target="_blank" rel="noopener noreferrer" title="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/soundmiles?igsh=MTZqMncydnk4OHh6cg==" target="_blank" rel="noopener noreferrer" title="Instagram">
          <FaInstagram />
        </a>
        <a href="https://tiktok.com/@soundmiles" target="_blank" rel="noopener noreferrer" title="TikTok">
          <FaTiktok />
        </a>
        <a href="https://youtube.com/@soundmiles3936?si=3fehM-zK3Qoo2ZwM" target="_blank" rel="noopener noreferrer" title="YouTube">
          <FaYoutube />
        </a>
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" title="Spotify">
          <FaSpotify />
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" title="WhatsApp">
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
