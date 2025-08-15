// pages/api/search.js
import planetData from "@/data/planetData";
import clientPromise from "@/lib/mongodb"; // optional logging; safe if MONGODB_URI not set
import { getTokenFromReq, verifyToken } from "./_utils/auth";

// Keep your traversal order
const allBodies = [
  "sun", // ☀️ At the center
  "mercury", // 🪐 Closest planet
  "venus",
  "earth",
  "moon", // 🌕 Earth's moon
  "mars",
  "vesta", // Main asteroid belt
  "pallas", // Main asteroid belt
  "eros", // Near-Earth asteroid
  "itokawa", // Near-Earth asteroid
  "bennu", // Near-Earth asteroid
  "jupiter",
  "europa", // Jupiter's moon
  "ganymede", // Jupiter's moon
  "saturn",
  "titan", // Saturn's moon
  "uranus",
  "neptune",
  "pluto", // Dwarf planet in Kuiper belt
  "iss", // Orbiting Earth
  "hubble", // Orbiting Earth
];

const norm = (s) =>
  String(s || "")
    .trim()
    .toLowerCase();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { source, destination } = req.body || {};
    const src = norm(source);
    const dst = norm(destination);

    console.log("PlanetData Keys:", Object.keys(planetData || {}));
    console.log("Request body:", req.body, "SOURCE:", src, "DESTINATION:", dst);

    const startIndex = allBodies.indexOf(src);
    const endIndex = allBodies.indexOf(dst);

    if (startIndex === -1 || endIndex === -1) {
      return res.status(400).json({ error: "Invalid source or destination" });
    }

    const from = Math.min(startIndex, endIndex);
    const to = Math.max(startIndex, endIndex);
    const resultBodies = allBodies.slice(from + 1, to);

    let userId = null;
    let userEmail = null;
    try {
      const token = getTokenFromReq(req); // reads cv_token cookie
      if (token) {
        const decoded = verifyToken(token); // { uid, email }
        userId = decoded?.uid || null;
        userEmail = decoded?.email || null;
      }
    } catch (e) {
      console.warn("search auth decode failed:", e?.message);
    }

    // OPTIONAL: Log to MongoDB Atlas so you can “see” requests
    try {
      if (process.env.MONGODB_URI) {
        const client = await clientPromise;
        const db = client.db("celestaview");
        await db.collection("routeLogs").insertOne({
          userId: userId || null,
          userEmail: userEmail || null,
          source: src,
          destination: dst,
          resultBodies,
          createdAt: new Date(),
          userAgent: req.headers["user-agent"] || "",
        });
      }
    } catch (logErr) {
      console.warn("Mongo logging failed:", logErr?.message);
    }

    return res.status(200).json({ resultBodies });
  } catch (e) {
    console.error("search api error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
