import { test } from "node:test";
import assert from "node:assert/strict";
import {
  configuration,
  validateSubmission,
  createSubmissionService,
} from "../server/submissions.js";
const now = new Date("2026-10-17T15:00:00Z");
const valid = {
  name: "Alex Example",
  email: " ALEX@example.com ",
  phone: "+1 (000) 000-0000",
  service: "hot-stone-massage",
  date: "2026-10-21",
  time: "Afternoon",
  notes: "A sample request.",
  consent: true,
  requestId: "sample-request-1234567890",
  startedAt: now.getTime() - 5000,
  website: "",
};
const context = {
  origin: "https://wellness.mspixelpulse.com",
  host: "wellness.mspixelpulse.com",
  ip: "test-network",
};
function fixture({ configured = true, mailOk = true, storeOk = true } = {}) {
  const env = configured
    ? {
        WELLNESS_REDIS_REST_URL: "https://redis.example.invalid",
        WELLNESS_REDIS_REST_TOKEN: "test-token",
        WELLNESS_SUBMISSION_SECRET: "test-only-key-32-characters-or-longer",
        RESEND_API_KEY: "test-only-key",
        WELLNESS_EMAIL_FROM: "Wellness Demo <demo@example.com>",
      }
    : {};
  const records = new Map();
  const mail = [],
    logs = [];
  const fetcher = async (url, options) => {
    if (url === env.WELLNESS_REDIS_REST_URL) {
      if (!storeOk) throw Error("Unavailable");
      const [command, ...args] = JSON.parse(options.body);
      let result = null;
      if (command === "GET") result = records.get(args[0]) || null;
      if (command === "SET") {
        if (args.includes("NX") && records.has(args[0])) result = null;
        else {
          records.set(args[0], args[1]);
          result = "OK";
        }
      }
      if (command === "EVAL") {
        const key = args[2];
        const n = Number(records.get(key) || 0) + 1;
        records.set(key, n);
        result = n;
      }
      return { ok: true, json: async () => ({ result }) };
    }
    if (url === "https://api.resend.com/emails/batch") {
      mail.push({ body: JSON.parse(options.body), headers: options.headers });
      return {
        ok: mailOk,
        json: async () => ({
          data: [{ id: "agency-test" }, { id: "customer-test" }],
        }),
      };
    }
    throw Error("Unexpected destination");
  };
  const service = createSubmissionService({
    env,
    fetcher,
    now: () => now,
    logger: { info: (x) => logs.push(x), warn: (x) => logs.push(x) },
  });
  return { service, records, mail, logs, env };
}
test("server validation normalizes email and rejects invalid dates, fields and consent", () => {
  const ok = validateSubmission("booking", valid, now);
  assert.deepEqual(ok.errors, {});
  assert.equal(ok.data.email, "alex@example.com");
  for (const change of [
    { date: "2026-02-30" },
    { date: "2026-10-17" },
    { date: "2028-10-20" },
    { email: "bad@example.com\r\nBcc: other@example.com" },
    { service: "unknown" },
    { phone: "123" },
    { consent: false },
    { name: "A" },
  ])
    assert.ok(
      Object.keys(
        validateSubmission("booking", { ...valid, ...change }, now).errors,
      ).length,
    );
});
test("unconfigured submission is explicit and performs no delivery or storage", async () => {
  const h = fixture({ configured: false });
  assert.deepEqual(configuration(h.env), { booking: false, feedback: false });
  const r = await h.service("booking", valid, context);
  assert.equal(r.status, 503);
  assert.equal(r.body.code, "configuration_required");
  assert.equal(h.mail.length, 0);
  assert.equal(h.records.size, 0);
});
test("only validated submissions reach both email destinations; request is clearly demo-only", async () => {
  const h = fixture();
  const bad = await h.service(
    "booking",
    { ...valid, email: "invalid" },
    context,
  );
  assert.equal(bad.status, 422);
  assert.equal(h.mail.length, 0);
  const r = await h.service("booking", valid, context);
  assert.equal(r.status, 201);
  assert.match(r.body.reference, /^DEMO-B-/);
  assert.equal(h.mail.length, 1);
  assert.deepEqual(
    h.mail[0].body.map((m) => m.to),
    [["mspixelpulse@gmail.com"], ["alex@example.com"]],
  );
  for (const m of h.mail[0].body) {
    assert.match(m.subject, /\[DEMO\]/);
    assert.match(m.text, /NOT A RESERVATION/);
    assert.match(m.text, /2026-10-21/);
  }
  assert.ok(h.mail[0].headers["Idempotency-Key"]);
  assert.ok(
    h.logs.every(
      (l) => !l.includes("Alex") && !l.includes("@") && !l.includes("000"),
    ),
  );
});
test("duplicate submissions replay one receipt without a second email batch", async () => {
  const h = fixture();
  const a = await h.service("booking", valid, context);
  const b = await h.service("booking", valid, context);
  assert.equal(b.status, 200);
  assert.equal(a.body.reference, b.body.reference);
  assert.equal(h.mail.length, 1);
});
test("rate limits share atomic storage, reject cross-origin/honeypot requests, and fail closed", async () => {
  const h = fixture();
  for (let i = 0; i < 3; i++)
    assert.equal(
      (
        await h.service(
          "booking",
          { ...valid, requestId: "sample-different-request-" + i },
          context,
        )
      ).status,
      201,
    );
  assert.equal(
    (
      await h.service(
        "booking",
        { ...valid, requestId: "sample-different-request-4" },
        context,
      )
    ).status,
    429,
  );
  assert.equal(
    (
      await h.service("booking", valid, {
        ...context,
        origin: "https://unrelated.example",
      })
    ).status,
    403,
  );
  assert.equal(
    (await h.service("booking", { ...valid, website: "spam" }, context)).status,
    422,
  );
  assert.equal(
    (
      await h.service(
        "booking",
        { ...valid, startedAt: now.getTime() },
        context,
      )
    ).status,
    422,
  );
  const unavailable = fixture({ storeOk: false });
  assert.equal(
    (await unavailable.service("booking", valid, context)).status,
    503,
  );
  assert.equal(unavailable.mail.length, 0);
});
test("provider failures never return confirmation and reserve duplicate identity", async () => {
  const h = fixture({ mailOk: false });
  assert.equal((await h.service("booking", valid, context)).status, 503);
  assert.equal((await h.service("booking", valid, context)).status, 409);
  assert.equal(h.mail.length, 1);
});
test("feedback is stored privately with moderation state and never emails or publishes", async () => {
  const h = fixture();
  const raw = {
    ...valid,
    rating: 4,
    feedback: "A clear and lovely demonstration.",
    publish: false,
  };
  const r = await h.service("feedback", raw, context);
  assert.equal(r.status, 201);
  assert.equal(r.body.status, "pending_moderation");
  assert.equal(h.mail.length, 0);
  const item = [...h.records.entries()].find(([k]) =>
    k.startsWith("wellness:feedback:"),
  );
  assert.ok(item);
  const record = JSON.parse(item[1]);
  assert.equal(record.status, "pending_moderation");
  assert.equal(record.publish, false);
  assert.equal(record.email, "alex@example.com");
  assert.ok(
    Object.keys(
      validateSubmission("feedback", { ...raw, rating: 6 }, now).errors,
    ).length,
  );
});
