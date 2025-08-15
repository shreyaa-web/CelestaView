import clientPromise from "@/lib/mongodb";
import { getTokenFromReq, verifyToken } from "./_utils/auth";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const { uid } = verifyToken(token);

    const client = await clientPromise;
    const db = client.db("celestaview");
    const rows = await db
      .collection("routeLogs")
      .find({ userId: uid })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.status(200).json({ logs: rows });
  } catch (e) {
    console.error("my-searches error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
