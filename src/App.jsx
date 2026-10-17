import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components/StudioUI";
import {
  Home,
  Services,
  Treatment,
  About,
  Experience,
  Gallery,
  Booking,
  Contact,
  FAQ,
  NotFound,
} from "./pages/StudioPages";
import { Reviews, Feedback, WellnessTips } from "./pages/CommunityPages";
export default function App() {
  const location = useLocation();
  const firstVisit = useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!firstVisit.current)
      document.getElementById("main")?.focus({ preventScroll: true });
    firstVisit.current = false;
  }, [location.pathname]);
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        "main>section:not(.hero):not(.page-intro):not(.treatment-hero)",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  return (
    <>
      <Navbar key={location.pathname} />
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<Treatment />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/studio" element={<Experience />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/wellness-tips" element={<WellnessTips />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
