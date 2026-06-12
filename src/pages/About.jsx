// src/pages/About.jsx

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Leaf, ShieldCheck } from "lucide-react";

function About() {
  return (
    <>
      <Helmet>
        <title>About | MS PixelPulse Wellness Studio</title>
        <meta
          name="description"
          content="Learn more about MS PixelPulse Wellness Studio, a beauty and wellness demo website template for local service businesses in Toronto."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">About Us</span>
          <h1>A clean demo website built for beauty, wellness, and self-care brands.</h1>
          <p>
            MS PixelPulse Wellness Studio shows how a modern local business can
            present services, trust, atmosphere, and booking details in a simple
            and polished website experience.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-page-grid">
          <motion.div
            className="about-page-image"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <img src="/images/studio-room.jpg" alt="Wellness studio room" />
          </motion.div>

          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <h2>A layout built around calm visuals and clear conversion paths.</h2>
            <p>
              Every section is designed to help visitors understand the brand,
              explore services, view the studio atmosphere, and take action. The
              copy is general demo content and can be customized for any beauty
              or wellness business.
            </p>

            <div className="value-grid">
              <div>
                <Heart />
                <h3>Client-Focused</h3>
                <p>Clear messaging that helps clients feel confident booking.</p>
              </div>
              <div>
                <Leaf />
                <h3>Calm Energy</h3>
                <p>A soft, modern design direction for wellness experiences.</p>
              </div>
              <div>
                <ShieldCheck />
                <h3>Demo Ready</h3>
                <p>Flexible content that can be reused for multiple niches.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;
