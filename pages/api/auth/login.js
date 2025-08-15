// pages/api/auth/login.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { setAuthCookie, signToken } from "../_utils/auth";
import { isValidEmail, isStrongPassword } from "../_utils/validators";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email = "", password = "" } = req.body || {};
  const safeEmail = String(email).trim().toLowerCase();
  const safePassword = String(password);

  // Validate input format (prevents timing differences and junk requests)
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
    const users = db.collection("users");

    const user = await users.findOne({ email: safeEmail });
    // uniform response for invalid creds
    if (!user)
      return res.status(401).json({ error: "Invalid email or password." });

    const ok = await bcrypt.compare(safePassword, user.passwordHash || "");
    if (!ok)
      return res.status(401).json({ error: "Invalid email or password." });

    const token = signToken({ uid: String(user._id), email: user.email });
    setAuthCookie(res, token);

    return res.status(200).json({
      message: "Logged in",
      user: { id: String(user._id), name: user.name, email: user.email },
    });
  } catch (e) {
    console.error("login error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
