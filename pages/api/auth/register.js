// pages/api/auth/register.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { setAuthCookie, signToken } from "../_utils/auth";
import {
  isValidEmail,
  isStrongPassword,
  cleanName,
} from "../_utils/validators";
import { MongoServerError } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name = "", email = "", password = "" } = req.body || {};

  // ---- SERVER-SIDE VALIDATION (authoritative) ----
  const safeName = cleanName(name);
  const safeEmail = String(email).trim().toLowerCase();
  const safePassword = String(password);

  if (!safeName || safeName.length < 2) {
    return res
      .status(400)
      .json({ error: "Please enter your full name (min 2 characters)." });
  }
  if (!isValidEmail(safeEmail)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }
  if (!isStrongPassword(safePassword)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters and include at least 1 number and 1 special character.",
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("celestaview");

    // Ensure a unique index on email (run once; safe to re-run)
    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    const users = db.collection("users");

    const passwordHash = await bcrypt.hash(safePassword, 10);

    const userDoc = {
      name: safeName,
      email: safeEmail,
      passwordHash,
      createdAt: new Date(),
    };

    const { insertedId } = await users.insertOne(userDoc);

    const token = signToken({ uid: String(insertedId), email: userDoc.email });
    setAuthCookie(res, token);

    return res.status(201).json({
      message: "Registered successfully",
      user: {
        id: String(insertedId),
        name: userDoc.name,
        email: userDoc.email,
      },
    });
  } catch (e) {
    // Duplicate email protection
    if (e instanceof MongoServerError && e.code === 11000) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });
    }
    console.error("register error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
