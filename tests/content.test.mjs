import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { treatments, gallery } from "../src/data/studio.js";
const media = JSON.parse(
  fs.readFileSync(new URL("../src/data/media.json", import.meta.url)),
);
const provenance = JSON.parse(
  fs.readFileSync(new URL("../docs/noire-media-sources.json", import.meta.url)),
);
test("every responsive photo has locally stored WebP derivatives and identified licensed provenance", () => {
  for (const [name, image] of Object.entries(media)) {
    assert.ok(image.width > 0 && image.height > 0);
    assert.deepEqual(
      image.widths,
      [...image.widths].sort((a, b) => a - b),
    );
    assert.ok(image.widths.includes(800) && image.widths.includes(1800));
    assert.equal(new URL(provenance[name].source).hostname, "www.pexels.com");
    assert.equal(provenance[name].license, "https://www.pexels.com/license/");
    assert.ok(provenance[name].photographer);
    for (const width of image.widths) {
      const bytes = fs.readFileSync(
        new URL(
          `../public/images/noire/${name}-${width}.webp`,
          import.meta.url,
        ),
      );
      assert.equal(bytes.subarray(0, 4).toString(), "RIFF");
      assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
      assert.ok(
        bytes.length > 1000,
        `${name}-${width}: empty or corrupt download`,
      );
    }
  }
});
test("treatment identities, CAD illustration data and photo references remain valid", () => {
  assert.equal(new Set(treatments.map((t) => t.id)).size, treatments.length);
  for (const t of treatments) {
    assert.match(t.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(media[t.image], t.image);
    assert.ok(t.alt.length > 20);
    assert.ok(Number.isFinite(t.price) && t.price > 0);
    assert.ok(Number.isFinite(t.duration) && t.duration > 0);
    assert.ok(
      ["Massage", "Facials", "Body", "Wellness", "Packages", "Beauty"].includes(
        t.category,
      ),
    );
  }
});
test("the sitemap retains all existing treatment and main page URLs", () => {
  const xml = fs.readFileSync(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]),
  );
  for (const p of [
    "",
    "/services",
    "/about",
    "/experience",
    "/gallery",
    "/booking",
    "/contact",
    "/faq",
    ...treatments.map((t) => `/services/${t.id}`),
  ]) {
    assert.ok(
      locations.some(
        (url) =>
          url.origin === "https://wellness.mspixelpulse.com" &&
          url.pathname === (p || "/"),
      ),
      p || "/",
    );
  }
});
test("gallery entries have distinct identified media and meaningful accessible descriptions", () => {
  assert.equal(new Set(gallery.map((g) => g.image)).size, gallery.length);
  for (const g of gallery) {
    assert.ok(media[g.image]);
    assert.ok(g.alt.length > 20);
    assert.ok(g.caption);
    assert.ok(g.tag);
  }
});
