// pages/login.js
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import Starfield from "@/components/Starfield"; // ✅ reuse the same Starfield
import { useUser } from "@/components/UserProvider";

export default function LoginPage() {
  const { refresh } = useUser();
  const router = useRouter();
  const tabFromQuery = (router.query.mode || "login").toString().toLowerCase();
  const [mode, setMode] = useState(
    tabFromQuery === "signup" ? "signup" : "login"
  );

  useEffect(() => {
    const m = (router.query.mode || "").toString().toLowerCase();
    if (m === "login" || m === "signup") setMode(m);
  }, [router.query.mode]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const title = useMemo(
    () => (mode === "login" ? "Welcome back!" : "Seconds to sign up!"),
    [mode]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    // client-side quick checks (server will enforce too)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const pwOk =
      password.length >= 8 &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    if (!emailOk) {
      setMsg("Please enter a valid email address.");
      return;
    }
    if (!pwOk) {
      setMsg(
        "Password must be at least 8 characters and include at least 1 number and 1 special character."
      );
      return;
    }
    if (mode === "signup" && (!name.trim() || name.trim().length < 2)) {
      setMsg("Please enter your full name (min 2 characters).");
      return;
    }

    setLoading(true);
    try {
      const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        mode === "login" ? { email, password } : { name, email, password };

      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();

      if (!r.ok) throw new Error(data.error || "Failed");
      await refresh();
      setMsg(
        data.message ||
          (mode === "login" ? "Logged in" : "Registered successfully")
      );
      setTimeout(() => {
        if (router.query.next) router.push(router.query.next.toString());
        else router.push("/");
      }, 600);
      const next = router.query.next?.toString() || "/";
      router.push(next);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>{mode === "login" ? "Login" : "Sign Up"} – CelestaView</title>
        <meta
          name="description"
          content="Log in or sign up to save your space routes on CelestaView."
        />
      </Head>

      {/* ✅ Use the same Starfield as homepage */}
      <Starfield count={300} />

      <main className={styles.wrap}>
        {/* top-right quick switch */}
        <div className={styles.topSwitch}>
          {mode === "login" ? (
            <button
              className={styles.linkGhost}
              onClick={() => router.push("/login?mode=signup")}
            >
              Don’t have an account? <span>Sign up</span>
            </button>
          ) : (
            <button
              className={styles.linkGhost}
              onClick={() => router.push("/login?mode=login")}
            >
              Already playing with CelestaView? <span>Login</span>
            </button>
          )}
        </div>

        {/* gradient band */}
        <div className={styles.gradientBand} />

        {/* auth card */}
        <section className={styles.card}>
          <h1 className={styles.title}>{title}</h1>

          {/* tab buttons */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${
                mode === "login" ? styles.active : ""
              }`}
              onClick={() => router.push("/login?mode=login")}
            >
              Log In
            </button>
            <button
              className={`${styles.tabBtn} ${
                mode === "signup" ? styles.active : ""
              }`}
              onClick={() => router.push("/login?mode=signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Google button placeholder */}
          <button
            type="button"
            className={styles.googleBtn}
            onClick={() => {
              window.location.href = "/api/auth/google";
            }}
          >
            <span className={styles.gLogo}>G</span> Continue with Google
          </button>

          <div className={styles.orRow}>
            <span className={styles.orLine} />
            <span className={styles.orText}>OR</span>
            <span className={styles.orLine} />
          </div>

          <form onSubmit={onSubmit} className={styles.form}>
            {mode === "signup" && (
              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                placeholder="example@site.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className={styles.submit} disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Log In"
                : "Create Account"}
            </button>

            {msg && <div className={styles.msg}>{msg}</div>}
          </form>

          <p className={styles.tiny}>
            By continuing, you agree to our{" "}
            <a href="#" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </main>
    </>
  );
}
