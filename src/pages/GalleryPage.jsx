// src/pages/GalleryPage.jsx

import { Helmet } from "react-helmet-async";
import Gallery from "../components/Gallery";
import ContactCTA from "../components/ContactCTA";

function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery | MS PixelPulse Wellness Studio</title>
        <meta
          name="description"
          content="Explore demo gallery visuals for a clean beauty and wellness website, including calm interiors, self-care details, and studio atmosphere."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">Studio Gallery</span>
          <h1>A calm gallery layout designed to build trust and visual appeal.</h1>
          <p>
            Use this section to show treatment rooms, beauty details, wellness
            interiors, skincare visuals, product shots, and brand atmosphere.
          </p>
        </div>
      </section>

      <Gallery limit={6} />

      <ContactCTA />
    </>
  );
}

export default GalleryPage;
