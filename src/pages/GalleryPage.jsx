// src/pages/GalleryPage.jsx

import { Helmet } from "react-helmet-async";
import Gallery from "../components/Gallery";
import ContactCTA from "../components/ContactCTA";

function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery | Katrina Studios</title>
        <meta
          name="description"
          content="Explore Katrina Studios gallery featuring massage room details, wellness atmosphere, calm interiors, and relaxing spa-inspired visuals."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">Studio Gallery</span>
          <h1>A calm, private, and relaxing space designed for comfort.</h1>
          <p>
            View the atmosphere, massage room setup, wellness details, and soft
            spa-inspired visuals of Katrina Studios.
          </p>
        </div>
      </section>

      <Gallery limit={6} />

      <ContactCTA />
    </>
  );
}

export default GalleryPage;