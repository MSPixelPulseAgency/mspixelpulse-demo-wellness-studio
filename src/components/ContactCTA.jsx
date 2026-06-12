// src/components/ContactCTA.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ContactCTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span>Ready to explore the demo?</span>
          <h2>Launch a clean beauty and wellness website for your studio.</h2>
          <p>
            This demo can be adapted for salons, spas, wellness clinics, massage
            studios, skincare brands, and local beauty service businesses.
          </p>
          <Link to="/contact" className="btn light-btn">
            Contact MS PixelPulse
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactCTA;
