import { configuration } from "../server/submissions.js";
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "Use GET." });
  return res.status(200).json(configuration(process.env));
}
