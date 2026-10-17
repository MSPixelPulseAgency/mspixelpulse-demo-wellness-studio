import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { treatments } from "../data/studio";
import ServicePicker from "./ServicePicker";
export default function LeadForm({ contact = false }) {
  const [params] = useSearchParams();
  const empty = () => ({
    service: treatments.some((t) => t.id === params.get("treatment"))
      ? params.get("treatment")
      : "",
    date: "",
    time: "",
    name: "",
    email: "",
    message: "",
    consent: false,
    topic: "Service question",
  });
  const [data, setData] = useState(empty),
    [step, setStep] = useState(0),
    [error, setError] = useState(""),
    [copied, setCopied] = useState(false);
  const heading = useRef(null),
    form = useRef(null),
    result = useRef(null);
  const selected = treatments.find((t) => t.id === data.service);
  const review = contact ? step === 1 : step === 3;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const update = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setError("");
  };
  function move(next) {
    setStep(next);
    setError("");
    setCopied(false);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function submit(e) {
    e.preventDefault();
    setError("");
    if (!data.service) {
      setError("Choose a service, or select “Help me choose”.");
      return;
    }
    if (!contact && step === 1) {
      const values = new FormData(e.currentTarget);
      const preferredDate = String(values.get("date") || "");
      const preferredTime = String(values.get("time") || "");
      if (!preferredDate || preferredDate < minDate) {
        setError("Choose a date from tomorrow onwards.");
        return;
      }
      setData((d) => ({ ...d, date: preferredDate, time: preferredTime }));
    }
    if (contact || step === 2) {
      if (data.name.trim().length < 2) {
        setError("Please enter a name with at least two characters.");
        form.current?.querySelector('input[name="name"]')?.focus();
        return;
      }
      setStep(contact ? 1 : 3);
      requestAnimationFrame(() => result.current?.focus());
    } else move(step + 1);
  }
  const text = `DEMO ${contact ? "ENQUIRY" : "APPOINTMENT REQUEST"} — NOT SENT\nService: ${selected?.title || "Help me choose"}\n${selected ? `Illustrative price: CAD $${selected.price}${selected.couples ? " for two" : ""} · ${selected.duration} minutes\n` : ""}${contact ? `Topic: ${data.topic}` : `Preferred date: ${data.date}\nPreferred time: ${data.time}`}\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message || "None"}\nNo real appointment, payment or server submission.`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError("");
    } catch {
      setError("Copy is unavailable. Select and copy the request text below.");
    }
  }
  const service = (
    <div className="service-choice">
      <p className="field-label">Your service</p>
      <ServicePicker
        value={data.service}
        label="Search 36 spa & wellness rituals"
        onSelect={(t) => update("service", t?.id || "")}
      />
      <button
        type="button"
        className={`help-choice ${data.service === "help" ? "selected" : ""}`}
        aria-pressed={data.service === "help"}
        onClick={() => update("service", "help")}
      >
        Not sure? Help me choose <Sparkles size={15} />
      </button>
      {selected && (
        <div className="selected-service">
          <img
            src={`/images/noire/${selected.image}-480.webp`}
            alt=""
            width="68"
            height="68"
          />
          <div>
            <strong>{selected.title}</strong>
            <span>
              {selected.duration} min · Demo CAD ${selected.price}
              {selected.couples ? " for two" : ""}
            </span>
          </div>
          <Check size={19} />
        </div>
      )}
      {error && !data.service && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
    </div>
  );
  const details = (
    <>
      <div className="form-grid">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Alex Example"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="alex@example.com"
          />
        </label>
      </div>
      <label>
        Anything else? <span className="optional">Optional</span>
        <textarea
          name="message"
          rows={3}
          maxLength={1000}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="A simple preference or question — no health details, please."
        />
      </label>
      <label className="check-label">
        <input
          type="checkbox"
          required
          name="demoConsent"
          checked={data.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        I understand this is a demonstration and no real appointment will be
        made.
      </label>
    </>
  );
  return (
    <div className="request-widget">
      {!contact && (
        <ol className="booking-progress" aria-label="Demo request progress">
          {["Your ritual", "Day & time", "About you", "Review"].map(
            (label, i) => (
              <li
                key={label}
                className={i === step ? "current" : i < step ? "complete" : ""}
              >
                <button
                  type="button"
                  disabled={i > step}
                  aria-current={i === step ? "step" : undefined}
                  onClick={() => move(i)}
                >
                  <span>{i < step ? <Check size={14} /> : i + 1}</span>
                  {label}
                </button>
              </li>
            ),
          )}
        </ol>
      )}
      {review ? (
        <section
          className="request-success"
          ref={result}
          tabIndex={-1}
          aria-labelledby="request-title"
        >
          <span className="success-icon">
            <Check size={28} />
          </span>
          <p className="eyebrow">Prepared beautifully. Kept with you.</p>
          <h2 id="request-title">
            Your little <em>escape.</em>
          </h2>
          <p>
            This is a preview only. Nothing was sent, booked or saved to a
            server.
          </p>
          <pre>{text}</pre>
          <div className="button-row">
            <button type="button" className="button" onClick={copy}>
              {copied ? "Copied" : "Copy demo request"}
              <Copy size={17} />
            </button>
            <button
              type="button"
              className="button button-glass"
              onClick={() => move(contact ? 0 : 2)}
            >
              Edit details
            </button>
          </div>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setData({ ...empty(), service: "" });
              setCopied(false);
              move(0);
            }}
          >
            Clear all details
          </button>
          <p role="status">
            {copied ? "Demo request copied to your clipboard." : ""}
          </p>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
        </section>
      ) : (
        <form className="lead-form" onSubmit={submit} ref={form}>
          <p className="form-notice">
            Demo only · Use sample details. Nothing is sent or saved to a
            server.
          </p>
          <div className="form-title">
            <span className="eyebrow">
              {contact ? "A thoughtful conversation" : `Step ${step + 1} of 4`}
            </span>
            <h2 ref={heading} tabIndex={-1}>
              {contact
                ? "What’s on your mind?"
                : step === 0
                  ? "Find your kind of calm."
                  : step === 1
                    ? "A moment that suits you."
                    : "A little about you."}
            </h2>
          </div>
          {(contact || step === 0) && service}
          {contact && (
            <label>
              Enquiry topic
              <select
                value={data.topic}
                onChange={(e) => update("topic", e.target.value)}
              >
                {[
                  "Service question",
                  "A shared experience",
                  "Website accessibility",
                  "About this demo",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          )}
          {!contact && step === 1 && (
            <>
              <div className="selection-recap">
                <CalendarDays size={22} />
                <div>
                  <strong>{selected?.title || "Help me choose"}</strong>
                  <span>
                    {selected
                      ? `${selected.duration} minutes · Demo CAD $${selected.price}`
                      : "We’ll explore the sample menu together."}
                  </span>
                </div>
              </div>
              <div className="form-grid">
                <label>
                  Preferred date
                  <input
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    defaultValue={data.date}
                    onInput={(e) => update("date", e.currentTarget.value)}
                    onChange={(e) => update("date", e.target.value)}
                  />
                </label>
                <label>
                  Preferred time
                  <select
                    name="time"
                    required
                    value={data.time}
                    onChange={(e) => update("time", e.target.value)}
                  >
                    <option value="" disabled>
                      Select a preference
                    </option>
                    {["Morning", "Afternoon", "Evening", "Flexible"].map(
                      (t) => (
                        <option key={t}>{t}</option>
                      ),
                    )}
                  </select>
                </label>
              </div>
              <p className="caption">
                Preferences only. These are not available time slots.
              </p>
            </>
          )}
          {(contact || step === 2) && details}
          {error && data.service && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <div className="form-actions">
            {!contact && step > 0 && (
              <button
                type="button"
                className="button button-glass"
                onClick={() => move(step - 1)}
              >
                <ArrowLeft size={17} />
                Back
              </button>
            )}
            <button type="submit" className="button">
              {contact
                ? "Review demo enquiry"
                : step === 2
                  ? "Review demo request"
                  : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="caption">
            No real booking, payment or email. Please do not enter medical or
            sensitive information.
          </p>
        </form>
      )}
    </div>
  );
}
