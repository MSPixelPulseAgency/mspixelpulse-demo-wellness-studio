// src/pages/Home.jsx

import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import ContactCTA from "../components/ContactCTA";

function Home() {
  return (
    <>
      <Helmet>
        <title>MS PixelPulse Wellness Studio | Beauty & Wellness Demo</title>
        <meta
          name="description"
          content="MS PixelPulse Wellness Studio is a clean beauty and wellness demo website template for salons, spas, wellness studios, and beauty brands in Toronto."
        />
      </Helmet>

      <Hero />
      <AboutPreview />
      <Services />
      <Pricing />
      <Gallery limit={6} />
      <Testimonials />
      <ContactCTA />
    </>
  );
}

export default Home;
