import { createHmac, randomUUID } from "node:crypto";
import { treatments } from "../src/data/studio.js";
const agency = "mspixelpulse@gmail.com";
const clean = (v, max = 1000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const email = (v) => clean(v, 254).toLowerCase();
export function validateSubmission(kind, raw, now = new Date()) {
  const d = {
    name: clean(raw.name, 80),
    email: email(raw.email),
    service: clean(raw.service, 80),
    notes: clean(raw.notes),
    consent: raw.consent === true,
    requestId: clean(raw.requestId, 64),
  };
  const errors = {};
  if (d.name.length < 2) errors.name = "Enter your full name.";
  if (
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(d.email) ||
    /[\r\n]/.test(d.email)
  )
    errors.email = "Enter a valid email address.";
  if (!treatments.some((t) => t.id === d.service) && d.service !== "help")
    errors.service = "Choose a service.";
  if (!d.consent)
    errors.consent = "Please acknowledge the demo and delivery notice.";
  if (!/^[a-zA-Z0-9-]{16,64}$/.test(d.requestId))
    errors.requestId = "Refresh the form and try again.";
  if (kind === "booking") {
    d.phone = clean(raw.phone, 32);
    d.date = clean(raw.date, 10);
    d.time = clean(raw.time, 30);
    if (
      !/^[+()\d\s.-]{7,32}$/.test(d.phone) ||
      d.phone.replace(/\D/g, "").length < 7
    )
      errors.phone = "Enter a valid phone number.";
    const today = now.toLocaleDateString("en-CA", {
      timeZone: "America/Toronto",
    });
    const parsed = new Date(d.date + "T12:00:00Z");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== d.date ||
      d.date <= today ||
      parsed.getTime() > now.getTime() + 366 * 86400000
    )
      errors.date = "Choose a valid date from tomorrow to one year ahead.";
    if (!["Morning", "Afternoon", "Evening", "Flexible"].includes(d.time))
      errors.time = "Choose a time preference.";
  } else if (kind === "feedback") {
    d.rating = Number(raw.rating);
    d.feedback = clean(raw.feedback, 2000);
    d.publish = raw.publish === true;
    if (!Number.isInteger(d.rating) || d.rating < 1 || d.rating > 5)
      errors.rating = "Choose a rating from 1 to 5.";
    if (d.feedback.length < 10)
      errors.feedback = "Please write at least 10 characters.";
  } else errors.kind = "Unsupported request type.";
  return { data: d, errors };
}
export function configuration(env) {
  const storage = Boolean(
    env.WELLNESS_REDIS_REST_URL &&
      env.WELLNESS_REDIS_REST_TOKEN &&
      env.WELLNESS_SUBMISSION_SECRET?.length >= 32,
  );
  return {
    booking: storage && Boolean(env.RESEND_API_KEY && env.WELLNESS_EMAIL_FROM),
    feedback: storage,
  };
}
const digest = (secret, value) =>
  createHmac("sha256", secret).update(value).digest("hex");
