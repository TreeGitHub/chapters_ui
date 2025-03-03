import React from "react";
import "../styles.css"; // Importing the styles.css file

export default function Header() {
  return (
    <div className="header">
      <img className="Logo" src="logo.png" alt="Chapters Logo" />
      <h2 className="app-subtitle">
        It's time to read! Find your next book here.
      </h2>
    </div>
  );
}
