import React from "react";
import "../styles.css"; // Importing the styles.css file

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-text">
        © {currentYear} Chapters. All rights reserved.
      </p>
    </footer>
  );
}
