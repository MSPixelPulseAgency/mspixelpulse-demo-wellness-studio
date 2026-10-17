import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Flower2,
  Clock3,
  MapPin,
  Mail,
  Heart,
  Check,
  Leaf,
} from "lucide-react";
import {
  brand,
  treatments,
  gallery,
  faqs,
  categories,
  photoDescriptions,
} from "../data/studio";
import {
  SEO,
  Photo,
  ButtonLink,
  TextLink,
  Eyebrow,
  ContactCTA,
  FAQAccordion,
  ServiceCard,
} from "../components/StudioUI";
import LeadForm from "../components/LeadForm";
import ServiceDiscovery from "../components/ServiceDiscovery";
import AtmosphereFilm from "../components/AtmosphereFilm";
export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const categoryImages = ["massage", "mask", "body", "sound", "pool", "nails"];
  const featured = [
    "hot-stone-massage",
    "signature-experience",
    "couples-spa-escape",
  ].map((id) => treatments.find((t) => t.id === id));
  return (
    <>
      <SEO
        title="Your world, on pause"
        description="Discover 36 illustrative spa and wellness rituals in a colourful Toronto studio concept. Relaxation massage, facials, beauty and beautiful shared escapes. Demo requests only."
      />
      <section className="hero v3-hero">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-copy">
          <Eyebrow light>Toronto spa & wellness · The NOIRÉ collection</Eyebrow>
          <h1>
            Your world,
            <br />
            <em>on pause.</em>
          </h1>
          <p>
            Less rush. More ritual.
            <br />A little indulgence, entirely your own.
          </p>
          <div className="button-row">
            <ButtonLink to="/booking">Find your escape</ButtonLink>
            <ButtonLink to="/services" light>
              Explore the rituals
            </ButtonLink>
          </div>
          <div className="hero-footnote">
            <Flower2 size={20} aria-hidden="true" />
            <span>
              Considered care. Beautifully imagined.
              <small>A fictional studio by MSPixelPulse</small>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-portrait">
            <Photo
              name="portrait"
              alt={photoDescriptions.portrait}
              eager
              sizes="(max-width: 700px) 92vw, 43vw"
            />
            <span className="portrait-word" aria-hidden="true">
              unhurried.
            </span>
          </div>
          <div className="hero-inset">
            <Photo
              name="mask"
              alt={photoDescriptions.mask}
              eager
              sizes="(max-width: 700px) 35vw, 18vw"
            />
            <span>Skin. Softness. A little glow.</span>
          </div>
          <Link className="hero-glass-note" to="/services">
            <Sparkles size={22} />
            <span>
              <strong>36 rituals.</strong>
              <small>One beautiful you.</small>
            </span>
            <ArrowUpRight size={18} />
          </Link>
          <span className="hero-art-label">A softer kind of luxury / 01</span>
        </div>
      </section>
      <section className="discovery-landing wrap">
        <div>
          <Eyebrow>Your mood. Your moment.</Eyebrow>
          <h2>
            What feels like <em>you?</em>
          </h2>
        </div>
        <form
          className="search-field"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(
              "/services" + (query ? "?q=" + encodeURIComponent(query) : ""),
            );
          }}
        >
          <Search size={21} aria-hidden="true" />
          <label className="sr-only" htmlFor="home-search">
            Find a spa service
          </label>
          <input
            id="home-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try a facial, massage or spa day…"
          />
          <button
            type="submit"
            className="icon-button"
            aria-label="Search spa services"
          >
            <ArrowRight />
          </button>
        </form>
        <div className="category-rail">
          {categories.map((c, i) => (
            <Link to={`/services?category=${c}`} key={c}>
              <span>
                <Photo name={categoryImages[i]} alt="" sizes="180px" />
                <ArrowUpRight size={19} />
              </span>
              <strong>{c}</strong>
              <small>Explore the collection</small>
            </Link>
          ))}
        </div>
      </section>
      <section className="section wrap signature-section">
        <div className="section-heading">
          <div>
            <Eyebrow>Made for a little more</Eyebrow>
            <h2>
              Extraordinary rituals.
              <br />
              <em>Everyday escape.</em>
            </h2>
          </div>
          <div>
            <p>
              Warm stones. Dewy skin. Time together.
              <br />
              Begin with a few of our favourite concepts.
            </p>
            <TextLink to="/services">Discover all 36 services</TextLink>
          </div>
        </div>
        <div className="featured-grid">
          {featured.map((t) => (
            <ServiceCard key={t.id} item={t} />
          ))}
        </div>
        <p className="caption">
          All services, durations and CAD prices are illustrative. No real
          appointments or payments.
        </p>
      </section>
      <section className="sensory-section">
        <div className="wrap sensory-layout">
          <div className="sensory-copy">
            <Eyebrow light>Slip into a slower rhythm</Eyebrow>
            <h2>
              A moment
              <br />
              to <em>just be.</em>
            </h2>
            <p>
              The quiet of water. The comfort of warmth. A feeling that stays
              with you a little longer.
            </p>
            <ButtonLink to="/experience" light>
              Step inside the feeling
            </ButtonLink>
            <div className="sensory-details">
              <span>
                <Leaf size={19} />A gentle pace
              </span>
              <span>
                <Heart size={19} />
                Your kind of care
              </span>
            </div>
          </div>
          <AtmosphereFilm />
          <div className="sensory-still">
            <Photo name="stone" alt={photoDescriptions.stone} />
            <span>Warmth, thoughtfully placed.</span>
          </div>
        </div>
      </section>
      <section className="section wrap ritual-stories">
        <div className="story-intro">
          <Eyebrow>Beyond the ordinary</Eyebrow>
          <h2>
            A beautiful
            <br />
            <em>kind of balance.</em>
          </h2>
          <p>
            Beauty, body care and moments of stillness. Six collections, each
            with its own feeling.
          </p>
        </div>
        <Link to="/services?category=Beauty" className="story-tile">
          <Photo name="nails" alt={photoDescriptions.nails} />
          <div>
            <span>The finishing touches</span>
            <h3>Beauty in the details.</h3>
            <ArrowUpRight />
          </div>
        </Link>
        <Link
          to="/services?category=Wellness"
          className="story-tile story-tall"
        >
          <Photo name="sound" alt={photoDescriptions.sound} />
          <div>
            <span>Time to reconnect</span>
            <h3>Your quiet ritual.</h3>
            <ArrowUpRight />
          </div>
        </Link>
        <Link to="/services?category=Body" className="story-tile story-wide">
          <Photo name="body" alt={photoDescriptions.body} />
          <div>
            <span>Comfort, from head to toe</span>
            <h3>Softness, beautifully considered.</h3>
            <ArrowUpRight />
          </div>
        </Link>
      </section>
      <section className="studio-story wrap">
        <div className="studio-collage">
          <Photo name="pool" alt={photoDescriptions.pool} />
          <Photo name="robe" alt={photoDescriptions.robe} />
          <span className="glass-tag">
            <Flower2 />
            <strong>A world apart.</strong>
            <small>Atmosphere study · Stock setting</small>
          </span>
        </div>
        <div>
          <Eyebrow>The feeling behind the studio</Eyebrow>
          <h2>
            Enter softly.
            <br />
            <em>Leave the rush.</em>
          </h2>
          <p>
            Plum shadows. Golden light. Soft linen. An imagined Toronto
            sanctuary with a little room for you.
          </p>
          <div className="value-line">
            <Check size={18} />
            <span>Explore at your own pace</span>
          </div>
          <div className="value-line">
            <Check size={18} />
            <span>Clear prices. Thoughtful choices.</span>
          </div>
          <TextLink to="/about">Meet the studio concept</TextLink>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>A glimpse of the feeling</Eyebrow>
            <h2>
              Stay a little
              <br />
              <em>in the moment.</em>
            </h2>
          </div>
          <TextLink to="/gallery">Explore the gallery</TextLink>
        </div>
        <div className="home-gallery">
          {["beauty", "water", "still-life", "hair"].map((name, i) => (
            <Link to="/gallery" key={name}>
              <Photo name={name} alt={photoDescriptions[name]} />
              <span>
                {
                  [
                    "Gentle touch",
                    "Quiet water",
                    "Little luxuries",
                    "Considered care",
                  ][i]
                }
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="booking-invitation wrap">
        <div>
          <Eyebrow light>Your escape, made simple</Eyebrow>
          <h2>
            A ritual for you.
            <br />
            <em>A moment to choose.</em>
          </h2>
          <p>
            Find your service. Share a preference. Review your sample request.
            No pressure, no payment.
          </p>
          <ButtonLink to="/booking">Begin your demo request</ButtonLink>
        </div>
        <ol>
          {[
            [
              "01",
              "Choose a feeling",
              "Search 36 rituals across six collections.",
            ],
            ["02", "Make it your moment", "Choose a preferred day and time."],
            [
              "03",
              "Keep it with you",
              "Review, edit and copy. Nothing is sent.",
            ],
          ].map(([n, h, p]) => (
            <li key={n}>
              <span>{n}</span>
              <div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="section faq-section wrap">
        <div>
          <Eyebrow>A little clarity</Eyebrow>
          <h2>
            Before your <em>escape.</em>
          </h2>
          <TextLink to="/faq">All your questions</TextLink>
        </div>
        <FAQAccordion limit={4} />
      </section>
      <ContactCTA />
    </>
  );
}
function PageIntro({ eyebrow, title, children, image = "water" }) {
  return (
    <section className="page-intro wrap">
      <div className="page-intro-copy">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
        <span className="intro-signature">
          WELLNESS STUDIO / THE NOIRÉ COLLECTION
        </span>
      </div>
      <div className="page-intro-media">
        <Photo name={image} alt={photoDescriptions[image]} eager />
        <span className="intro-orbit" aria-hidden="true" />
      </div>
    </section>
  );
}
export function Services() {
  return (
    <>
      <SEO
        title="Explore 36 spa & wellness services"
        path="/services"
        description="Search 36 demo spa services: massage, facials, body rituals, wellness, packages and beauty. Filter by category, duration or shared experiences. Illustrative CAD prices."
      />
      <PageIntro
        image="mask"
        eyebrow="Six collections. So many ways to slow down."
        title={
          <>
            Find your
            <br />
            <em>kind of calm.</em>
          </>
        }
      >
        From a little facial to a whole slow day. Explore the collection, follow
        a feeling, make it yours.
      </PageIntro>
      <section className="section wrap catalogue-section">
        <ServiceDiscovery />
      </section>
      <ContactCTA />
    </>
  );
}
export function Treatment() {
  const { id } = useParams();
  const t = treatments.find((t) => t.id === id);
  if (!t) return <NotFound />;
  const related = treatments
    .filter((x) => x.category === t.category && x.id !== t.id)
    .slice(0, 2);
  return (
    <>
      <SEO
        title={t.title}
        path={`/services/${t.id}`}
        description={`${t.description} ${t.duration}-minute fictional ${t.category.toLowerCase()} concept. Illustrative CAD $${t.price}. No real appointments.`}
      />
      <section className="treatment-hero wrap">
        <div>
          <Link className="text-link" to="/services">
            <ChevronLeft size={17} />
            All rituals
          </Link>
          <Eyebrow light>{t.category} collection</Eyebrow>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
          <div className="detail-pills">
            <span>
              <Clock3 size={17} />
              {t.duration} minutes
            </span>
            <span>
              Demo CAD ${t.price}
              {t.couples ? " for two" : ""}
            </span>
          </div>
          <ButtonLink to={`/booking?treatment=${t.id}`}>
            Request this ritual
          </ButtonLink>
          <small>Illustrative price. No real booking or payment.</small>
        </div>
        <Photo name={t.image} alt={t.alt} eager />
      </section>
      <section className="section wrap treatment-story">
        <div>
          <Eyebrow>Thoughtfully yours</Eyebrow>
          <h2>
            Little details.
            <br />
            <em>A deeper feeling.</em>
          </h2>
          <p>{t.note}</p>
        </div>
        <ol className="experience-steps">
          {t.includes.map((text, i) => (
            <li key={text}>
              <span>0{i + 1}</span>
              <h3>{text}</h3>
            </li>
          ))}
        </ol>
      </section>
      <section className="wrap detail-callout">
        <Flower2 size={30} />
        <div>
          <h2>Comfort comes first.</h2>
          <p>
            Simple preferences are welcome. This demo does not collect medical
            details or assess suitability.
          </p>
        </div>
        <TextLink to="/contact">Explore an enquiry</TextLink>
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <h2>
            Before your <em>ritual.</em>
          </h2>
        </div>
        <FAQAccordion limit={3} />
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Follow the feeling</Eyebrow>
            <h2>
              A little more <em>to explore.</em>
            </h2>
          </div>
          <TextLink to="/services">All services</TextLink>
        </div>
        <div className="treatments-grid">
          {related.map((x) => (
            <ServiceCard key={x.id} item={x} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
export function About() {
  return (
    <>
      <SEO
        title="A beautifully imagined studio"
        path="/about"
        description="Meet the idea behind MSPixelPulse Wellness Studio: a fictional Toronto spa bringing beauty, gentle care and unhurried moments together."
      />
      <PageIntro
        image="robe"
        eyebrow="An invitation to a softer pace"
        title={
          <>
            Made to feel
            <br />
            <em>like a little more.</em>
          </>
        }
      >
        A little more care. A little more space to be yourself. A wellness
        studio concept, imagined with feeling.
      </PageIntro>
      <section className="section wrap about-editorial">
        <div className="about-image">
          <Photo name="beauty" alt={photoDescriptions.beauty} />
          <span className="glass-tag">
            <Heart size={22} />
            <strong>Beautifully personal.</strong>
          </span>
        </div>
        <div>
          <Eyebrow>The heart of the concept</Eyebrow>
          <h2>
            Soft edges.
            <br />
            <em>Strong intention.</em>
          </h2>
          <p className="large-copy">
            We believe the smallest moments can feel extraordinary.
          </p>
          <p>
            A warm welcome. A comfortable seat. A ritual that unfolds at your
            pace. This fictional Toronto studio brings cosmetic beauty,
            relaxation and gentle everyday wellness together.
          </p>
          <p>
            Created by MSPixelPulse to explore a premium spa experience. The
            photographs are licensed stock settings, and the services are
            illustrative concepts.
          </p>
          <ButtonLink to="/services">Find a ritual for you</ButtonLink>
        </div>
      </section>
      <section className="wrap values-grid">
        {[
          [
            Flower2,
            "Gentle by design",
            "A thoughtful pace, clear choices and room to express a preference.",
          ],
          [
            Sparkles,
            "Beauty in the details",
            "Warm textures, expressive colour and considered finishing touches.",
          ],
          [
            Heart,
            "Clear from the start",
            "Demo services, illustrative prices and requests that stay in your browser.",
          ],
        ].map(([Icon, h, p]) => (
          <article key={h}>
            <Icon size={26} />
            <h2>{h}</h2>
            <p>{p}</p>
          </article>
        ))}
      </section>
      <ContactCTA />
    </>
  );
}
export function Experience() {
  return (
    <>
      <SEO
        title="Step into a slower rhythm"
        path="/experience"
        description="Discover the imagined spa journey: a gentle arrival, thoughtful rituals, quiet moments and a licensed 10-second indoor-pool atmosphere film."
      />
      <PageIntro
        image="pool"
        eyebrow="A world apart, a moment for you"
        title={
          <>
            Come for a ritual.
            <br />
            <em>Stay for the feeling.</em>
          </>
        }
      >
        An imagined journey through warmth, texture and a beautifully unhurried
        pace.
      </PageIntro>
      <section className="section wrap experience-film">
        <AtmosphereFilm />
        <div>
          <Eyebrow>Press pause on the ordinary</Eyebrow>
          <h2>
            Quiet water.
            <br />
            <em>A softer world.</em>
          </h2>
          <p>
            Take ten seconds by the water. A small atmosphere film captures the
            feeling behind the studio concept.
          </p>
          <p className="caption">
            Licensed stock footage. This is an illustrative setting, not a pool
            available at an operating studio.
          </p>
          <ButtonLink to="/services?category=Packages">
            Explore a longer escape
          </ButtonLink>
        </div>
        <Photo name="oils" alt={photoDescriptions.oils} />
      </section>
      <section className="wrap journey-section">
        <div className="section-heading">
          <div>
            <Eyebrow>The imagined journey</Eyebrow>
            <h2>
              Nothing rushed.
              <br />
              <em>Everything considered.</em>
            </h2>
          </div>
          <p>
            From the first hello to a gentle return.
            <br />A fictional visit, shaped around comfort.
          </p>
        </div>
        <div className="journey-cards">
          {[
            [
              "01",
              "Arrive softly",
              "robe",
              "A warm welcome and a moment to settle in.",
            ],
            [
              "02",
              "Find your feeling",
              "facial",
              "Choose your ritual and share simple preferences.",
            ],
            [
              "03",
              "Take your time",
              "water",
              "Enjoy the quiet of a considered, unhurried finish.",
            ],
          ].map(([n, h, img, p]) => (
            <article key={n}>
              <Photo name={img} alt={photoDescriptions[img]} />
              <div>
                <span>{n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
export function Gallery() {
  const [active, setActive] = useState(null);
  const [limit, setLimit] = useState(8);
  const [filter, setFilter] = useState("All");
  const dialog = useRef(null);
  const opener = useRef(null);
  const items = gallery.filter((g) => filter === "All" || g.tag === filter);
  useEffect(() => {
    if (active !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [active]);
  function close() {
    dialog.current?.close();
    setActive(null);
    opener.current?.focus();
  }
  function open(i, e) {
    opener.current = e.currentTarget;
    setActive(i);
  }
  function move(n) {
    setActive((active + n + items.length) % items.length);
  }
  return (
    <>
      <SEO
        title="Studio gallery"
        path="/gallery"
        description="Explore a curated stock-photography gallery of spa interiors, relaxation massage and beauty rituals for our fictional Toronto wellness studio."
      />
      <PageIntro
        image="still-life"
        eyebrow="A glimpse of the feeling"
        title={
          <>
            An intimate view
            <br />
            of <em>indulgence.</em>
          </>
        }
      >
        Golden light. Intimate details. Stock photographs that bring our
        fictional studio concept to life.
      </PageIntro>
      <section className="wrap section">
        <div className="filter-row" role="group" aria-label="Filter gallery">
          {[
            "All",
            "The studio",
            "Skin rituals",
            "Massage",
            "Beauty",
            "Wellness",
            "The details",
          ].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setLimit(8);
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {items.slice(0, limit).map((g, i) => (
            <figure key={g.image}>
              <button
                className="gallery-open"
                onClick={(e) => open(i, e)}
                aria-label={`View photograph: ${g.caption}`}
              >
                <Photo
                  name={g.image}
                  alt={g.alt}
                  sizes="(max-width: 760px) 43vw, 29vw"
                />
                <span>
                  View photograph <ArrowRight size={18} />
                </span>
              </button>
              <figcaption>
                <span>{g.tag}</span>
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        {items.length > limit && (
          <div className="load-more">
            <button
              type="button"
              className="button button-glass"
              onClick={() => setLimit(limit + 8)}
            >
              View more photographs <ArrowRight size={17} />
            </button>
          </div>
        )}
        <p className="caption">
          Licensed stock imagery from Pexels. These are illustrative settings,
          not photographs of an operating studio.
        </p>
      </section>
      <dialog
        className="lightbox"
        ref={dialog}
        aria-label="Studio photograph"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        {active !== null && (
          <>
            <button
              className="lightbox-close"
              autoFocus
              aria-label="Close photograph"
              onClick={close}
            >
              <X />
            </button>
            <img
              src={`/images/noire/${items[active].image}-1800.webp`}
              alt={items[active].alt}
            />
            <div className="lightbox-bottom">
              <button aria-label="Previous photograph" onClick={() => move(-1)}>
                <ChevronLeft />
              </button>
              <p>
                {items[active].caption} · {active + 1} / {items.length}
              </p>
              <button aria-label="Next photograph" onClick={() => move(1)}>
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
      <ContactCTA />
    </>
  );
}
export function Booking() {
  return (
    <>
      <SEO
        title="Find your escape — demo request"
        path="/booking"
        description="Choose from 36 illustrative spa services, a preferred date and your sample details. Review, edit and copy a demo request. No real appointment or server submission."
      />
      <PageIntro
        image="oils"
        eyebrow="Your escape, made simple"
        title={
          <>
            Make a little
            <br />
            <em>time for you.</em>
          </>
        }
      >
        A ritual, a preferred moment, a few simple details. Prepare your demo
        request in four easy steps.
      </PageIntro>
      <section className="section wrap booking-layout">
        <aside className="booking-aside">
          <Photo name="still-life" alt={photoDescriptions["still-life"]} />
          <Eyebrow>A thoughtful beginning</Eyebrow>
          <h2>
            Yours to <em>choose.</em>
          </h2>
          <p>
            Take your time. Every service, price and preference is illustrative.
          </p>
          <ul className="check-list">
            <li>
              <Check />
              36 services, six collections
            </li>
            <li>
              <Check />
              Edit before you copy
            </li>
            <li>
              <Check />
              No payment or real booking
            </li>
          </ul>
          <TextLink to="/services">Still exploring? Browse rituals</TextLink>
        </aside>
        <LeadForm />
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>Some reassurance</Eyebrow>
          <h2>
            Clear from
            <br />
            <em>the beginning.</em>
          </h2>
        </div>
        <FAQAccordion limit={3} />
      </section>
    </>
  );
}
export function Contact() {
  return (
    <>
      <SEO
        title="A thoughtful conversation"
        path="/contact"
        description="Explore our fictional Toronto spa enquiry experience. Service questions, shared escapes and clear demo-only contact details. Local preview; nothing is sent."
      />
      <PageIntro
        image="candles"
        eyebrow="A conversation starts here"
        title={
          <>
            We’re here
            <br />
            <em>to listen.</em>
          </>
        }
      >
        A question about a ritual? A little help choosing? Make yourself
        comfortable and explore the demo enquiry.
      </PageIntro>
      <section className="section wrap contact-layout">
        <aside>
          <div className="contact-intro">
            <Eyebrow>Your kind of welcome</Eyebrow>
            <h2>
              Let’s find
              <br />
              <em>your feeling.</em>
            </h2>
            <p>
              Use sample details to explore the form. Your enquiry stays with
              you.
            </p>
          </div>
          <div className="contact-info-card">
            <MapPin />
            <div>
              <h3>Concept location</h3>
              <p>Toronto, Ontario, Canada</p>
              <small>Illustrative city only. No real spa address.</small>
            </div>
          </div>
          <div className="contact-info-card">
            <Mail />
            <div>
              <h3>Agency contact</h3>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <p>{brand.phone} · Placeholder</p>
            </div>
          </div>
          <div className="hours-card">
            <div>
              <Clock3 size={22} />
              <h3>A week, softly imagined.</h3>
            </div>
            <dl>
              <dt>Monday – Friday</dt>
              <dd>10:00 – 19:00</dd>
              <dt>Saturday</dt>
              <dd>10:00 – 18:00</dd>
              <dt>Sunday</dt>
              <dd>11:00 – 17:00</dd>
            </dl>
            <p className="caption">
              Example hours for this fictional concept. No operating spa or real
              availability.
            </p>
          </div>
          <Photo
            className="contact-still"
            name="nails"
            alt={photoDescriptions.nails}
          />
        </aside>
        <LeadForm contact />
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>A little clarity</Eyebrow>
          <h2>
            Good questions.
            <br />
            <em>Clear answers.</em>
          </h2>
          <TextLink to="/faq">All questions</TextLink>
        </div>
        <FAQAccordion limit={4} />
      </section>
      <ContactCTA />
    </>
  );
}
export function FAQ() {
  const [query, setQuery] = useState("");
  const items = faqs.filter(([q, a]) =>
    `${q} ${a}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <SEO
        title="A little clarity — FAQs"
        path="/faq"
        description="Search clear answers about our fictional Toronto studio: demo appointments, spa service concepts, illustrative prices and accessibility."
      />
      <PageIntro
        eyebrow="Everything to know before your escape"
        image="still-life"
        title={
          <>
            Good questions.
            <br />
            <em>Thoughtful answers.</em>
          </>
        }
      >
        A little clarity makes the experience more comfortable.
      </PageIntro>
      <section className="section wrap faq-page">
        <div className="search-field">
          <Search size={21} aria-hidden="true" />
          <label className="sr-only" htmlFor="faq-search">
            Search questions
          </label>
          <input
            id="faq-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try appointments, prices or accessibility…"
          />
          {query && (
            <button
              type="button"
              className="icon-button"
              aria-label="Clear FAQ search"
              onClick={() => setQuery("")}
            >
              <X size={18} />
            </button>
          )}
        </div>
        <p className="caption" role="status">
          {items.length} answers to explore
        </p>
        {items.length ? (
          <FAQAccordion items={items} />
        ) : (
          <div className="empty-state">
            <h2>A different question?</h2>
            <p>Try a shorter search, or explore the demo enquiry.</p>
            <TextLink to="/contact">Explore an enquiry</TextLink>
          </div>
        )}
      </section>
      <ContactCTA />
    </>
  );
}
export function NotFound() {
  return (
    <>
      <SEO
        title="Page not found"
        description="Find your way back to our fictional Toronto wellness studio."
      />
      <PageIntro
        eyebrow="A different path"
        title={
          <>
            Let’s find your
            <br />
            <em>way back.</em>
          </>
        }
      >
        This page is not part of the studio collection.
      </PageIntro>
      <div className="wrap not-found">
        <ButtonLink to="/">Back to the studio</ButtonLink>
      </div>
    </>
  );
}
