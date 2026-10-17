import { useState, useRef, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
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
        title="The art of indulgence"
        description="Enter a cinematic Toronto spa concept: relaxation massage, beautiful skin rituals and an unhurried escape. A fictional luxury wellness studio by MSPixelPulse."
      />
      <section className="hero">
        <div className="hero-media">
          <Photo
            name="hero"
            alt="An adult guest enjoying a gentle facial ritual, wrapped in soft rose linen"
            eager
            sizes="(max-width: 700px) 100vw, 70vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <Eyebrow light>Toronto wellness · The NOIRÉ edit</Eyebrow>
          <h1>
            The art of
            <br />
            <em>indulgence.</em>
          </h1>
          <p>
            Warmth on the skin. Stillness in the mind.
            <br />A world that asks nothing of you.
          </p>
          <div className="button-row">
            <ButtonLink to="/booking" light>
              Begin your escape
            </ButtonLink>
            <TextLink to="/services">Discover the rituals</TextLink>
          </div>
        </div>
        <div className="hero-note">
          <span className="fine-label">THE SIGNATURE FEELING</span>
          <p>
            Beautifully personal.
            <br />
            <em>Deliciously unhurried.</em>
          </p>
          <span className="fine-label">
            A fictional studio, imagined by MSPixelPulse
          </span>
        </div>
        <div className="hero-bottom wrap">
          <a href="#welcome">
            SCROLL TO DISCOVER <ArrowRight size={16} aria-hidden="true" />
          </a>
          <span>RELAXATION MASSAGE · SKIN · RITUALS</span>
          <span>01 / THE ART OF INDULGENCE</span>
        </div>
      </section>
      <section id="welcome" className="welcome-section section wrap">
        <div className="welcome-images">
          <div className="arch-photo">
            <Photo
              name="portrait"
              alt="An adult woman in a white towel wrap taking a quiet moment with eyes closed"
            />
          </div>
          <div className="welcome-inset">
            <Photo
              name="oils"
              alt="Ceramic spa vessels and an amber bottle in warm light"
            />
          </div>
          <span className="image-index">01 / THE FEELING</span>
        </div>
        <div className="welcome-copy">
          <Eyebrow>A world apart</Eyebrow>
          <h2>
            Not just a pause.
            <br />
            An{" "}
            <em>
              awakening
              <br />
              of the senses.
            </em>
          </h2>
          <p className="large-copy">
            Some places are made to be seen.
            <br />
            This one is imagined to be felt.
          </p>
          <p>
            The hush of soft linen. The glow of warm light. A ritual that
            unfolds at your pace. Discover a Toronto wellness concept where
            every little detail invites you to let go.
          </p>
          <TextLink to="/experience">Enter the experience</TextLink>
          <div className="signature-note">
            <FlowerMark />
            <span>
              Considered care.
              <br />
              Extraordinary little moments.
            </span>
          </div>
        </div>
      </section>
      <section className="signature-section section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow light>01 — The treatment collection</Eyebrow>
              <h2>
                Your ritual.
                <br />
                <em>Your kind of luxury.</em>
              </h2>
            </div>
            <div>
              <p>
                From a slow, soothing massage to a beautiful skin ritual. A
                little more care. A little less world.
              </p>
              <TextLink to="/services">Explore all treatments</TextLink>
            </div>
          </div>
          <div className="signature-treatments">
            {treatments.slice(0, 3).map((t, i) => (
              <ServiceCard item={t} index={i} key={t.id} />
            ))}
          </div>
          <p className="caption">
            Fictional services · Illustrative CAD prices · No real appointments
            or payments
          </p>
        </div>
      </section>
      <section className="atmosphere">
        <Photo
          name="pool"
          alt="An atmospheric indoor pool with arched windows and golden reflections; illustrative spa setting"
          sizes="100vw"
        />
        <div className="atmosphere-shade" />
        <div className="atmosphere-copy wrap">
          <Eyebrow light>02 — The art of relaxation</Eyebrow>
          <h2>
            Let the world
            <br />
            <em>melt away.</em>
          </h2>
          <p>
            Quiet water. Golden light. The beautiful luxury of being present.
          </p>
          <ButtonLink to="/experience" light>
            Find your stillness
          </ButtonLink>
        </div>
        <span className="atmosphere-caption">
          Atmosphere study · Licensed stock setting, not an operating facility
        </span>
      </section>
      <section className="ritual-story section wrap">
        <div className="ritual-copy">
          <Eyebrow>03 — Beauty & wellness rituals</Eyebrow>
          <h2>
            A softer touch.
            <br />A deeper <em>feeling.</em>
          </h2>
          <p>
            Beautiful skin rituals and gentle, relaxation-focused care. Imagined
            with comfort at the centre, and a little indulgence in every detail.
          </p>
          <TextLink to="/services/botanical-facial">
            Discover skin rituals
          </TextLink>
          <span className="editorial-word" aria-hidden="true">
            Touch.
          </span>
        </div>
        <div className="ritual-main">
          <Photo
            name="skin"
            alt="An adult guest receiving a facial massage in a warmly lit spa"
          />
        </div>
        <div className="ritual-detail">
          <Photo
            name="body"
            alt="Hands applying a gentle relaxation massage to an adult guest’s back"
          />
          <p>
            THE QUIET LUXURY
            <br />
            OF CONSIDERED CARE
          </p>
        </div>
      </section>
      <section className="studio-feature">
        <div className="studio-photo">
          <Photo
            name="robe"
            alt="A charcoal robe hanging in a dark, softly lit spa interior"
          />
        </div>
        <div className="studio-copy">
          <Eyebrow light>04 — Behind the feeling</Eyebrow>
          <h2>
            Dim the lights.
            <br />
            <em>Elevate the moment.</em>
          </h2>
          <p>
            Deep, enveloping tones. Warm textures. A thoughtful welcome. An
            imagined sanctuary with room to be entirely yourself.
          </p>
          <div className="studio-details">
            <div>
              <span>01</span>
              <h3>A warm arrival</h3>
              <p>Settle in. Share your preferences. Find your pace.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Nothing hurried</h3>
              <p>Space for every small detail, from beginning to end.</p>
            </div>
          </div>
          <TextLink to="/about">The studio story</TextLink>
        </div>
      </section>
      <section className="section gallery-preview wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>05 — A visual escape</Eyebrow>
            <h2>
              Beauty in
              <br />
              <em>every detail.</em>
            </h2>
          </div>
          <TextLink to="/gallery">Enter the gallery</TextLink>
        </div>
        <div className="editorial-gallery">
          {[
            gallery[6],
            {
              image: "scalp",
              alt: "An adult guest receiving a gentle head massage",
              caption: "Time to surrender",
            },
            {
              image: "still-life",
              alt: "A candle, bath sphere and soft linen beside a window",
              caption: "The smallest details",
            },
            {
              image: "beauty",
              alt: "An adult guest with eyes closed during a gentle facial massage",
              caption: "Beautifully at ease",
            },
          ].map((g, i) => (
            <Link
              to="/gallery"
              key={g.image}
              className={`gallery-preview-item gallery-piece-${i}`}
            >
              <Photo name={g.image} alt={g.alt} />
              <span>
                {g.caption}
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="booking-invitation section">
        <div className="wrap booking-invitation-grid">
          <div>
            <Eyebrow light>06 — Make a little time for you</Eyebrow>
            <h2>
              Your escape
              <br />
              begins with
              <br />
              <em>a little intention.</em>
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Choose a ritual.
              <br />
              Make the moment yours.
            </p>
            <ol>
              <li>
                <span>01</span>Explore six considered treatment concepts
              </li>
              <li>
                <span>02</span>Choose your preferred day and time
              </li>
              <li>
                <span>03</span>Review your sample request, at your pace
              </li>
            </ol>
            <ButtonLink to="/booking" light>
              Explore an appointment
            </ButtonLink>
            <p className="caption">
              A transparent demo. Nothing is booked, charged or sent.
            </p>
          </div>
        </div>
      </section>
      <section className="section faq-section wrap">
        <div>
          <Eyebrow>A few thoughtful details</Eyebrow>
          <h2>
            Before your
            <br />
            <em>escape.</em>
          </h2>
          <TextLink to="/faq">All questions</TextLink>
        </div>
        <FAQAccordion limit={4} />
      </section>
      <ContactCTA />
    </>
  );
}
function FlowerMark() {
  return <Sparkles size={30} strokeWidth={1} aria-hidden="true" />;
}
const photoDescriptions = {
  water: "Still water in a warm stone-lined spa pool",
  "still-life": "A candle, bath sphere and folded linen beside a window",
  portrait: "An adult woman in a towel wrap, eyes closed in a quiet spa moment",
  robe: "A soft robe hanging in a dark, warmly illuminated spa interior",
  pool: "Arched windows and golden reflections over an ornate indoor spa pool",
  oils: "Spa vessels and aromatic oil on marble",
  candles: "Candles and body-care essentials on a dark surface",
  ritual: "An adult spa guest resting beside candlelight",
};
function PageIntro({ eyebrow, title, children, image = "water" }) {
  return (
    <section className="page-intro">
      <div className="page-intro-media">
        <Photo name={image} alt={photoDescriptions[image]} eager />
      </div>
      <div className="page-intro-shade" />
      <div className="wrap page-intro-copy">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
        <span className="page-intro-index" aria-hidden="true">
          WELLNESS / THE NOIRÉ EDIT
        </span>
      </div>
    </section>
  );
}
export function Services() {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(
    ["Massage", "Skin", "Rituals"].includes(params.get("category"))
      ? params.get("category")
      : "All",
  );
  return (
    <>
      <SEO
        title="Treatments & rituals"
        path="/services"
        description="Explore illustrative relaxation massages, botanical facials and spa rituals at our Toronto wellness studio concept. Clear demo CAD pricing and treatment details."
      />
      <PageIntro
        image="portrait"
        eyebrow="The treatment collection"
        title={
          <>
            The ritual collection.
            <br />A little <em>indulgence.</em>
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
      <section className="treatment-detail">
        <div className="treatment-detail-copy">
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
        image="robe"
        eyebrow="The studio story"
        title={
          <>
            A world apart.
            <br />A personal <em>invitation.</em>
          </>
        }
      >
        An imagined neighbourhood retreat, created around the simple pleasure of
        taking your time.
      </PageIntro>
      <section className="editorial-split wrap">
        <Photo
          name="beauty"
          alt="An adult guest resting with eyes closed during a gentle facial massage"
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
            "Enveloping colour, warm textures and a little theatrical light. Details that support the feeling, beautifully.",
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
        image="pool"
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
          name="water"
          alt="Still water and warm stone in an illustrative indoor spa pool"
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
                aria-label={`View photograph: ${g.caption}`}
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
        title="Explore an appointment"
        path="/booking"
        description="Try a transparent demo appointment request for our fictional Toronto wellness studio. Choose a treatment and review your request. No booking, payment or server submission."
      />
      <PageIntro
        image="oils"
        eyebrow="Your invitation to indulge"
        title={
          <>
            Make the moment
            <br />
            <em>yours.</em>
          </>
        }
      >
        Choose a ritual and a preferred time. This demonstration prepares a
        request for you to review; it does not make a real booking.
      </PageIntro>
      <section className="wrap section booking-layout">
        <div className="request-steps" aria-label="Appointment preview steps">
          <span>01 / Choose your ritual</span>
          <span>02 / Share your preferences</span>
          <span>03 / Review your request</span>
        </div>
        <aside>
          <Photo
            name="still-life"
            alt="A candle and soft linen beside a window"
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
        image="candles"
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
          <Photo name="oils" alt="Ceramic spa vessels and oil in warm light" />
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
