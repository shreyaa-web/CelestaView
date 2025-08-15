import Link from "next/link";
import { useUser } from "@/components/UserProvider";

export default function SideAuthCta() {
  const { user, logout, loading } = useUser();

  const box = {
    position: "fixed",
    top: 24,
    right: 24,
    zIndex: 3000,
    display: "flex",
    gap: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "8px 10px",
    borderRadius: 16,
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 16px rgba(0,255,255,0.2)",
    fontFamily: "Michroma, sans-serif",
  };
  const btn = (filled) => ({
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #00ffff",
    textDecoration: "none",
    fontSize: 14,
    lineHeight: 1,
    color: filled ? "#000" : "#6cf",
    background: filled ? "#00ffff" : "transparent",
  });

  if (loading) return null;

  return (
    <aside style={box}>
      {user ? (
        <>
          <Link href="/profile" style={btn(true)}>
            {user.name?.split(" ")[0] || "Profile"}
          </Link>
          <button onClick={logout} style={{ ...btn(false), cursor: "pointer" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login?mode=login" style={btn(false)}>
            Log In
          </Link>
          <Link href="/login?mode=signup" style={btn(true)}>
            Sign Up
          </Link>
        </>
      )}
    </aside>
  );
}
