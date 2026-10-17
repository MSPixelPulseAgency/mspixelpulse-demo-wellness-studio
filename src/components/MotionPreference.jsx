import { useState } from "react";
import { Pause, CirclePlay } from "lucide-react";
export default function MotionPreference() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      className="motion-preference text-link"
      aria-pressed={paused}
      onClick={() => {
        const next = !paused;
        setPaused(next);
        document.documentElement.dataset.motion = next ? "paused" : "auto";
        window.dispatchEvent(new Event("wellness-motion"));
      }}
    >
      {paused ? <CirclePlay size={18} /> : <Pause size={18} />}{" "}
      {paused ? "Resume ambient motion" : "Pause ambient motion"}
    </button>
  );
}
