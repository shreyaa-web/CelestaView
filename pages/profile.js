import Head from "next/head";
import { useUser } from "@/components/UserProvider";
import Link from "next/link";

export default function Profile() {
  const { user, loading } = useUser();

  return (
    <>
      <Head>
        <title>My Profile – CelestaView</title>
      </Head>
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontFamily: "Michroma, sans-serif",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <div
            style={{
              padding: 24,
              borderRadius: 16,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <h1 style={{ color: "#6cf", marginTop: 0 }}>My Profile</h1>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <Link href="/">← Back Home</Link>
          </div>
        ) : (
          <div>
            You’re not logged in. <Link href="/login?mode=login">Log in</Link>
          </div>
        )}
      </main>
    </>
  );
}
