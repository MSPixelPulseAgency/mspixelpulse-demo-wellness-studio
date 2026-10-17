import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { searchTreatments } from "../src/data/discovery.js";
import { treatments, categories } from "../src/data/studio.js";
test("36 distinct rituals populate six complete collections, retaining the original six service URLs and prices", () => {
  assert.equal(treatments.length, 36);
  for (const c of categories)
    assert.equal(treatments.filter((t) => t.category === c).length, 6, c);
  for (const [id, price, duration] of [
    ["relaxation-massage", 110, 60],
    ["botanical-facial", 125, 60],
    ["aromatherapy-ritual", 115, 60],
    ["body-care", 145, 75],
    ["evening-reset", 90, 45],
    ["signature-experience", 175, 90],
  ]) {
    const t = treatments.find((t) => t.id === id);
    assert.ok(t, id);
    assert.equal(t.price, price);
    assert.equal(t.duration, duration);
  }
});
test("search supports names, categories and descriptions without case or surrounding-space sensitivity", () => {
  assert.deepEqual(
    searchTreatments({ query: "  STONE ", category: "Massage" }).map(
      (t) => t.id,
    ),
    ["hot-stone-massage"],
  );
  assert.equal(searchTreatments({ query: "beauty" }).length, 6);
  assert.deepEqual(
    searchTreatments({ query: "fragrance-free", category: "Facials" }).map(
      (t) => t.id,
    ),
    ["sensitive-skin-facial"],
  );
  assert.equal(searchTreatments({ query: "unmatched-example-xyz" }).length, 0);
  assert.equal(searchTreatments({ query: "   " }).length, 36);
});
test("duration and shared-experience filters combine with category and search using actual catalogue data", () => {
  assert.equal(searchTreatments({ couples: true }).length, 2);
  assert.deepEqual(
    searchTreatments({ couples: true, duration: "60" }).map((t) => t.id),
    ["couples-massage"],
  );
  assert.equal(
    searchTreatments({ category: "Beauty", duration: "30" }).length,
    2,
  );
  assert.equal(
    searchTreatments({ query: "stone", category: "Beauty" }).length,
    0,
  );
});
test("the locally served film is optimized, silent H.264 with a fast-start container and licensed provenance", () => {
  const file = fs.readFileSync(
    new URL("../public/videos/pool-ritual.mp4", import.meta.url),
  );
  const credit = JSON.parse(
    fs.readFileSync(new URL("../docs/v3-video-sources.json", import.meta.url)),
  )["pool-ritual"];
  assert.equal(file.subarray(4, 8).toString(), "ftyp");
  assert.ok(file.indexOf("moov") < file.indexOf("mdat"));
  assert.ok(file.includes(Buffer.from("avc1")));
  assert.ok(!file.includes(Buffer.from("mp4a")));
  assert.ok(file.length < 1_000_000);
  assert.equal(credit.durationSeconds, 10);
  assert.equal(credit.license, "https://www.pexels.com/license/");
});
