import { useEffect, useRef, useState } from "react";
import videos from "../data/videos.json";
import { startAmbientPlayback } from "./ambientPlayback";
export default function AmbientVideo({ name, eager = false, className = "" }) {
  const media = videos[name];
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const v = video.current;
    if (!v || !media) return;
    return startAmbientPlayback(v, {
      source: media.src,
      page: document,
      view: window,
      preference: matchMedia("(prefers-reduced-motion: reduce)"),
      connection: navigator.connection,
      observe:
        "IntersectionObserver" in window
          ? (notify) =>
              new IntersectionObserver(([entry]) => notify(entry), {
                threshold: 0.12,
              })
          : null,
      onError: () => setFailed(true),
    });
  }, [media]);
  if (!media) return null;
  return (
    <div
      className={`ambient-video ${className} ${failed ? "ambient-fallback" : ""}`}
    >
      <img
        src={media.poster}
        srcSet={`/videos/v4/${name}-480.webp 480w, /videos/v4/${name}-960.webp ${media.width}w`}
        sizes="(max-width:760px) 92vw, 48vw"
        width={media.width}
        height={media.height}
        alt={media.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
        onError={() => setFailed(true)}
      />
      <span className="ambient-caption">
        A moment of {name.includes("massage") ? "care" : "calm"} · Illustrative
        setting
      </span>
    </div>
  );
}
