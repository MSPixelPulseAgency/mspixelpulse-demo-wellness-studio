import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Copy } from "lucide-react";
import { treatments } from "../data/studio";
export default function LeadForm({ contact = false }) {
  const [params] = useSearchParams();
  const [draft, setDraft] = useState(null);
  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const result = useRef(null);
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  function submit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    if (d.date && d.date < minDate) {
      setError("Choose a date from tomorrow onwards.");
      return;
    }
    if (d.name.trim().length < 2) {
      setError("Please enter a name with at least two characters.");
      return;
    }
    setError("");
    setDraft(d);
    setRequest(d);
    setCopied(false);
    setTimeout(() => result.current?.focus(), 0);
  }
  const text = request
    ? `DEMO ${contact ? "ENQUIRY" : "APPOINTMENT REQUEST"} — NOT SENT\nName: ${request.name}\nEmail: ${request.email}\nTreatment: ${request.service}\nPreferred date: ${request.date || "Not specified"}\nTime: ${request.time || "Not specified"}\nMessage: ${request.message || "None"}\nNo real booking or payment has been made.`
    : "";
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError("");
    } catch {
      setError(
        "Copy is unavailable in this browser. Select and copy the request text below.",
      );
    }
  }
  return request ? (
    <section
      className="request-success"
      ref={result}
      tabIndex="-1"
      aria-labelledby="request-title"
    >
      <Check size={32} />
      <p className="eyebrow">Your demo request is ready</p>
      <h2 id="request-title">
        A moment, <em>well considered.</em>
      </h2>
      <p>
        This is a preview only. Nothing was sent, no appointment was made, and
        your details have not been saved to a server.
      </p>
      <pre>{text}</pre>
      <div className="button-row">
        <button className="button" onClick={copy}>
          {copied ? "Copied" : "Copy demo request"}
          <Copy size={16} />
        </button>
        <button
          className="text-link"
          onClick={() => {
            setRequest(null);
            setError("");
          }}
        >
          Edit request
        </button>
        <button
          className="text-link"
          onClick={() => {
            setRequest(null);
            setDraft(null);
            setError("");
            setCopied(false);
          }}
        >
          Clear details
        </button>
      </div>
      <p role="status">
        {copied ? "Demo request copied to your clipboard." : ""}
      </p>
      {error && <p role="alert">{error}</p>}
    </section>
  ) : (
    <form className="lead-form" onSubmit={submit}>
      <p className="form-notice">
        Demo only · Use sample details. Do not enter medical or sensitive
        information. Nothing is sent or saved to a server.
      </p>
      <div className="form-grid">
        <label>
          Your name
          <input
            name="name"
            defaultValue={draft?.name ?? ""}
            autoComplete="name"
            required
            maxLength={80}
            placeholder="Alex Example"
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            name="email"
            defaultValue={draft?.email ?? ""}
            autoComplete="email"
            required
            maxLength={120}
            placeholder="alex@example.com"
          />
        </label>
        <label className="span-two">
          Your treatment
          <select
            name="service"
            defaultValue={
              draft?.service ||
              treatments.find((t) => t.id === params.get("treatment"))?.title ||
              ""
            }
            required
          >
            <option value="" disabled>
              Select a treatment
            </option>
            {treatments.map((t) => (
              <option key={t.id}>{t.title}</option>
            ))}
            <option>Help me choose</option>
          </select>
        </label>
        {!contact && (
          <>
            <label>
              Preferred date
              <input
                type="date"
                name="date"
                defaultValue={draft?.date ?? ""}
                min={minDate}
                required
              />
            </label>
            <label>
              Preferred time
              <select name="time" required defaultValue={draft?.time ?? ""}>
                <option value="" disabled>
                  Select a preference
                </option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Flexible</option>
              </select>
            </label>
          </>
        )}
        <label className="span-two">
          Anything else? <span className="optional">Optional</span>
          <textarea
            rows={4}
            name="message"
            defaultValue={draft?.message ?? ""}
            maxLength={1000}
            placeholder="A simple preference or question — no health details, please."
          />
        </label>
      </div>
      <label className="check-label">
        <input
          type="checkbox"
          required
          name="demoConsent"
          defaultChecked={!!draft?.demoConsent}
        />
        I understand this is a demonstration and no real appointment will be
        made.
      </label>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <button className="button" type="submit">
        Review demo {contact ? "enquiry" : "request"}
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
