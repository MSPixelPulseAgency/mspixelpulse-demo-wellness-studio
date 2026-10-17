// Loopback QA fixture. No network calls and no real messages. Never used by production APIs.
import { writeFile } from "node:fs/promises";
import { createSubmissionService } from "../server/submissions.js";
const records = new Map(),
  messages = [];
const env = {
  NODE_ENV: "development",
  WELLNESS_REDIS_REST_URL: "https://fixture.invalid",
  WELLNESS_REDIS_REST_TOKEN: "synthetic-fixture",
  WELLNESS_SUBMISSION_SECRET: "synthetic-fixture-secret-at-least-32-characters",
  RESEND_API_KEY: "synthetic-fixture",
  WELLNESS_EMAIL_FROM: "Demo Fixture <fixture@example.com>",
};
export const mockSubmit = createSubmissionService({
  env,
  fetcher: async (url, options) => {
    if (url === env.WELLNESS_REDIS_REST_URL) {
      const [c, ...args] = JSON.parse(options.body);
      let result = null;
      if (c === "GET") result = records.get(args[0]) || null;
      if (c === "SET") {
        if (!args.includes("NX") || !records.has(args[0])) {
          records.set(args[0], args[1]);
          result = "OK";
        }
      }
      if (c === "EVAL") {
        result = Number(records.get(args[2]) || 0) + 1;
        records.set(args[2], result);
      }
      await writeFile(
        "/tmp/wellness-v4-mock-records.json",
        JSON.stringify([...records], null, 2),
      );
      return { ok: true, json: async () => ({ result }) };
    }
    if (url === "https://api.resend.com/emails/batch") {
      messages.push(...JSON.parse(options.body));
      await writeFile(
        "/tmp/wellness-v4-mock-emails.json",
        JSON.stringify(messages, null, 2),
      );
      return {
        ok: true,
        json: async () => ({
          data: [{ id: "fixture-agency" }, { id: "fixture-customer" }],
        }),
      };
    }
    throw Error("No external network in fixture");
  },
  logger: { info: () => {}, warn: () => {} },
});
