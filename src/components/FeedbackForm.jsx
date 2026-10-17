import { useEffect, useRef, useState } from "react";
import { treatments } from "../data/studio";
import ServicePicker from "./ServicePicker";
export default function FeedbackForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    rating: "",
    service: "",
    feedback: "",
    publish: false,
    consent: false,
    website: "",
  });
  const [ready, setReady] = useState(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [result, setResult] = useState(null),
    [preview, setPreview] = useState(false);
  const id = useRef(crypto.randomUUID()),
    started = useRef(0);
  const title = useRef(null);
  useEffect(() => {
    started.current = Date.now();
    let active = true;
    fetch("/api/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active) setReady(d?.feedback === true);
      })
      .catch(() => {
        if (active) setReady(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const update = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setPreview(false);
    setError("");
    id.current = crypto.randomUUID();
  };
  async function submit(e) {
    e.preventDefault();
    if (!data.service) {
      setError("Choose the service your feedback relates to.");
      return;
    }
    if (!ready) {
      setPreview(true);
      requestAnimationFrame(() => title.current?.focus());
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          kind: "feedback",
          requestId: id.current,
          startedAt: started.current,
        }),
      });
      const body = await r.json();
      if (!r.ok) throw Error(body.error || "Feedback could not be received.");
      setResult(body);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="lead-form feedback-form request-widget" onSubmit={submit}>
      <p className="form-notice">
        Demo feedback · Private by default · Nothing is published automatically.
      </p>
      <h2 ref={title} tabIndex={-1}>
        {result
          ? "Thank you for the thought."
          : "A little thought. A better experience."}
      </h2>
      {result ? (
        <div role="status">
          <p>{result.message}</p>
          <p>
            Reference: <strong>{result.reference}</strong>
          </p>
        </div>
      ) : (
        <>
          <div className="form-grid">
            <label>
              Name
              <input
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
            Rating
            <select
              required
              value={data.rating}
              onChange={(e) => update("rating", e.target.value)}
            >
              <option value="" disabled>
                Choose your rating
              </option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </label>
          <div>
            <p className="field-label">Service</p>
            <ServicePicker
              value={data.service}
              onSelect={(t) => update("service", t?.id || "")}
            />
          </div>
          <label>
            Your feedback
            <textarea
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={data.feedback}
              onChange={(e) => update("feedback", e.target.value)}
              placeholder="Tell us about the demo experience. Please avoid health or sensitive details."
            />
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              checked={data.publish}
              onChange={(e) => update("publish", e.target.checked)}
            />
            You may consider publishing my feedback after moderation.{" "}
            <span className="optional">Optional</span>
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              required
              checked={data.consent}
              onChange={(e) => update("consent", e.target.checked)}
            />
            I understand this is a fictional demo. If submission is enabled, my
            feedback is stored privately for up to 30 days for moderation; it
            does not become public automatically.
          </label>
          <div className="honey-field" aria-hidden="true">
            <label>
              Leave empty
              <input
                tabIndex={-1}
                value={data.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </label>
          </div>
          {ready === false && (
            <p className="delivery-note">
              Private feedback storage setup is pending. You can prepare a
              preview; nothing will be sent or saved.
            </p>
          )}
          {preview && (
            <section className="feedback-preview" role="status">
              <h3>Feedback preview prepared.</h3>
              <p>Nothing was submitted or stored.</p>
              <p>
                <strong>{data.name}</strong> · {data.rating}/5 ·{" "}
                {treatments.find((t) => t.id === data.service)?.title}
              </p>
              <blockquote>{data.feedback}</blockquote>
            </section>
          )}
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="button"
            disabled={busy || ready === null}
          >
            {busy
              ? "Sending privately…"
              : ready
                ? "Submit demo feedback"
                : "Prepare feedback preview"}
          </button>
        </>
      )}
    </form>
  );
}
