// pages/api/auth/me.js
import clientPromise from "@/lib/mongodb";
import { getTokenFromReq, verifyToken } from "../_utils/auth";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(200).json({ user: null });

    const decoded = verifyToken(token);
    const client = await clientPromise;
    const db = client.db("celestaview");
    const users = db.collection("users");

    const user = await users.findOne({ _id: new ObjectId(decoded.uid) });
    if (!user) return res.status(200).json({ user: null });

    return res.status(200).json({
      user: { id: String(user._id), name: user.name, email: user.email },
    });
  } catch {
    return res.status(200).json({ user: null });
  }
}
