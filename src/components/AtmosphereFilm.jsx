import { useEffect, useRef, useState } from "react";
import { Play, Pause, Film } from "lucide-react";
export default function AtmosphereFilm({ className = "" }) {
  const video = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const v = video.current;
    const pause = () => v.pause();
    const visibility = () => {
      if (document.hidden) pause();
    };
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([e]) => {
              if (!e.isIntersecting) pause();
            },
            { threshold: 0.1 },
          )
        : null;
    observer?.observe(v);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  async function toggle() {
    if (playing) {
      video.current.pause();
      return;
    }
    setError("");
    setLoading(true);
    if (!loaded) {
      video.current.src = "/videos/pool-ritual.mp4";
      setLoaded(true);
    }
    try {
      await video.current.play();
    } catch {
      setLoading(false);
      setError("The film is unavailable. Enjoy the still image or try again.");
    }
  }
  return (
    <div className={`atmosphere-film ${className}`}>
      <video
        ref={video}
        poster="/images/noire/film-800.webp"
        preload="none"
        muted
        playsInline
        loop
        aria-label="Illustrative film of an adult woman in a swimsuit resting in a spa pool"
        onPlay={() => {
          setPlaying(true);
          setLoading(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setLoading(false);
          setError(
            "The film could not load. The still image remains available.",
          );
        }}
      />
      <span className="film-chip">
        <Film size={14} aria-hidden="true" /> A moment in motion
      </span>
      <button
        type="button"
        className="film-control"
        onClick={toggle}
        aria-label={
          loading ? "Loading film" : playing ? "Pause film" : "Play spa film"
        }
      >
        {loading ? (
          <span className="loading-ring" />
        ) : playing ? (
          <Pause size={19} />
        ) : (
          <Play size={19} />
        )}
        <span>
          {loading ? "Loading film…" : playing ? "Pause film" : "Play spa film"}
        </span>
      </button>
      <p className="film-disclosure">Illustrative stock setting · Muted film</p>
      {error && (
        <p role="status" className="film-error">
          {error}
        </p>
      )}
    </div>
  );
}
