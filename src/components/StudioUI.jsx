import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Flower2, Plus } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { brand, faqs } from "../data/studio";
export function SEO({ title, description, path = "" }) {
  useEffect(() => {
    document.title = `${title} | MSPixelPulse Wellness Studio`;
    const meta = (selector, tag, attrs, value) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement(tag);
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
        document.head.append(el);
      }
      el.setAttribute(tag === "link" ? "href" : "content", value);
    };
    meta(
      'meta[name="description"]',
      "meta",
      { name: "description" },
      description,
    );
    meta(
      'link[rel="canonical"]',
      "link",
      { rel: "canonical" },
      `https://wellness.mspixelpulse.com${path}`,
    );
    for (const [property, content] of Object.entries({
      "og:title": `${title} | MSPixelPulse Wellness Studio`,
      "og:description": description,
      "og:url": `https://wellness.mspixelpulse.com${path}`,
      "og:type": "website",
      "og:image":
        "https://wellness.mspixelpulse.com/images/wellness/studio.webp",
    }))
      meta(`meta[property="${property}"]`, "meta", { property }, content);
  }, [title, description, path]);
  return null;
}
export function Photo({ name, alt, className = "", eager = false, ...props }) {
  return (
    <img
      className={`photo ${className}`}
      src={`/images/wellness/${name}-960.webp`}
      srcSet={`/images/wellness/${name}-640.webp 640w, /images/wellness/${name}-960.webp 960w, /images/wellness/${name}.webp ${name === "facial" ? 1800 : name === "studio" ? 1350 : 1200}w`}
      sizes={eager ? "100vw" : "(max-width: 700px) 100vw, 50vw"}
      alt={alt}
      width={name === "facial" ? 1800 : name === "studio" ? 1350 : 1200}
      height={name === "facial" ? 1200 : 1800}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      {...props}
    />
  );
}
export function ButtonLink({ to, children, light = false, className = "" }) {
  return (
    <Link
      className={`button ${light ? "button-light" : ""} ${className}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({ to, children }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    function escape(e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        A fictional studio. A real moment of inspiration.{" "}
        <span> A website concept by MSPixelPulse.</span>
      </div>
      <header className="site-header">
        <Link
          className="wordmark"
          to="/"
          aria-label="Wellness Studio by MSPixelPulse home"
        >
          <Flower2 size={29} strokeWidth={1.1} aria-hidden="true" />
          <span>
            WELLNESS <i>STUDIO</i>
            <small>BY MSPIXELPULSE</small>
          </span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          <NavLink to="/services">Treatments</NavLink>
          <NavLink to="/about">Our story</NavLink>
          <NavLink to="/experience">The experience</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <ButtonLink to="/booking">Make time for you</ButtonLink>
        </nav>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Eyebrow light>A little less rush. A little more you.</Eyebrow>
          <p className="footer-title">
            Wellness, <em>at your pace.</em>
          </p>
          <ButtonLink to="/booking" light>
            Explore an appointment
          </ButtonLink>
        </div>
        <div className="footer-links">
          <div>
            <h2>Discover</h2>
            <Link to="/services">Treatments</Link>
            <Link to="/about">Our story</Link>
            <Link to="/experience">Studio experience</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
          <div>
            <h2>Good to know</h2>
            <Link to="/booking">Demo appointment</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">Frequently asked</Link>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span>{brand.phone}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        <span>Toronto, Ontario · Concept location</span>
        <span>
          Fictional services · Illustrative CAD prices · Stock photography
        </span>
      </div>
    </footer>
  );
}
export function ContactCTA() {
  return (
    <section className="closing">
      <Photo
        name="botanicals"
        alt="Lavender and linen in a calm spa still life"
      />
      <div className="closing-copy">
        <Eyebrow>Your next quiet moment</Eyebrow>
        <h2>
          Leave a little room
          <br />
          for <em>yourself.</em>
        </h2>
        <p>
          Find your ritual. Choose your pace. Explore what a more considered
          kind of care could feel like.
        </p>
        <ButtonLink to="/booking">Find your moment</ButtonLink>
        <small>Demonstration only. No real appointment is made.</small>
      </div>
    </section>
  );
}
export function FAQAccordion({ limit }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={18} aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function ServiceCard({ item, index }) {
  return (
    <article className="treatment-card">
      <Link
        to={`/services/${item.id}`}
        className="treatment-image"
        aria-label={`Explore ${item.title}`}
      >
        <Photo name={item.image} alt={item.alt} />
        <span className="image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="treatment-meta">
        <span>{item.category}</span>
        <span>
          {item.duration} MIN · DEMO CAD ${item.price}
        </span>
      </div>
      <h3>
        <Link to={`/services/${item.id}`}>{item.title}</Link>
      </h3>
      <p>{item.description}</p>
      <span className="treatment-number">0{index + 1}</span>
    </article>
  );
}
