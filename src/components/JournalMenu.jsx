import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
export default function JournalMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef(null),
    trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
        e.stopPropagation();
      } else if (e.type === "pointerdown" && !root.current?.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("pointerdown", close);
    root.current?.addEventListener("keydown", close);
    const element = root.current;
    return () => {
      document.removeEventListener("pointerdown", close);
      element?.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <div className="journal-menu" ref={root}>
      <button
        type="button"
        ref={trigger}
        aria-expanded={open}
        aria-controls="journal-links"
        className="journal-trigger"
        onClick={() => setOpen(!open)}
      >
        Journal
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="journal-links" id="journal-links">
          <Link to="/wellness-tips">Wellness tips</Link>
          <Link to="/reviews">Sample reviews</Link>
          <Link to="/feedback">Share feedback</Link>
        </div>
      )}
    </div>
  );
}
