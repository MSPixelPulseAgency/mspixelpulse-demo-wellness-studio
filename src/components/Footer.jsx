// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const phoneNumber = "+13089208128";
const displayPhone = "+1 308-920-8128";
const emailAddress = "uotohol5@gmail.com";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Katrina Studios</h3>
          <p>
            A private massage and wellness studio serving Edmonton, Alberta and
            USA clients with relaxing, affordable self-care sessions.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p>
            <MapPin size={16} /> Edmonton, Alberta & USA
          </p>
          <p>
            <Phone size={16} /> {displayPhone}
          </p>
          <p>
            <Mail size={16} /> {emailAddress}
          </p>
        </div>

        <div>
          <h4>Social</h4>
          <div className="social-links">
            <a
              href={`https://wa.me/${phoneNumber.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.facebook.com/share/17u5bPzfKG/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a href="/" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Katrina Studios. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;