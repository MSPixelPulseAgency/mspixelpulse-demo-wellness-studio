// src/pages/ServicesPage.jsx

import { Helmet } from "react-helmet-async";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import ContactCTA from "../components/ContactCTA";

function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | MS PixelPulse Wellness Studio</title>
        <meta
          name="description"
          content="Explore demo beauty and wellness service sections for salons, spas, skincare studios, holistic clinics, and local wellness brands."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">Beauty & Wellness Services</span>
          <h1>Showcase your services with clear, calm, and client-friendly content.</h1>
          <p>
            This demo service page is built for wellness businesses that need a
            simple way to explain treatments, pricing, packages, and booking next
            steps.
          </p>
        </div>
      </section>

      <Services showAll />
      <Pricing />
      <ContactCTA />
    </>
  );
}

export default ServicesPage;
