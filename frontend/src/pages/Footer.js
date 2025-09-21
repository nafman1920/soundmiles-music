import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>© {new Date().getFullYear()} SOUNDMILES MUSIC | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
