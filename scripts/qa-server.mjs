// Local QA server: serves the real built app and the same unconfigured API handlers.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { gzipSync } from "node:zlib";
import submit from "../api/submit.js";
import status from "../api/status.js";
const base = resolve("dist");
const fixture = process.argv.includes("--mock-delivery");
const mock = fixture ? (await import("./mock-delivery.mjs")).mockSubmit : null;
createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    let raw = "";
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 12000) {
        res.writeHead(413);
        return res.end();
      }
    }
    req.body = raw;
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (body) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
      return res;
    };
    if (url.pathname === "/api/status")
      return fixture
        ? res.status(200).json({ booking: true, feedback: true })
        : status(req, res);
    if (url.pathname === "/api/submit") {
      if (!fixture) return submit(req, res);
      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return res.status(400).json({ error: "Invalid request" });
      }
      const result = await mock(body.kind, body, {
        ip: "local-fixture",
        host: req.headers.host,
        origin: req.headers.origin,
      });
      return res.status(result.status).json(result.body);
    }
    res.writeHead(404);
    return res.end();
  }
  let path = resolve(base, "." + url.pathname);
  if (!path.startsWith(base + "/") && path !== base) {
    res.writeHead(403);
    return res.end();
  }
  try {
    if (!(await stat(path)).isFile()) throw Error();
  } catch {
    if (url.pathname.match(/\.(mp4|webp|woff2|js|css)$/)) {
      res.writeHead(404);
      return res.end();
    }
    path = resolve(base, "index.html");
  }
  try {
    let body = await readFile(path);
    const encoding = {};
    if (
      /\.(html|js|css|xml|svg|txt)$/.test(path) &&
      String(req.headers["accept-encoding"]).includes("gzip")
    ) {
      body = gzipSync(body);
      encoding["Content-Encoding"] = "gzip";
      encoding.Vary = "Accept-Encoding";
    }
    res.writeHead(200, {
      ...encoding,
      "Content-Type":
        {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".webp": "image/webp",
          ".mp4": "video/mp4",
          ".woff2": "font/woff2",
          ".svg": "image/svg+xml",
          ".xml": "application/xml",
          ".txt": "text/plain",
        }[extname(path)] || "application/octet-stream",
      "Content-Length": body.length,
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
}).listen(fixture ? 4179 : 4176, "127.0.0.1", () =>
  console.log("Wellness QA http://127.0.0.1:" + (fixture ? 4179 : 4176)),
);
