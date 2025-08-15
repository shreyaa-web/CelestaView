// pages/api/auth/google/callback.js
import clientPromise from "@/lib/mongodb";
import { setAuthCookie } from "../../_utils/auth";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const code = String(req.query.code || "");

    // 1) exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("Google token error:", tokenData);
      return res.status(400).send("Google token exchange failed");
    }

    // 2) get user info from Google OIDC
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
    const googleUser = await userRes.json();
    // googleUser: { sub, name, email, picture, email_verified, ... }

    // 3) upsert in Mongo
    const client = await clientPromise;
    const db = client.db("celestaview");
    const users = db.collection("users");

    const existing = await users.findOne({ email: googleUser.email });
    let userId;
    if (existing) {
      userId = existing._id;
      // optional: keep name/photo up to date
      await users.updateOne(
        { _id: existing._id },
        {
          $set: {
            name: googleUser.name,
            avatar: googleUser.picture,
            authProvider: "google",
          },
        }
      );
    } else {
      const { insertedId } = await users.insertOne({
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        authProvider: "google",
        createdAt: new Date(),
      });
      userId = insertedId;
    }

    // 4) issue the same JWT + cookie you use for password login
    const token = jwt.sign(
      { uid: String(userId), email: googleUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    setAuthCookie(res, token);

    // 5) redirect back to the app
    // you can attach ?logged=google if you want to show a toast
    res.redirect("/");
  } catch (e) {
    console.error("google callback error:", e);
    res.status(500).send("Auth error");
  }
}
