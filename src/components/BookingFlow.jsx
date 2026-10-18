import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Copy, Send } from "lucide-react";
import { treatments } from "../data/studio";
import ServicePicker from "./ServicePicker";
const labels = [
  "Service",
  "Date",
  "Time",
  "Your details",
  "Review",
  "Submit",
  "Complete",
];
export default function BookingFlow() {
  const [params] = useSearchParams();
  const [data, setData] = useState(() => ({
    service: treatments.some((t) => t.id === params.get("treatment"))
      ? params.get("treatment")
      : "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    consent: false,
    website: "",
  }));
  const [step, setStep] = useState(0),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [delivery, setDelivery] = useState(null),
    [result, setResult] = useState(null),
    [copied, setCopied] = useState(false);
  const heading = useRef(null),
    identity = useRef(crypto.randomUUID()),
    started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
    let active = true;
    fetch("/api/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active) setDelivery(d?.booking === true);
      })
      .catch(() => {
        if (active) setDelivery(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const selected = treatments.find((t) => t.id === data.service);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const min = tomorrow.toLocaleDateString("en-CA");
  const max = new Date();
  max.setFullYear(max.getFullYear() + 1);
  const update = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setError("");
    identity.current = crypto.randomUUID();
    setCopied(false);
  };
  const move = (next) => {
    setStep(next);
    setError("");
    requestAnimationFrame(() => heading.current?.focus());
  };
  function next(e) {
    e.preventDefault();
    if (step === 0 && !data.service) {
      setError("Choose a service or ask us to help you choose.");
      return;
    }
    if (step === 1) {
      const date = String(new FormData(e.currentTarget).get("date") || "");
      if (!date || date < min) {
        setError("Choose a valid preferred date.");
        return;
      }
      setData((current) => ({ ...current, date }));
    }
    if (
      step === 3 &&
      (data.name.trim().length < 2 || data.phone.replace(/\D/g, "").length < 7)
    ) {
      setError(
        "Enter your full name and a phone number with at least seven digits.",
      );
      return;
    }
    move(Math.min(5, step + 1));
  }
  const summary = `DEMO APPOINTMENT REQUEST — NOT A RESERVATION\nService: ${selected?.title || "Help me choose"}\nIllustrative price: ${selected ? "CAD $" + selected.price : "To explore"}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nNotes: ${data.notes || "None"}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setError("Select and copy the summary below.");
    }
  }
  async function send() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          kind: "booking",
          requestId: identity.current,
          startedAt: started.current,
        }),
      });
      const body = await response.json();
      if (!response.ok)
        throw Error(
          body.fields
            ? Object.values(body.fields).join(" ")
            : body.error || "The demo request could not be sent.",
        );
      setResult(body);
      move(6);
    } catch (e) {
      setError(
        e.message || "Connection unavailable. Your request is not confirmed.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="request-widget booking-v4">
      <ol
        className="booking-progress"
        aria-label="Appointment request progress"
      >
        {labels.map((label, i) => (
          <li
            key={label}
            className={i === step ? "current" : i < step ? "complete" : ""}
          >
            <button
              type="button"
              disabled={i > step || busy || step === 6}
              aria-current={i === step ? "step" : undefined}
              onClick={() => move(i)}
            >
              <span>{i < step ? <Check size={15} /> : i + 1}</span>
              {label}
            </button>
          </li>
        ))}
      </ol>
      <form className="lead-form" onSubmit={next}>
        <p className="form-notice">
          Fictional studio · Demo requests only · No real reservations or
          payments.
        </p>
        <div className="form-title">
          <p className="eyebrow">Step {step + 1} of 7</p>
          <h2 ref={heading} tabIndex={-1}>
            {
              [
                "Find your kind of calm.",
                "A day for yourself.",
                "Your preferred moment.",
                "A little about you.",
                "Every detail, considered.",
                "Ready when you are.",
                "A thoughtful beginning.",
              ][step]
            }
          </h2>
        </div>
        {step === 0 && (
          <>
            <p className="field-label">Your service</p>
            <ServicePicker
              value={data.service}
              onSelect={(t) => update("service", t?.id || "")}
            />
            <button
              type="button"
              className={`help-choice ${data.service === "help" ? "selected" : ""}`}
              onClick={() => update("service", "help")}
              aria-pressed={data.service === "help"}
            >
              Not sure? Help me choose
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
              </div>
            )}
          </>
        )}
        {step === 1 && (
          <label>
            Preferred date
            <input
              type="date"
              name="date"
              required
              min={min}
              max={max.toLocaleDateString("en-CA")}
              value={data.date}
              onChange={(e) => update("date", e.target.value)}
            />
            <small>
              A preference from tomorrow onward; availability is not
              represented.
            </small>
          </label>
        )}
        {step === 2 && (
          <label>
            Preferred time
            <select
              name="time"
              required
              value={data.time}
              onChange={(e) => update("time", e.target.value)}
            >
              <option value="" disabled>
                Choose a preference
              </option>
              {["Morning", "Afternoon", "Evening", "Flexible"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <small>Illustrative time windows, not appointment slots.</small>
          </label>
        )}
        {step === 3 && (
          <>
            <div className="form-grid">
              <label>
                Full name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </label>
            </div>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                required
                minLength={7}
                maxLength={32}
                autoComplete="tel"
                pattern="[+()0-9 .\-]{7,32}"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </label>
            <label>
              Notes <span className="optional">Optional</span>
              <textarea
                name="notes"
                rows={3}
                maxLength={1000}
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="A simple preference; please avoid medical or sensitive details."
              />
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                required
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              I understand this is a demo request, not a reservation. Submitting
              sends these details to MSPixelPulse and a copy to my email.
              Request safeguards expire after 24 hours; email copies follow the
              recipients’ retention policies.
            </label>
            <div className="honey-field" aria-hidden="true">
              <label>
                Leave this field empty
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>
            </div>
          </>
        )}
        {step >= 4 && (
          <>
            <pre className="request-summary">{summary}</pre>
            {step < 6 && (
              <div className="button-row">
                <button
                  type="button"
                  className="button button-glass"
                  onClick={() => move(3)}
                >
                  Edit details
                </button>
                <button type="button" className="text-link" onClick={copy}>
                  {copied ? "Copied" : "Copy demo request"}
                  <Copy size={17} />
                </button>
              </div>
            )}
          </>
        )}
        {step === 5 && (
          <div className="delivery-note">
            <strong>
              {delivery === true
                ? "Demo email delivery is available."
                : delivery === null
                  ? "Checking demo delivery…"
                  : "Email delivery setup is pending."}
            </strong>
            <p>
              {delivery === true
                ? "The studio team receives a clearly labeled demo request through MSPixelPulse's inquiry system. No appointment is reserved and no payment is taken."
                : "You can review and copy your request. Nothing has been emailed or stored. The agency must configure delivery before submissions are available."}
            </p>
          </div>
        )}
        {step === 6 && result && (
          <div className="confirmation" role="status">
            <Check size={30} />
            <h3>Demo request received.</h3>
            <p>{result.message}</p>
            <p>
              Reference: <strong>{result.reference}</strong>
            </p>
            <p>
              {result.deliveryNote ||
                "Email status: accepted by the delivery provider. This does not guarantee inbox delivery."}
            </p>
            <button
              type="button"
              className="button"
              onClick={() => {
                setData({
                  service: "",
                  date: "",
                  time: "",
                  name: "",
                  email: "",
                  phone: "",
                  notes: "",
                  consent: false,
                  website: "",
                });
                setResult(null);
                identity.current = crypto.randomUUID();
                started.current = Date.now();
                move(0);
              }}
            >
              Start a fresh request
            </button>
          </div>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {step < 6 && (
          <div className="form-actions">
            {step > 0 && (
              <button
                type="button"
                className="button button-glass"
                onClick={() => move(step - 1)}
                disabled={busy}
              >
                <ArrowLeft size={17} />
                Back
              </button>
            )}
            {step < 5 ? (
              <button type="submit" className="button">
                {step === 4 ? "Continue to submit" : "Continue"}
                <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                className="button"
                disabled={busy || delivery !== true}
                onClick={send}
              >
                {busy
                  ? "Sending demo request…"
                  : delivery
                    ? "Submit demo request"
                    : "Delivery not configured"}
                <Send size={17} />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
