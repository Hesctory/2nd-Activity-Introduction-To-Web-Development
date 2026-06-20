import crypto from "node:crypto";

// Single-admin authentication.
//
// The shop has exactly one administrator (Merigold). Logging in means sending
// the admin password to POST /api/login. If it matches, the server hands back
// a random bearer token. Admin-only requests must include that token in the
// "Authorization: Bearer <token>" header.
//
// The password can be overridden with the ADMIN_PASSWORD environment variable.
// Tokens are kept in memory only, so they are cleared on every restart (which
// fits the in-memory database).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "merigold1867";

const validTokens = new Set();

export function login(password) {
  if (password !== ADMIN_PASSWORD) {
    return null;
  }
  const token = crypto.randomBytes(32).toString("hex");
  validTokens.add(token);
  return token;
}

export function logout(token) {
  validTokens.delete(token);
}

function extractToken(req) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme === "Bearer" && token) {
    return token;
  }
  return null;
}

// Express middleware that blocks requests without a valid admin token.
export function requireAdmin(req, res, next) {
  const token = extractToken(req);
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ error: "Não autorizado." });
  }
  next();
}
