/** Attach only a visible clip after critical page loading; every opt-out keeps its poster. */
export function startAmbientPlayback(
  video,
  { source, page, view, preference, connection, observe, onError },
) {
  let visible = !observe,
    loaded = page.readyState === "complete",
    disposed = false,
    blocked = false,
    attempt = 0;
  const eligible = () =>
    visible &&
    !page.hidden &&
    !preference.matches &&
    page.documentElement.dataset.motion !== "paused" &&
    !connection?.saveData;
  const pause = () => {
    attempt++;
    video.pause();
  };
  async function sync() {
    if (disposed) return;
    if (!eligible()) {
      pause();
      return;
    }
    if (!loaded || blocked || !video.paused) return;
    const token = ++attempt;
    video.muted = true;
    if (!video.getAttribute("src")) video.src = source;
    try {
      await video.play();
    } catch {
      if (!disposed && token === attempt && eligible()) {
        blocked = true;
        onError();
      }
    }
  }
  const load = () => {
    loaded = true;
    void sync();
  };
  const playing = () => {
    if (!eligible()) pause();
  };
  const error = () => {
    blocked = true;
    pause();
    if (!disposed) onError();
  };
  const observer = observe?.((entry) => {
    visible = entry.isIntersecting;
    void sync();
  });
  observer?.observe(video);
  view.addEventListener("load", load);
  view.addEventListener("wellness-motion", sync);
  page.addEventListener("visibilitychange", sync);
  preference.addEventListener("change", sync);
  connection?.addEventListener?.("change", sync);
  video.addEventListener("playing", playing);
  video.addEventListener("error", error);
  void sync();
  return () => {
    disposed = true;
    pause();
    observer?.disconnect();
    view.removeEventListener("load", load);
    view.removeEventListener("wellness-motion", sync);
    page.removeEventListener("visibilitychange", sync);
    preference.removeEventListener("change", sync);
    connection?.removeEventListener?.("change", sync);
    video.removeEventListener("playing", playing);
    video.removeEventListener("error", error);
  };
}
