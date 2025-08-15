// pages/api/_utils/auth.js
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const TOKEN_NAME = "cv_token";
const ONE_WEEK = 60 * 60 * 24 * 7;

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET in env");
  return s;
}

export function signToken(payload) {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, getSecret());
}

export function setAuthCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true, // JS can't read it
    secure: process.env.NODE_ENV === "production", // true on prod/https
    sameSite: "lax", // works on normal navigations
    path: "/", // sent to every route
    maxAge: ONE_WEEK,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function clearAuthCookie(res) {
  const cookie = serialize(TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function getTokenFromReq(req) {
  // Next.js API parses cookies into req.cookies; fallback to header parse
  const header = req.headers.cookie || "";
  const source = req.cookies?.[TOKEN_NAME]
    ? `${TOKEN_NAME}=${req.cookies[TOKEN_NAME]}`
    : header;

  const match = source
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${TOKEN_NAME}=`));
  if (!match) return null;
  return match.split("=").slice(1).join("=");
}