export function createSubmissionService({
  env,
  fetcher = fetch,
  logger = console,
  now = () => new Date(),
}) {
  async function redis(command) {
    const response = await fetcher(env.WELLNESS_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.WELLNESS_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw Error("Storage unavailable");
    const value = await response.json();
    if (value.error) throw Error("Storage unavailable");
    return value.result;
  }
  return async function submit(
    kind,
    raw,
    { ip = "unknown", origin, host } = {},
  ) {
    if (
      origin &&
      origin !== `https://${host}` &&
      !(
        env.NODE_ENV === "development" &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
      )
    )
      return {
        status: 403,
        body: { error: "This request must come from the studio website." },
      };
    const { data, errors } = validateSubmission(kind, raw, now());
    if (Object.keys(errors).length)
      return {
        status: 422,
        body: { error: "Please check the highlighted fields.", fields: errors },
      };
    if (
      clean(raw.website) ||
      !Number.isFinite(Number(raw.startedAt)) ||
      now().getTime() - Number(raw.startedAt) < 2500
    )
      return {
        status: 422,
        body: {
          error: "Please take a moment to check the form and try again.",
        },
      };
    if (!configuration(env)[kind])
      return {
        status: 503,
        body: {
          error:
            "Demo delivery is not configured yet. Your details have not been sent or saved.",
          code: "configuration_required",
        },
      };
    const secret = env.WELLNESS_SUBMISSION_SECRET;
    const fingerprint = digest(
      secret,
      JSON.stringify({ ...data, requestId: undefined }),
    );
    const id = digest(secret, data.requestId + fingerprint);
    const key = `wellness:request:${kind}:${id}`;
    const reference = `DEMO-${kind === "booking" ? "B" : "F"}-${id.slice(0, 10).toUpperCase()}`;
    try {
      const cached = await redis(["GET", key]);
      if (cached) {
        const result = JSON.parse(cached);
        if (result.complete) return { status: 200, body: result.response };
        return {
          status: 409,
          body: {
            error:
              "This request is already being processed. Please wait before retrying.",
            reference,
          },
        };
      }
      // One atomic counter, shared across function instances. No plaintext IP is stored.
      const rate = await redis([
        "EVAL",
        "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],3600) end; return n",
        1,
        `wellness:rate:${digest(secret, ip)}`,
      ]);
      if (Number(rate) > 3)
        return {
          status: 429,
          body: { error: "Please wait before sending another demo request." },
        };
      const reserved = await redis([
        "SET",
        key,
        JSON.stringify({ complete: false, reference }),
        "NX",
        "EX",
        86400,
      ]);
      if (!reserved)
        return {
          status: 409,
          body: {
            error: "This request is already being processed.",
            reference,
          },
        };
      if (kind === "feedback") {
        await redis([
          "SET",
          `wellness:feedback:${id}`,
          JSON.stringify({
            ...data,
            requestId: undefined,
            reference,
            status: "pending_moderation",
            createdAt: now().toISOString(),
          }),
          "EX",
          2592000,
        ]);
        const response = {
          reference,
          status: "pending_moderation",
          message:
            "Demo feedback received privately for moderation. It is not published.",
        };
        await redis([
          "SET",
          key,
          JSON.stringify({ complete: true, response }),
          "EX",
          86400,
        ]);
        logger.info(
          JSON.stringify({ kind, reference, status: "pending_moderation" }),
        );
        return { status: 201, body: response };
      }
      const service =
        treatments.find((t) => t.id === data.service)?.title ||
        "Help me choose";
      const summary = `DEMO APPOINTMENT REQUEST — NOT A RESERVATION\nReference: ${reference}\nStatus: Request received for demonstration only\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${service}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nNotes: ${data.notes || "None"}\n\nThis fictional Toronto studio has no real availability or appointments. No payment has been taken.\nAgency contact: ${agency}`;
      const mail = await fetcher("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `wellness-${id}`,
        },
        body: JSON.stringify([
          {
            from: env.WELLNESS_EMAIL_FROM,
            to: [agency],
            reply_to: data.email,
            subject: `[DEMO] Appointment request ${reference}`,
            text: summary,
          },
          {
            from: env.WELLNESS_EMAIL_FROM,
            to: [data.email],
            reply_to: agency,
            subject: `[DEMO] Your appointment request ${reference} — not a reservation`,
            text: summary,
          },
        ]),
        signal: AbortSignal.timeout(12000),
      });
      if (!mail.ok) throw Error("Delivery unavailable");
      const result = await mail.json();
      if (
        !Array.isArray(result.data) ||
        result.data.length !== 2 ||
        result.data.some((x) => !x.id)
      )
        throw Error("Delivery incomplete");
      const response = {
        reference,
        status: "demo_request_received",
        agencyEmail: "accepted",
        customerEmail: "accepted",
        message:
          "Your demo request has been received. This is not a confirmed reservation.",
      };
      await redis([
        "SET",
        key,
        JSON.stringify({ complete: true, response }),
        "EX",
        86400,
      ]);
      logger.info(
        JSON.stringify({ kind, reference, status: "provider_accepted" }),
      );
      return { status: 201, body: response };
    } catch {
      // Keep the reservation for 24h after ambiguous provider failure: never retry with a new mail identity.
      logger.warn(JSON.stringify({ kind, reference, status: "unavailable" }));
      return {
        status: 503,
        body: {
          error:
            "We could not complete this demo request. Please contact the agency with the reference before retrying.",
          reference,
        },
      };
    }
  };
}
export function requestId() {
  return randomUUID();
}
