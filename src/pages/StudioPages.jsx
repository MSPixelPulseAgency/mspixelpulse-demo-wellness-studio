import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sun,
  Heart,
} from "lucide-react";
import {
  SEO,
  Photo,
  ButtonLink,
  TextLink,
  Eyebrow,
  ServiceCard,
  ContactCTA,
  FAQAccordion,
} from "../components/StudioUI";
import LeadForm from "../components/LeadForm";
import { brand, treatments, gallery } from "../data/studio";
export function Home() {
  return (
    <>
      <SEO
        title="A slower kind of self-care"
        description="An editorial wellness studio concept in Toronto. Explore relaxation massage, botanical facials and thoughtful spa rituals. A fictional MSPixelPulse demo."
      />
      <section className="hero">
        <picture className="hero-picture">
          <source media="(max-width: 700px)" srcSet="/images/wellness/studio-960.webp" />
          <img className="photo" src="/images/wellness/studio-wide.webp" alt="A warm, sculptural spa room with arched plaster walls, linen and a treatment bed" width="1350" height="850" fetchPriority="high" decoding="async" />
        </picture>
        <div className="hero-shade" />
        <div className="hero-content">
          <Eyebrow light>Wellness, beautifully unhurried</Eyebrow>
          <h1>
            A slower kind
            <br />
            of <em>self-care.</em>
          </h1>
          <p>
            Thoughtful treatments. Quiet surroundings.
            <br />A little time that belongs entirely to you.
          </p>
          <ButtonLink to="/services" light>
            Discover your ritual
          </ButtonLink>
        </div>
        <div className="hero-bottom">
          <span>A Toronto wellness studio concept</span>
          <span>
            Massage <i /> Skin <i /> Rituals
          </span>
          <a
            href="#welcome"
            aria-label="Scroll to unwind — explore the studio introduction"
          >
            SCROLL TO UNWIND ↓
          </a>
        </div>
      </section>
      <section id="welcome" className="intro section wrap">
        <Eyebrow>A gentle invitation</Eyebrow>
        <div className="intro-grid">
          <h2>
            Less doing.
            <br />
            More <em>being.</em>
          </h2>
          <div>
            <p className="large-copy">
              Some days call for a softer pace. A quiet space. Care that feels
              personal, from the first hello to the final moment.
            </p>
            <p>
              Our fictional studio brings the feeling of a thoughtful spa to
              life — through considered rituals, natural textures and an
              unhurried approach to self-care.
            </p>
            <TextLink to="/about">Meet the studio</TextLink>
          </div>
        </div>
        <div className="values-line">
          <span>
            <Leaf />
            Considered care
          </span>
          <span>
            <Sun />A softer pace
          </span>
          <span>
            <Heart />
            Comfort comes first
          </span>
        </div>
      </section>
      <section className="section treatments-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>The treatment collection</Eyebrow>
              <h2>
                Find your <em>kind of calm.</em>
              </h2>
            </div>
            <TextLink to="/services">All treatments</TextLink>
          </div>
          <div className="treatments-grid">
            {treatments.slice(0, 3).map((t, i) => (
              <ServiceCard key={t.id} item={t} index={i} />
            ))}
          </div>
          <p className="caption">
            Fictional services. Illustrative prices in CAD. No real appointments
            or payments.
          </p>
        </div>
      </section>
      <section className="experience-feature">
        <div className="experience-photo">
          <Photo
            name="details"
            alt="Amber spa bottles, natural textures and carefully folded towels"
          />
          <span className="photo-caption">THE BEAUTY IS IN THE DETAILS</span>
        </div>
        <div className="experience-copy">
          <Eyebrow>The studio experience</Eyebrow>
          <h2>
            Designed for
            <br />a deeper <em>pause.</em>
          </h2>
          <p>
            Warm light. Soft linen. A thoughtful introduction before every
            treatment. Our concept is built around a simple feeling: being cared
            for, without being hurried.
          </p>
          <div className="numbered-note">
            <span>01</span>
            <div>
              <h3>Arrive as you are</h3>
              <p>
                Make space to settle in, share your preferences and choose your
                pace.
              </p>
            </div>
          </div>
          <div className="numbered-note">
            <span>02</span>
            <div>
              <h3>Let the day soften</h3>
              <p>
                Explore a gentle ritual, with comfort at the centre of the
                experience.
              </p>
            </div>
          </div>
          <TextLink to="/experience">Step inside</TextLink>
        </div>
      </section>
      <section className="studio-quote wrap">
        <Eyebrow>Our philosophy</Eyebrow>
        <p>
          “Self-care doesn’t need to be
          <br />
          another thing to <em>get right.</em>
          <br />
          It can simply be time for you.”
        </p>
        <span>A thought from our fictional studio</span>
      </section>
      <section className="section gallery-preview wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>A glimpse inside</Eyebrow>
            <h2>
              Soft light. <em>Small details.</em>
            </h2>
          </div>
          <TextLink to="/gallery">Explore the gallery</TextLink>
        </div>
        <div className="gallery-triptych">
          {gallery.slice(0, 3).map((g, i) => (
            <Link
              to="/gallery"
              key={g.image}
              className={`gallery-preview-item item-${i}`}
            >
              <Photo name={g.image} alt={g.alt} />
              <span>{g.caption}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section faq-section wrap">
        <div>
          <Eyebrow>Before your visit</Eyebrow>
          <h2>
            A few <em>good things</em>
            <br />
            to know.
          </h2>
          <TextLink to="/faq">All questions</TextLink>
        </div>
        <FAQAccordion limit={4} />
      </section>
      <ContactCTA />
    </>
  );
}
function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="page-intro wrap">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </section>
  );
}
export function Services() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <SEO
        title="Treatments & rituals"
        path="/services"
        description="Explore illustrative relaxation massages, botanical facials and spa rituals at our Toronto wellness studio concept. Clear demo CAD pricing and treatment details."
      />
      <PageIntro
        eyebrow="The treatment collection"
        title={
          <>
            A little care.
            <br />A lasting <em>impression.</em>
          </>
        }
      >
        Choose a ritual that feels right for your day. Each experience is
        imagined with comfort, clarity and a softer pace in mind.
      </PageIntro>
      <section className="wrap section treatment-catalogue">
        <div className="filter-row" role="group" aria-label="Filter treatments">
          {["All", "Massage", "Skin", "Rituals"].map((f) => (
            <button
              key={f}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f === "All" ? "All treatments" : f}
            </button>
          ))}
        </div>
        <p className="caption" role="status">
          {
            treatments.filter((t) => filter === "All" || t.category === filter)
              .length
          }{" "}
          treatments · Illustrative CAD prices · No real availability
        </p>
        <div className="treatments-grid">
          {treatments
            .filter((t) => filter === "All" || t.category === filter)
            .map((t, i) => (
              <ServiceCard key={t.id} item={t} index={i} />
            ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
export function Treatment() {
  const { id } = useParams();
  const t = treatments.find((t) => t.id === id);
  if (!t) return <NotFound />;
  return (
    <>
      <SEO
        title={t.title}
        path={`/services/${t.id}`}
        description={`${t.description} Explore this fictional ${t.duration}-minute wellness experience, with illustrative CAD pricing.`}
      />
      <section className="treatment-detail wrap">
        <div>
          <Link className="back-link" to="/services">
            ← Back to treatments
          </Link>
          <Eyebrow>
            {t.category} · {t.duration} minutes
          </Eyebrow>
          <h1>{t.title}</h1>
          <p className="large-copy">{t.description}</p>
          <p className="detail-price">
            CAD ${t.price} <small>Illustrative demo price</small>
          </p>
          <ButtonLink to={`/booking?treatment=${t.id}`}>
            Explore this appointment
          </ButtonLink>
          <p className="caption">
            No payment. No real availability or booking.
          </p>
        </div>
        <Photo name={t.image} alt={t.alt} eager />
      </section>
      <section className="section detail-description wrap">
        <div>
          <Eyebrow>The experience</Eyebrow>
          <h2>
            Thoughtfully <em>considered.</em>
          </h2>
          <p>{t.note}</p>
        </div>
        <ol>
          {t.includes.map((v, i) => (
            <li key={v}>
              <span>0{i + 1}</span>
              {v}
            </li>
          ))}
        </ol>
      </section>
      <section className="section faq-section wrap">
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <h2>
            Before your <em>pause.</em>
          </h2>
        </div>
        <FAQAccordion limit={3} />
      </section>
      <ContactCTA />
    </>
  );
}
export function About() {
  return (
    <>
      <SEO
        title="Our story"
        path="/about"
        description="Meet the idea behind MSPixelPulse Wellness Studio, a fictional Toronto spa concept inspired by considered care, natural materials and a slower rhythm."
      />
      <PageIntro
        eyebrow="The studio story"
        title={
          <>
            A quiet space.
            <br />
            An open <em>invitation.</em>
          </>
        }
      >
        An imagined neighbourhood retreat, created around the simple pleasure of
        taking your time.
      </PageIntro>
      <section className="editorial-split wrap">
        <Photo
          name="studio"
          alt="Softly sculpted arches in an intimate, warm-toned spa room"
          eager
        />
        <div>
          <Eyebrow>Care, without the hurry</Eyebrow>
          <h2>
            Space to feel
            <br />
            like <em>yourself.</em>
          </h2>
          <p>
            Wellness Studio began as a design question: what would a local spa
            feel like if every detail invited you to slow down?
          </p>
          <p>
            The result is a fictional Toronto studio concept by MSPixelPulse. An
            expression of warm hospitality, clear treatment choices and care
            that puts comfort first.
          </p>
          <p>
            There are no invented awards, practitioner biographies or client
            reviews here. Just a thoughtful picture of what a more personal
            wellness experience could be.
          </p>
          <TextLink to="/experience">Discover the experience</TextLink>
        </div>
      </section>
      <section className="section wrap three-values">
        {[
          [
            "01",
            "Personal, by nature",
            "A conversation before a ritual. Preferences welcomed. An experience imagined around the individual.",
          ],
          [
            "02",
            "Quiet, by design",
            "A restrained palette, natural textures and space to breathe. Details that support the feeling, gently.",
          ],
          [
            "03",
            "Clear, from the start",
            "Illustrative prices, honest descriptions and a transparent demo request flow. No hidden promises.",
          ],
        ].map(([n, h, p]) => (
          <article key={n}>
            <span>{n}</span>
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
        title="The studio experience"
        path="/experience"
        description="Step into an imagined Toronto wellness studio, from a warm welcome to considered spa rituals. Stock photography illustrates this fictional studio concept."
      />
      <PageIntro
        eyebrow="Step inside"
        title={
          <>
            The art of
            <br />
            <em>slowing down.</em>
          </>
        }
      >
        A place imagined for quieter moments, warm welcomes and a little
        breathing room.
      </PageIntro>
      <div className="wide-photo">
        <Photo
          name="interior"
          alt="A quiet spa interior with natural curtains, soft lighting and a treatment bed"
          eager
        />
      </div>
      <section className="section wrap experience-steps">
        <div>
          <Eyebrow>Your visit, imagined</Eyebrow>
          <h2>
            Nothing rushed.
            <br />
            Everything <em>considered.</em>
          </h2>
          <p>
            These steps describe a fictional studio experience. Photography
            represents an atmosphere, not a verified physical location.
          </p>
        </div>
        <ol>
          {[
            [
              "A warm welcome",
              "Time to arrive, put the day down and settle into your surroundings.",
            ],
            [
              "A moment to connect",
              "A simple conversation about comfort, preferences and the ritual you have chosen.",
            ],
            [
              "Your kind of quiet",
              "An unhurried treatment concept, with space to speak up or simply relax.",
            ],
            [
              "A gentle return",
              "A quiet finish and time to get ready for the rest of your day.",
            ],
          ].map(([h, p], i) => (
            <li key={h}>
              <span>0{i + 1}</span>
              <div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <ContactCTA />
    </>
  );
}
export function Gallery() {
  const [active, setActive] = useState(null);
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
        eyebrow="A glimpse of the feeling"
        title={
          <>
            A quiet kind
            <br />
            of <em>beautiful.</em>
          </>
        }
      >
        Natural textures. Considered care. Stock photographs that bring our
        fictional studio concept to life.
      </PageIntro>
      <section className="wrap section">
        <div className="filter-row" role="group" aria-label="Filter gallery">
          {["All", "The studio", "Skin rituals", "Massage", "The details"].map(
            (f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ),
          )}
        </div>
        <div className="gallery-grid">
          {items.map((g, i) => (
            <figure key={g.image}>
              <button
                className="gallery-open"
                onClick={(e) => open(i, e)}
                aria-label={`Enlarge: ${g.caption}`}
              >
                <Photo name={g.image} alt={g.alt} />
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
              src={`/images/wellness/${items[active].image}.webp`}
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
        title="Explore an appointment"
        path="/booking"
        description="Try a transparent demo appointment request for our fictional Toronto wellness studio. Choose a treatment and review your request. No booking, payment or server submission."
      />
      <PageIntro
        eyebrow="Make a little time for you"
        title={
          <>
            Your next
            <br />
            <em>quiet moment.</em>
          </>
        }
      >
        Choose a ritual and a preferred time. This demonstration prepares a
        request for you to review; it does not make a real booking.
      </PageIntro>
      <section className="wrap section booking-layout">
        <aside>
          <Photo
            name="details"
            alt="A considered collection of spa oils and natural linen"
          />
          <h2>A gentle start.</h2>
          <p>
            Take your time. All services, prices and appointment preferences are
            illustrative.
          </p>
          <Link className="text-link" to="/services">
            Still choosing? Explore treatments <ArrowRight size={17} />
          </Link>
        </aside>
        <LeadForm />
      </section>
      <section className="section faq-section wrap">
        <div>
          <Eyebrow>Some reassurance</Eyebrow>
          <h2>
            Clear from
            <br />
            the <em>beginning.</em>
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
        title="Get in touch"
        path="/contact"
        description="Explore the contact experience for our fictional Toronto wellness studio. Placeholder contact details and a local demo enquiry form by MSPixelPulse."
      />
      <PageIntro
        eyebrow="A conversation starts here"
        title={
          <>
            We’re here
            <br />
            to <em>listen.</em>
          </>
        }
      >
        A question about the concept, or a preference to share? Explore the demo
        enquiry below.
      </PageIntro>
      <section className="wrap section contact-layout">
        <aside>
          <Eyebrow>Studio details</Eyebrow>
          <h2>
            Say <em>hello.</em>
          </h2>
          <dl>
            <dt>Concept location</dt>
            <dd>{brand.location}</dd>
            <dt>Agency email</dt>
            <dd>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </dd>
            <dt>Placeholder phone</dt>
            <dd>{brand.phone}</dd>
            <dt>Hours</dt>
            <dd>No operating hours — demonstration only</dd>
          </dl>
          <p className="caption">
            There is no real spa at this location. Email opens your mail app;
            the enquiry form does not transmit data.
          </p>
          <ButtonLink to="/booking">Explore an appointment</ButtonLink>
        </aside>
        <LeadForm contact />
      </section>
    </>
  );
}
export function FAQ() {
  return (
    <>
      <SEO
        title="Frequently asked questions"
        path="/faq"
        description="Clear answers about our fictional Toronto wellness studio: demo appointments, illustrative CAD prices, non-medical services and website accessibility."
      />
      <PageIntro
        eyebrow="A little clarity"
        title={
          <>
            Good questions.
            <br />
            <em>Thoughtful answers.</em>
          </>
        }
      >
        Everything to know about exploring this fictional wellness studio.
      </PageIntro>
      <section className="wrap section faq-page">
        <FAQAccordion />
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
        description="This page is not part of our wellness studio concept."
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
        That page could not be found.
      </PageIntro>
      <div className="wrap not-found">
        <ButtonLink to="/">Back to the studio</ButtonLink>
      </div>
    </>
  );
}
