// src/components/Hero.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Heart } from "lucide-react";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-shape shape-one"></div>
      <div className="hero-bg-shape shape-two"></div>

      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <span className="eyebrow">
            <MapPin size={16} />
            Toronto Beauty & Wellness Studio
          </span>

          <h1>
            A calm beauty and wellness experience designed to help clients feel renewed.
          </h1>

          <p>
            MS PixelPulse Wellness Studio is a polished demo website template for
            modern salons, spas, massage studios, and wellness brands that want a
            clean online presence.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn primary-btn">
              Request Demo
            </Link>
            <Link to="/services" className="btn secondary-btn">
              View Services
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>Modern</strong>
              <span>Beauty Layout</span>
            </div>
            <div>
              <strong>Flexible</strong>
              <span>Demo Content</span>
            </div>
            <div>
              <strong>Clean</strong>
              <span>Wellness Style</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className="hero-card">
            <img
              src="/images/dummy-hero.svg"
              alt="Dummy wellness studio placeholder"
            />
          </div>

          <div className="floating-card top-card">
            <Star size={18} />
            <span>Premium demo experience</span>
          </div>

          <div className="floating-card bottom-card">
            <Heart size={18} />
            <span>Beauty and wellness focused</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
