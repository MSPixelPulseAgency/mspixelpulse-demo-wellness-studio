import { createSubmissionService } from "../server/submissions.js";
const submit = createSubmissionService({ env: process.env });
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }
  if (!String(req.headers["content-type"] || "").includes("application/json"))
    return res.status(415).json({ error: "Use JSON." });
  const length = Number(req.headers["content-length"] || 0);
  if (length > 12000)
    return res.status(413).json({ error: "Request too large." });
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!body || JSON.stringify(body).length > 12000) throw Error();
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
  const result = await submit(body.kind, body, {
    ip:
      req.headers["x-vercel-forwarded-for"]?.split(",")[0] ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      "unknown",
    origin: req.headers.origin,
    host: req.headers.host,
  });
  return res.status(result.status).json(result.body);
}
