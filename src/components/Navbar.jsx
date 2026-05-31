// src/components/Navbar.jsx

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo image-logo" onClick={closeMenu}>
          <img
            src="/images/katrina-studios-logo.png"
            alt="Katrina Studios logo"
          />
        </Link>

        <nav className={isOpen ? "nav-links open" : "nav-links"}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/services" onClick={closeMenu}>
            Services
          </NavLink>

          <NavLink to="/gallery" onClick={closeMenu}>
            Gallery
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          <Link to="/contact" className="nav-cta" onClick={closeMenu}>
            Book Now
          </Link>
        </nav>

        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          type="button"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;