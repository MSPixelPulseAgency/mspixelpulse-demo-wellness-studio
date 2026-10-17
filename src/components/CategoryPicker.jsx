import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "../data/studio";
export default function CategoryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState("");
  const root = useRef(null),
    trigger = useRef(null),
    search = useRef(null),
    options = useRef(null);
  const id = useId();
  const items = ["All", ...categories].filter((c) =>
    c.toLowerCase().includes(query.toLowerCase().trim()),
  );
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  function keys(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    if (
      !["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key) ||
      (["Home", "End"].includes(e.key) && e.target === search.current)
    )
      return;
    const buttons = [...options.current.querySelectorAll("button")];
    if (!buttons.length) return;
    e.preventDefault();
    const i = buttons.indexOf(document.activeElement);
    buttons[
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? buttons.length - 1
          : e.key === "ArrowDown"
            ? (i + 1) % buttons.length
            : (i - 1 + buttons.length) % buttons.length
    ].focus();
  }
  return (
    <div className="category-combobox" ref={root} onKeyDown={keys}>
      <button
        type="button"
        className="picker-trigger"
        ref={trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen(!open);
          if (!open) requestAnimationFrame(() => search.current?.focus());
        }}
      >
        <span>{value === "All" ? "All categories" : value}</span>
        <ChevronDown size={17} />
      </button>
      {open && (
        <div className="category-options">
          <label className="sr-only" htmlFor={id + "-search"}>
            Search categories
          </label>
          <input
            id={id + "-search"}
            ref={search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a category…"
          />
          <div
            role="listbox"
            aria-label="Service categories"
            id={id}
            ref={options}
          >
            {items.map((c) => (
              <button
                type="button"
                role="option"
                key={c}
                aria-selected={value === c}
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                  setQuery("");
                  trigger.current?.focus();
                }}
              >
                {c === "All" ? "All categories" : c}
              </button>
            ))}
            {!items.length && <p role="status">No matching categories.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
