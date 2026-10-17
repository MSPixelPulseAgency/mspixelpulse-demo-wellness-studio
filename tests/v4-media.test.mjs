import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import { treatments } from "../src/data/studio.js";
import { searchTreatments } from "../src/data/discovery.js";
const inventory = JSON.parse(
  fs.readFileSync(new URL("../docs/v4-video-sources.json", import.meta.url)),
);
const client = JSON.parse(
  fs.readFileSync(new URL("../src/data/videos.json", import.meta.url)),
);
test("every route and treatment has a distinct licensed, reviewed, optimized silent clip", () => {
  const names = [
    "home",
    "services",
    "about",
    "experience",
    "studio",
    "gallery",
    "booking",
    "contact",
    "faq",
    "reviews",
    "feedback",
    "wellness-tips",
    ...treatments.map((t) => t.id),
    "home-atmosphere",
    "experience-atmosphere",
  ];
  assert.equal(names.length, 50);
  assert.equal(new Set(names.map((n) => client[n]?.id)).size, 50);
  for (const name of names) {
    const v = inventory[name];
    assert.ok(v, name);
    assert.equal(v.reviewed, true);
    assert.equal(new URL(v.source).hostname, "www.pexels.com");
    assert.equal(v.license, "https://www.pexels.com/license/");
    const file = fs.readFileSync(new URL("../public" + v.src, import.meta.url));
    assert.equal(
      crypto.createHash("sha256").update(file).digest("hex"),
      v.sha256,
    );
    assert.ok(file.length < 850000, name);
    assert.ok(file.indexOf("moov") < file.indexOf("mdat"));
    assert.ok(file.includes(Buffer.from("avc1")));
    assert.ok(!file.includes(Buffer.from("mp4a")));
    assert.ok(v.duration >= 3 && v.duration <= 6.1, name);
    for (const width of [480, 960])
      assert.equal(
        fs
          .readFileSync(
            new URL(
              `../public/videos/v4/${name}-${width}.webp`,
              import.meta.url,
            ),
          )
          .subarray(0, 4)
          .toString(),
        "RIFF",
      );
  }
});
test("price combines correctly with category, duration, shared-experience and text filters", () => {
  assert.equal(searchTreatments({ category: "Beauty", price: "75" }).length, 4);
  assert.equal(
    searchTreatments({ category: "Massage", price: "125", duration: "60" })
      .length,
    4,
  );
  assert.equal(searchTreatments({ couples: true, price: "200" }).length, 0);
  assert.deepEqual(searchTreatments({ query: "stone", price: "125" }), []);
});
