import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Photo } from "./StudioUI";
import { createHeroPlayback } from "./heroPlayback";
export default function HeroFilm() {
  const video = useRef(null);
  const playback = useRef(null);
  const [state, setState] = useState({ playing: false, error: false });
  useEffect(() => {
    playback.current = createHeroPlayback(video.current, {
      page: document,
      view: window,
      preference: window.matchMedia("(prefers-reduced-motion: reduce)"),
      observe:
        "IntersectionObserver" in window
          ? (notify) =>
              new IntersectionObserver(([entry]) => notify(entry), {
                threshold: 0.15,
              })
          : null,
      onState: (next) => setState((current) => ({ ...current, ...next })),
    });
    return () => playback.current.destroy();
  }, []);
  return (
    <div className={`hero-film ${state.error ? "has-error" : ""}`}>
      <Photo
        name="film"
        alt="An adult guest relaxing in a warm stone-lined spa pool"
        eager
        sizes="(max-width: 700px) 92vw, 43vw"
      />
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/noire/film-800.webp"
        aria-label="A quiet moment in a spa pool. Illustrative stock film."
      />
      <button
        type="button"
        className="film-control hero-film-control"
        onClick={() => playback.current?.toggle()}
        aria-label={state.playing ? "Pause film in hero" : "Play film in hero"}
      >
        {state.playing ? (
          <Pause size={18} aria-hidden="true" />
        ) : (
          <Play size={18} aria-hidden="true" />
        )}
        <span>{state.playing ? "Pause film" : "Play film"}</span>
      </button>
      {state.error && (
        <p className="hero-film-error" role="status">
          Enjoy the still image. Play to retry.
        </p>
      )}
    </div>
  );
}
