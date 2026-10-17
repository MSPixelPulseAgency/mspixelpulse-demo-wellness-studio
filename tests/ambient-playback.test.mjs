import { test } from "node:test";
import assert from "node:assert/strict";
import { startAmbientPlayback } from "../src/components/ambientPlayback.js";
function fixture({ reduced = false, saveData = false, reject = false } = {}) {
  const video = new EventTarget(),
    page = new EventTarget(),
    view = new EventTarget(),
    preference = new EventTarget(),
    connection = new EventTarget();
  let notify,
    errors = 0,
    calls = 0;
  Object.assign(page, {
    hidden: false,
    readyState: "loading",
    documentElement: { dataset: {} },
  });
  preference.matches = reduced;
  connection.saveData = saveData;
  Object.assign(video, {
    src: "",
    paused: true,
    getAttribute: () => video.src,
    pause: () => {
      video.paused = true;
    },
    play: async () => {
      calls++;
      if (reject) throw Error();
      video.paused = false;
      video.dispatchEvent(new Event("playing"));
    },
  });
  const cleanup = startAmbientPlayback(video, {
    source: "/test-distinct.mp4",
    page,
    view,
    preference,
    connection,
    observe: (callback) => {
      notify = callback;
      return { observe() {}, disconnect() {} };
    },
    onError: () => errors++,
  });
  return {
    video,
    page,
    view,
    preference,
    connection,
    cleanup,
    enter: () => notify({ isIntersecting: true }),
    leave: () => notify({ isIntersecting: false }),
    errors: () => errors,
    calls: () => calls,
  };
}
const flush = () => new Promise((resolve) => setImmediate(resolve));
test("ambient video waits for load and visibility, then pauses offscreen and hidden", async () => {
  const h = fixture();
  h.enter();
  assert.equal(h.video.src, "");
  h.view.dispatchEvent(new Event("load"));
  await flush();
  assert.equal(h.video.src, "/test-distinct.mp4");
  assert.equal(h.video.paused, false);
  h.leave();
  assert.equal(h.video.paused, true);
  h.enter();
  h.page.hidden = true;
  h.page.dispatchEvent(new Event("visibilitychange"));
  assert.equal(h.video.paused, true);
  h.page.hidden = false;
  h.page.dispatchEvent(new Event("visibilitychange"));
  await flush();
  assert.equal(h.video.paused, false);
  h.cleanup();
  assert.equal(h.video.paused, true);
});
test("reduced motion, data saver and global pause preserve the poster without a download", async () => {
  for (const option of [{ reduced: true }, { saveData: true }]) {
    const h = fixture(option);
    h.enter();
    h.view.dispatchEvent(new Event("load"));
    await flush();
    assert.equal(h.video.src, "");
    assert.equal(h.calls(), 0);
    h.cleanup();
  }
  const h = fixture();
  h.page.documentElement.dataset.motion = "paused";
  h.enter();
  h.view.dispatchEvent(new Event("load"));
  await flush();
  assert.equal(h.calls(), 0);
  h.page.documentElement.dataset.motion = "auto";
  h.view.dispatchEvent(new Event("wellness-motion"));
  await flush();
  assert.equal(h.video.paused, false);
  h.cleanup();
});
test("autoplay rejection and media error retain a quiet poster fallback without repeated requests", async () => {
  const h = fixture({ reject: true });
  h.enter();
  h.view.dispatchEvent(new Event("load"));
  await flush();
  assert.equal(h.errors(), 1);
  h.leave();
  h.enter();
  await flush();
  assert.equal(h.calls(), 1);
  h.cleanup();
  const other = fixture();
  other.enter();
  other.view.dispatchEvent(new Event("load"));
  await flush();
  other.video.dispatchEvent(new Event("error"));
  assert.equal(other.video.paused, true);
  assert.equal(other.errors(), 1);
  other.cleanup();
});
