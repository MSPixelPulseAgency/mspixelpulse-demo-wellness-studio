import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Flower2, Plus } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import media from "../data/media.json";
import { brand, faqs } from "../data/studio";
import ServicePicker from "./ServicePicker";
import MotionPreference from "./MotionPreference";
import JournalMenu from "./JournalMenu";
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
      "og:image": "https://wellness.mspixelpulse.com/videos/v4/home-960.webp",
    }))
      meta(`meta[property="${property}"]`, "meta", { property }, content);
  }, [title, description, path]);
  return null;
}
export function Photo({
  name,
  alt,
  className = "",
  eager = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
  ...props
}) {
  const image = media[name];
  return (
    <img
      className={`photo photo-${name} ${className}`}
      src={`/images/noire/${name}-800.webp`}
      srcSet={image.widths
        .map((w) => `/images/noire/${name}-${w}.webp ${w}w`)
        .join(", ")}
      sizes={sizes}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding={eager ? "sync" : "async"}
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
  const toggle = useRef(null),
    sentinel = useRef(null),
    header = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      } else if (
        e.type === "pointerdown" &&
        !header.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        MSPixelPulse concept · Fictional studio · Toronto
      </div>
      <span className="nav-sentinel" ref={sentinel} aria-hidden="true" />
      <header
        ref={header}
        className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      >
        <Link
          className="wordmark"
          to="/"
          title="Wellness Studio homepage"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Flower2 size={32} strokeWidth={1.4} aria-hidden="true" />
          <span>
            Wellness Studio<small>SPA · SKIN · SLOW LIVING</small>
          </span>
        </Link>
        <button
          type="button"
          className="menu-toggle icon-button"
          ref={toggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          className={`navigation ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <ServicePicker
            compact
            label="Services"
            onSelect={(t) => navigate(t ? `/services/${t.id}` : "/services")}
          />
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/about">Our story</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <JournalMenu />
          <ButtonLink to="/booking">Find your escape</ButtonLink>
        </nav>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-signature" aria-hidden="true">
        W<span>✧</span>S
      </div>
      <div className="footer-top">
        <div>
          <Eyebrow light>A world apart. A moment for you.</Eyebrow>
          <p className="footer-title">
            The art of <em>indulgence.</em>
          </p>
          <ButtonLink to="/booking" light>
            Begin your escape
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
            <Link to="/reviews">Sample reviews</Link>
            <Link to="/feedback">Share feedback</Link>
            <Link to="/wellness-tips">Wellness tips</Link>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span>{brand.phone}</span>
          </div>
        </div>
      </div>
      <MotionPreference />
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
        name="ritual"
        alt="An adult guest resting in a warm candlelit spa setting"
        sizes="100vw"
      />
      <div className="closing-copy wrap">
        <Eyebrow light>Your invitation to indulge</Eyebrow>
        <h2>
          A little escape.
          <br />
          An entirely <em>different feeling.</em>
        </h2>
        <p>Let the world wait a little. Find the ritual that speaks to you.</p>
        <ButtonLink to="/booking" light>
          Explore your appointment
        </ButtonLink>
        <small>Fictional studio · Demo requests only · No real bookings</small>
      </div>
      <span className="closing-index" aria-hidden="true">
        W / S
      </span>
    </section>
  );
}
export function FAQAccordion({ limit, items = faqs }) {
  return (
    <div className="faq-list">
      {items.slice(0, limit).map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={18} aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
export function ServiceCard({ item }) {
  return (
    <article className="treatment-card">
      <Link
        to={`/services/${item.id}`}
        className="treatment-image"
        aria-label={`View details: ${item.title}, ${item.category}`}
      >
        <Photo name={item.image} alt={item.alt} />
        <span className="card-category">{item.category}</span>
        <span className="image-arrow">
          <ArrowUpRight size={22} aria-hidden="true" />
        </span>
      </Link>
      <div className="card-content">
        <div className="treatment-meta">
          <span>{item.duration} minutes</span>
          <span>
            Demo CAD ${item.price}
            {item.couples ? " / two" : ""}
          </span>
        </div>
        <h3>
          <Link to={`/services/${item.id}`}>{item.title}</Link>
        </h3>
        <p>{item.description}</p>
        <div className="card-actions">
          <TextLink to={`/services/${item.id}`}>View details</TextLink>
          <Link
            className="card-book"
            to={`/booking?treatment=${item.id}`}
            aria-label={`Request ${item.title}`}
          >
            Request <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
