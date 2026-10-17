import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, ChevronDown, ArrowRight, Check } from "lucide-react";
import { categories, treatments } from "../data/studio";
import { searchTreatments } from "../data/discovery";
export default function ServicePicker({
  value = "",
  onSelect,
  label = "Choose your service",
  compact = false,
}) {
  const id = useId();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const input = useRef(null);
  const results = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const selected = treatments.find((t) => t.id === value);
  const items = searchTreatments({ query, category });
  function close() {
    dialog.current.close();
    setOpen(false);
    trigger.current?.focus();
  }
  function choose(item) {
    onSelect(item);
    close();
  }
  function arrows(e) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    if (e.target === input.current && ["Home", "End"].includes(e.key)) return;
    const buttons = [...results.current.querySelectorAll("[data-option]")];
    if (!buttons.length) return;
    e.preventDefault();
    const index = buttons.indexOf(document.activeElement);
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? buttons.length - 1
          : e.key === "ArrowDown"
            ? (index + 1) % buttons.length
            : index < 0
              ? buttons.length - 1
              : (index - 1 + buttons.length) % buttons.length;
    buttons[next].focus();
  }
  return (
    <div className={`service-picker ${compact ? "picker-compact" : ""}`}>
      <button
        type="button"
        className="picker-trigger"
        ref={trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen(true);
          dialog.current.showModal();
          input.current?.focus();
        }}
      >
        {!compact && <Search size={19} aria-hidden="true" />}
        <span>{selected ? selected.title : label}</span>
        <ChevronDown size={17} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        id={id}
        className="service-dialog"
        aria-labelledby={`${id}-title`}
        onClose={() => setOpen(false)}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <div className="picker-heading">
          <div>
            <p className="eyebrow">A ritual for every mood</p>
            <h2 id={`${id}-title`}>
              Find your <em>feeling.</em>
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close service chooser"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <div className="search-field">
          <Search size={20} aria-hidden="true" />
          <label className="sr-only" htmlFor={`${id}-search`}>
            Search services in chooser
          </label>
          <input
            ref={input}
            id={`${id}-search`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try facial, warm stone, or a quiet moment…"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (items[0]) choose(items[0]);
              } else arrows(e);
            }}
          />
          {query && (
            <button
              type="button"
              className="icon-button"
              aria-label="Clear chooser search"
              onClick={() => {
                setQuery("");
                input.current.focus();
              }}
            >
              <X size={17} />
            </button>
          )}
        </div>
        <div
          className="filter-row"
          role="group"
          aria-label="Chooser categories"
        >
          {["All", ...categories].map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c === "All" ? "All services" : c}
            </button>
          ))}
        </div>
        <p className="caption" role="status">
          {items.length} services · Demo CAD prices · Arrow keys to browse
        </p>
        <ul className="picker-results" ref={results} onKeyDown={arrows}>
          {items.map((t) => (
            <li key={t.id}>
              <button type="button" data-option onClick={() => choose(t)}>
                <span className="picker-thumb">
                  <img
                    loading="lazy"
                    src={`/images/noire/${t.image}-480.webp`}
                    alt=""
                    width="64"
                    height="64"
                  />
                </span>
                <span>
                  <strong>{t.title}</strong>
                  <small>
                    {t.category} · {t.duration} min · Demo CAD ${t.price}
                    {t.couples ? " for two" : ""}
                  </small>
                </span>
                {value === t.id ? (
                  <Check size={19} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </li>
          ))}
        </ul>
        {!items.length && (
          <div className="empty-state">
            <Search />
            <h3>A different kind of quiet?</h3>
            <p>Try a shorter search or another category.</p>
            <button
              type="button"
              className="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                input.current.focus();
              }}
            >
              Reset search
            </button>
          </div>
        )}
        <div className="picker-footer">
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("All");
              choose(null);
            }}
          >
            Clear selection
          </button>
          <Link to="/services" onClick={close}>
            Explore the full catalogue <ArrowRight size={17} />
          </Link>
        </div>
      </dialog>
    </div>
  );
}
