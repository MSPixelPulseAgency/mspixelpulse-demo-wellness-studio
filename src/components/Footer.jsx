// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const displayPhone = "+1 (000) 000-0000";
const emailAddress = "hello@mspixelpulse.com";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>MS PixelPulse Wellness Studio</h3>
          <p>
            A clean beauty and wellness demo website for Toronto-based salons,
            spas, massage studios, skincare brands, and local self-care businesses.
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
            <MapPin size={16} /> Toronto, Ontario, Canada
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
            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MS PixelPulse Wellness Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
