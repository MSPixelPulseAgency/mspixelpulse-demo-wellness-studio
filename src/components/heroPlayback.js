/** Visibility-aware playback. The poster is independent of media availability. */
export function createHeroPlayback(
  video,
  { page, view, preference, observe, onState },
) {
  let visible = !observe;
  let loaded = page.readyState === "complete";
  let manualPause = false;
  let manualPlay = false;
  let blocked = false;
  let disposed = false;
  let attempt = 0;
  const pause = () => {
    attempt++;
    video.pause();
  };
  const eligible = () =>
    visible &&
    !page.hidden &&
    !manualPause &&
    (!preference.matches || manualPlay);
  async function sync() {
    if (disposed) return;
    if (!eligible()) {
      pause();
      return;
    }
    if (!loaded || blocked || !video.paused) return;
    const token = ++attempt;
    video.muted = true;
    if (!video.getAttribute("src")) video.src = "/videos/pool-ritual.mp4";
    try {
      await video.play();
    } catch {
      if (!disposed && token === attempt) {
        blocked = true;
        onState({ playing: false, error: true });
      }
    }
  }
  const onLoad = () => {
    loaded = true;
    void sync();
  };
  const onVisibility = () => {
    void sync();
  };
  const onPreference = () => {
    manualPlay = false;
    void sync();
  };
  const onPlaying = () => {
    if (!eligible()) {
      pause();
      return;
    }
    for (const other of page.querySelectorAll("video"))
      if (other !== video) other.pause();
    onState({ playing: true, error: false });
  };
  const onPause = () => onState({ playing: false });
  const onError = () => {
    blocked = true;
    pause();
    onState({ playing: false, error: true });
  };
  const observer = observe?.((entry) => {
    visible = entry.isIntersecting;
    void sync();
  });
  observer?.observe(video);
  page.addEventListener("visibilitychange", onVisibility);
  view.addEventListener("load", onLoad);
  preference.addEventListener("change", onPreference);
  video.addEventListener("playing", onPlaying);
  video.addEventListener("pause", onPause);
  video.addEventListener("error", onError);
  void sync();
  return {
    toggle() {
      if (!video.paused) {
        manualPause = true;
        pause();
      } else {
        manualPause = false;
        manualPlay = true;
        blocked = false;
        loaded = true;
        onState({ error: false });
        // A failed network request can be retried through the explicit play control.
        if (video.error) video.load();
        void sync();
      }
    },
    destroy() {
      disposed = true;
      pause();
      observer?.disconnect();
      page.removeEventListener("visibilitychange", onVisibility);
      view.removeEventListener("load", onLoad);
      preference.removeEventListener("change", onPreference);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
    },
  };
}
