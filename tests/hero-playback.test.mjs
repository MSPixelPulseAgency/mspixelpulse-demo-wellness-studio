import { test } from "node:test";
import assert from "node:assert/strict";
import { createHeroPlayback } from "../src/components/heroPlayback.js";
function setup({ reduced = false, ready = "complete", reject = false } = {}) {
  const page = new EventTarget(),
    view = new EventTarget(),
    preference = new EventTarget(),
    video = new EventTarget();
  Object.assign(page, {
    readyState: ready,
    hidden: false,
    querySelectorAll: () => [video],
  });
  preference.matches = reduced;
  let playCalls = 0,
    observation,
    state = {};
  Object.assign(video, {
    paused: true,
    src: "",
    muted: false,
    getAttribute: () => video.src,
    play: async () => {
      playCalls++;
      if (reject) throw new Error("Autoplay denied");
      video.paused = false;
      video.dispatchEvent(new Event("playing"));
    },
    pause: () => {
      video.paused = true;
      video.dispatchEvent(new Event("pause"));
    },
    load: () => {},
  });
  const playback = createHeroPlayback(video, {
    page,
    view,
    preference,
    observe: (notify) => {
      observation = notify;
      return { observe() {}, disconnect() {} };
    },
    onState: (next) => {
      state = { ...state, ...next };
    },
  });
  return {
    video,
    page,
    view,
    preference,
    playback,
    enter: () => observation({ isIntersecting: true }),
    leave: () => observation({ isIntersecting: false }),
    calls: () => playCalls,
    state: () => state,
  };
}
const flush = () => new Promise((resolve) => setImmediate(resolve));
test("hero starts only after load and visibility, then pauses offscreen and hidden", async () => {
  const h = setup({ ready: "loading" });
  h.enter();
  assert.equal(h.calls(), 0);
  assert.equal(h.video.src, "");
  h.view.dispatchEvent(new Event("load"));
  await flush();
  assert.equal(h.video.paused, false);
  assert.equal(h.video.muted, true);
  h.leave();
  assert.equal(h.video.paused, true);
  h.enter();
  await flush();
  assert.equal(h.video.paused, false);
  h.page.hidden = true;
  h.page.dispatchEvent(new Event("visibilitychange"));
  assert.equal(h.video.paused, true);
  h.page.hidden = false;
  h.page.dispatchEvent(new Event("visibilitychange"));
  await flush();
  assert.equal(h.video.paused, false);
  h.playback.destroy();
});
test("reduced motion prevents video download and autoplay; explicit play remains available", async () => {
  const h = setup({ reduced: true });
  h.enter();
  await flush();
  assert.equal(h.calls(), 0);
  assert.equal(h.video.src, "");
  h.playback.toggle();
  await flush();
  assert.equal(h.video.paused, false);
  h.preference.dispatchEvent(new Event("change"));
  assert.equal(h.video.paused, true);
  h.playback.destroy();
});
test("manual pause persists after visibility changes and autoplay rejection offers a retry", async () => {
  const h = setup();
  h.enter();
  await flush();
  h.playback.toggle();
  h.leave();
  h.enter();
  await flush();
  assert.equal(h.calls(), 1);
  assert.equal(h.video.paused, true);
  h.playback.destroy();
  const blocked = setup({ reject: true });
  blocked.enter();
  await flush();
  assert.equal(blocked.state().error, true);
  assert.equal(blocked.video.paused, true);
  blocked.leave();
  blocked.enter();
  await flush();
  assert.equal(blocked.calls(), 1);
  blocked.playback.toggle();
  await flush();
  assert.equal(blocked.calls(), 2);
  blocked.playback.destroy();
});
test("network failure preserves the still fallback and cleanup prevents late playback", async () => {
  const h = setup();
  h.enter();
  await flush();
  h.video.dispatchEvent(new Event("error"));
  assert.equal(h.state().error, true);
  assert.equal(h.video.paused, true);
  const calls = h.calls();
  h.playback.destroy();
  h.page.dispatchEvent(new Event("visibilitychange"));
  h.enter();
  await flush();
  assert.equal(h.calls(), calls);
});
