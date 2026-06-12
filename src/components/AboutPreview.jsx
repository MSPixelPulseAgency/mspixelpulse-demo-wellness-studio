// src/components/AboutPreview.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Smile } from "lucide-react";

function AboutPreview() {
  return (
    <section className="section about-preview">
      <div className="container about-grid">
        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <img
            src="/images/wellness-profile.jpg"
            alt="Wellness studio lifestyle"
            className="about-main-img"
          />
          <div className="about-badge">
            <span>Toronto</span>
            <strong>Wellness Demo</strong>
          </div>
        </motion.div>

        <motion.div
          className="section-content"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-kicker">About MS PixelPulse Wellness Studio</span>
          <h2>A polished demo space created for beauty, wellness, and self-care brands.</h2>
          <p>
            This demo website shows how a modern wellness business can present
            services, atmosphere, pricing, gallery visuals, and booking details
            in a simple, premium, and mobile-friendly layout.
          </p>

          <div className="feature-list">
            <div>
              <Leaf />
              <span>Relaxing wellness-focused presentation</span>
            </div>
            <div>
              <ShieldCheck />
              <span>Clean, trustworthy, and conversion-ready pages</span>
            </div>
            <div>
              <Smile />
              <span>Friendly copy built for local service businesses</span>
            </div>
          </div>

          <Link to="/about" className="text-link">
            Learn more about the demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutPreview;
