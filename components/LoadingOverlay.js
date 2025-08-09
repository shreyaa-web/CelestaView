// components/LoadingOverlay.js
import { Html, useProgress } from "@react-three/drei";
import { useMemo } from "react";

const LINES = [
  "Warming up the thrusters…",
  "Politely asking Jupiter for its stripes…",
  "Untangling Saturn’s rings…",
  "Asking Pluto if it wants in…",
  "Convincing light-speed to hurry up…",
];

export default function LoadingOverlay() {
  const { progress, active, item } = useProgress(); // 0..100
  const line = useMemo(() => {
    if (progress > 60) return "Tuning interstellar radio… 🎶";
    const i = Math.min(
      LINES.length - 1,
      Math.floor((progress / 100) * LINES.length)
    );
    return LINES[i];
  }, [progress]);

  if (!active) return null;

  return (
    <Html center>
      <div style={wrap}>
        <div style={title}>Launching CelestaView…</div>

        <div style={barWrap}>
          <div style={{ ...bar, width: `${Math.round(progress)}%` }} />
        </div>
        <div style={pct}>{Math.round(progress)}%</div>
        <div style={hint}>{line}</div>
      </div>
    </Html>
  );
}

function short(url) {
  try {
    const u = new URL(url);
    return u.pathname.split("/").pop() || url;
  } catch {
    return url;
  }
}

const wrap = {
  minWidth: 280,
  maxWidth: 360,
  padding: "16px 18px",
  borderRadius: 14,
  backdropFilter: "blur(8px)",
  background: "rgba(0,0,0,0.55)",
  color: "#eafaff",
  textAlign: "center",
  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
};
const title = { fontSize: 20, letterSpacing: 0.5, marginBottom: 10 };
const barWrap = {
  width: "100%",
  height: 8,
  background: "rgba(255,255,255,0.1)",
  borderRadius: 8,
  overflow: "hidden",
  margin: "6px 0 10px",
};
const bar = {
  height: "100%",
  background: "linear-gradient(90deg, #7AEFD5 0%, #00E0FF 50%, #7AEFD5 100%)",
  transition: "width 220ms ease",
};
const pct = { fontSize: 14, opacity: 0.9, marginBottom: 6 };
const hint = { fontSize: 13, opacity: 0.85, marginBottom: 6 };
const asset = { fontSize: 12, opacity: 0.6 };
