import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">FilmPicks</a>
        </div>
        
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <a href="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </a>
          <Link to="/favourites" className="nav-link" onClick={() => setIsOpen(false)}>
            Favourites
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
