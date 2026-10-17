import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Flower2,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import media from "../data/media.json";
import { brand, faqs, treatments } from "../data/studio";
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
        "https://wellness.mspixelpulse.com/images/noire/hero-1200.webp",
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
  const sentinel = useRef(null);
  const [scrolled, setScrolled] = useState(false);
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
        MSPixelPulse concept · Fictional studio <span> · Toronto, Canada</span>
      </div>
      <span ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link
          className="wordmark"
          to="/"
          title="Go to the Wellness Studio homepage"
        >
          <Flower2 size={29} strokeWidth={1.1} aria-hidden="true" />
          <span>
            WELLNESS <i>STUDIO</i>
            <small>THE ART OF INDULGENCE</small>
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
          <div className="nav-treatment">
            <NavLink to="/services">Treatments</NavLink>
            <details
              className="nav-dropdown"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.currentTarget.open = false;
                  e.currentTarget.querySelector("summary")?.focus();
                }
              }}
            >
              <summary aria-label="Explore treatment menu">
                <ChevronDown size={14} />
              </summary>
              <div className="nav-treatment-menu">
                <p className="eyebrow">The ritual collection</p>
                {treatments.map((t) => (
                  <Link to={`/services/${t.id}`} key={t.id}>
                    {t.title}
                    <span>{t.duration} min</span>
                  </Link>
                ))}
                <Link to="/services">
                  Explore all treatments <ArrowUpRight size={16} />
                </Link>
              </div>
            </details>
          </div>
          <NavLink to="/about">Our story</NavLink>
          <NavLink to="/experience">The experience</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <ButtonLink to="/booking">Begin your escape</ButtonLink>
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
export function FAQAccordion({ limit }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(([q, a]) => (
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
          <ArrowUpRight size={22} aria-hidden="true" />
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
      <TextLink to={`/booking?treatment=${item.id}`}>
        Explore appointment
      </TextLink>
      <span className="treatment-number" aria-hidden="true">
        0{index + 1}
      </span>
    </article>
  );
}
