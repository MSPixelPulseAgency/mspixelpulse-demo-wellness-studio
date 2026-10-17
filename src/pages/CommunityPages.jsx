import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpRight, Play, Search, Quote } from "lucide-react";
import { SEO, Eyebrow, ButtonLink, ContactCTA } from "../components/StudioUI";
import AmbientVideo from "../components/AmbientVideo";
import FeedbackForm from "../components/FeedbackForm";
export function CommunityHero({ name, eyebrow, title, children }) {
  return (
    <section className="page-intro wrap community-intro">
      <div className="page-intro-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
      <div className="page-intro-media">
        <AmbientVideo name={name} eager />
      </div>
    </section>
  );
}
const examples = [
  {
    name: "Sample guest A",
    service: "Facials",
    rating: 5,
    quote:
      "A clear menu, beautiful imagery and a request flow that feels easy to explore.",
  },
  {
    name: "Sample guest B",
    service: "Massage",
    rating: 4,
    quote:
      "The service details and illustrative prices made comparing the rituals straightforward.",
  },
  {
    name: "Sample guest C",
    service: "Wellness",
    rating: 5,
    quote:
      "A calm, thoughtful demo experience with room to choose a quieter pace.",
  },
];
export function Reviews() {
  const [query, setQuery] = useState(""),
    [rating, setRating] = useState("");
  const items = examples.filter(
    (r) =>
      (!rating || r.rating === Number(rating)) &&
      `${r.quote} ${r.service}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <SEO
        title="Thoughts on the experience — sample reviews"
        path="/reviews"
        description="Explore clearly labeled sample review layouts for our fictional Toronto wellness studio. No real customer testimonials or verified ratings are claimed."
      />
      <CommunityHero
        name="reviews"
        eyebrow="Thoughtfully shared"
        title={
          <>
            A little kindness.
            <br />
            <em>A lasting feeling.</em>
          </>
        }
      >
        An honest look at the review experience. This fictional studio has no
        published customer reviews.
      </CommunityHero>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Illustrative voices</Eyebrow>
            <h2>
              Words, with <em>care.</em>
            </h2>
          </div>
          <p>
            Every card below is a sample created to demonstrate the layout.
            These are not customer testimonials, verified visits or an overall
            studio rating.
          </p>
        </div>
        <div className="discovery-toolbar">
          <div className="search-field">
            <Search size={20} />
            <label className="sr-only" htmlFor="review-search">
              Search sample reviews
            </label>
            <input
              id="review-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the sample review layouts…"
            />
          </div>
          <label className="review-rating">
            Sample rating
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
            </select>
          </label>
        </div>
        <div className="reviews-grid">
          {items.map((r) => (
            <article className="review-card" key={r.name}>
              <span className="sample-badge">
                Demo example · Not a real review
              </span>
              <Quote size={32} aria-hidden="true" />
              <div
                className="stars"
                aria-label={`${r.rating} out of 5 illustrative stars`}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={19}
                    fill={n <= r.rating ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote>{r.quote}</blockquote>
              <p>
                {r.name}
                <small>{r.service} · Sample service</small>
              </p>
            </article>
          ))}
        </div>
        {!items.length && (
          <div className="empty-state">
            <h2>A little room for another thought.</h2>
            <p>No sample reviews match these filters.</p>
            <button
              className="button"
              onClick={() => {
                setQuery("");
                setRating("");
              }}
            >
              Clear review filters
            </button>
          </div>
        )}
        <div className="detail-callout">
          <div>
            <h3>Your feedback stays private.</h3>
            <p>
              Submissions require moderation before any publication. Publication
              permission is optional.
            </p>
          </div>
          <ButtonLink to="/feedback">Share a thought</ButtonLink>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
export function Feedback() {
  return (
    <>
      <SEO
        title="Share a thoughtful note — demo feedback"
        path="/feedback"
        description="Explore a private, moderated demo feedback form. Choose a service, share a rating and leave a thoughtful note. Publication consent is optional."
      />
      <CommunityHero
        name="feedback"
        eyebrow="Every detail matters"
        title={
          <>
            Your thoughts.
            <br />
            <em>Our next chapter.</em>
          </>
        }
      >
        Help shape the website experience. Keep your note simple and leave out
        private health information.
      </CommunityHero>
      <section className="section wrap feedback-layout">
        <aside>
          <Eyebrow>Shared with care</Eyebrow>
          <h2>
            A conversation,
            <br />
            <em>kept thoughtful.</em>
          </h2>
          <p>
            Feedback is about this demonstration website. There is no operating
            spa or actual treatment visit.
          </p>
          <ul className="check-list">
            <li>Private submission when configured</li>
            <li>Optional permission to publish</li>
            <li>Moderation before publication</li>
            <li>No fabricated customer reviews</li>
          </ul>
          <Link className="text-link" to="/reviews">
            See the sample review layouts
            <ArrowUpRight size={18} />
          </Link>
        </aside>
        <FeedbackForm />
      </section>
    </>
  );
}
const tips = [
  {
    title: "A small pause, anywhere.",
    tag: "Relaxation",
    image: "ritual",
    text: "Set aside a quiet moment. Sit comfortably, loosen your shoulders and let your attention settle on what is around you.",
  },
  {
    title: "Keep skincare simple.",
    tag: "Skin rituals",
    image: "mask",
    text: "Choose gentle products and follow their instructions. Skip abrasive scrubbing; personal skin concerns belong with a qualified clinician.",
    source:
      "https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101",
    sourceName: "American Academy of Dermatology",
  },
  {
    title: "Make room for water.",
    tag: "Everyday care",
    image: "water",
    text: "Keep a drink nearby and take regular breaks. Choose water when it suits you; individual fluid needs can vary.",
    source:
      "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/",
    sourceName: "NHS hydration guidance",
  },
  {
    title: "Arrive with a little space.",
    tag: "Before a spa visit",
    image: "robe",
    text: "For a real spa appointment, check the provider’s arrival guidance, bring comfortable clothing and ask about the products being used.",
  },
  {
    title: "Ease back into the day.",
    tag: "After a ritual",
    image: "massage",
    text: "Allow time to sit, get comfortable and decide what feels right next. Follow any aftercare guidance from your actual provider.",
  },
  {
    title: "Let fragrance be a choice.",
    tag: "Aromatherapy",
    image: "oils",
    text: "Choose unscented options if you prefer them. Never ingest essential oils or apply concentrated oils without appropriate product guidance.",
  },
  {
    title: "Notice one small thing.",
    tag: "Mindfulness",
    image: "sound",
    text: "Find a comfortable seat. Notice a sound, a colour or the feeling of your feet on the floor, without needing to change anything.",
  },
  {
    title: "Give evenings a softer edge.",
    tag: "Rest",
    image: "candles",
    text: "Build a wind-down routine that you enjoy. A quieter room, a book or time away from notifications can make an evening feel less rushed.",
    source: "https://www.nhs.uk/every-mind-matters/mental-health-issues/sleep/",
    sourceName: "NHS Every Mind Matters",
  },
  {
    title: "Choose one manageable step.",
    tag: "Everyday balance",
    image: "still-life",
    text: "A short break, a walk or a conversation can be a practical starting point. These ideas are general wellbeing inspiration, not personalised advice.",
  },
];
const guides = [
  {
    id: "AeXsfB2ud-o",
    title: "Face washing 101",
    channel: "American Academy of Dermatology",
    source:
      "https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101",
  },
  {
    id: "wfDTp2GogaQ",
    title: "Mindful breathing exercise",
    channel: "NHS Every Mind Matters",
    source:
      "https://www.berkshirehealthcare.nhs.uk/advice/how-breathing-can-reduce-stress-and-anxiety",
  },
];
function VideoGuide({ guide }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <article className="guide-card">
      <div className="guide-player">
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${guide.id}?autoplay=0&rel=0`}
            title={guide.title}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Load educational video: ${guide.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${guide.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              width="480"
              height="360"
            />
            <span>
              <Play size={22} />
              Load educational video
            </span>
          </button>
        )}
      </div>
      <div className="guide-copy">
        <p className="eyebrow">{guide.channel}</p>
        <h3>{guide.title}</h3>
        <p>
          Loads YouTube only after you choose to watch. Playback stays under
          your control.
        </p>
        <a
          className="text-link"
          href={guide.source}
          target="_blank"
          rel="noreferrer"
        >
          Read the official guide
          <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
export function WellnessTips() {
  return (
    <>
      <SEO
        title="The softer edit — wellness tips and video guides"
        path="/wellness-tips"
        description="Explore simple self-care ideas, gentle skincare basics and optional educational video guides from the AAD and NHS. General wellbeing inspiration, not medical advice."
      />
      <CommunityHero
        name="wellness-tips"
        eyebrow="The softer edit"
        title={
          <>
            Little rituals.
            <br />
            <em>Everyday possibility.</em>
          </>
        }
      >
        Simple ideas for a more considered pace. Explore a little, take what
        suits you and leave room for your own rhythm.
      </CommunityHero>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Small things, thoughtfully chosen</Eyebrow>
            <h2>
              A little care.
              <br />
              <em>Beyond the studio.</em>
            </h2>
          </div>
          <p>
            General self-care inspiration. These ideas do not diagnose, treat or
            replace advice from a qualified professional.
          </p>
        </div>
        <div className="tips-grid">
          {tips.map((t) => (
            <article className="tip-card" key={t.title}>
              <img
                src={`/images/noire/${t.image}-480.webp`}
                alt=""
                width="480"
                height="320"
                loading="lazy"
              />
              <div>
                <p className="eyebrow">{t.tag}</p>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                {t.source && (
                  <a
                    className="text-link"
                    href={t.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.sourceName}
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>A little guidance</Eyebrow>
            <h2>
              Learn from
              <br />
              <em>credible voices.</em>
            </h2>
          </div>
          <p>
            Optional educational videos, separate from our silent ambient
            imagery. No YouTube player loads until you choose one.
          </p>
        </div>
        <div className="guides-grid">
          {guides.map((g) => (
            <VideoGuide key={g.id} guide={g} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
