import { useEffect, useState } from "react";
import PlanetScene from "../components/PlanetScene";
import Navbar from "../components/Navbar"; // ✅ Make sure this path is correct

export default function Journey() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTarget, setSearchTarget] = useState(null);

  // Generate animated stars on mount
  useEffect(() => {
    const container = document.getElementById("stars");
    if (!container || container.children.length > 1) return;

    const totalStars = 300;
    for (let i = 0; i < totalStars; i++) {
      const star = document.createElement("div");
      const sizes = ["small", "medium", "large", "pointy"];
      const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
      star.className = `star ${sizeClass}`;
      star.style.top = Math.random() * window.innerHeight + "px";
      star.style.left = Math.random() * window.innerWidth + "px";
      star.style.animationDelay = Math.random() * 2 + "s";
      star.style.animationDuration = 4 + Math.random() * 6 + "s";
      container.appendChild(star);
    }
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const formatted = searchInput.trim();
    if (formatted.length > 0) {
      setSearchTarget(
        formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase()
      );
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* ✨ Starry Background */}
      <div
        id="stars"
        className="starry-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />

      {/* ✅ Navbar at top */}
      <div style={{ position: "absolute", top: 0, width: "100%", zIndex: 3 }}>
        <Navbar />
      </div>

      {/* 🔎 Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          background: "rgba(0,0,0,0.6)",
          padding: "10px 20px",
          borderRadius: "12px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          boxShadow: "0 0 15px rgba(255,255,255,0.3)",
        }}
      >
        <input
          type="text"
          placeholder="Search a planet, moon, satellite, asteroid..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            padding: "8px 14px",
            fontSize: "14px",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Michroma, sans-serif",
            minWidth: "300px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#6cf",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go
        </button>
      </form>

      {/* 🌌 3D Planet Scene */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <PlanetScene searchTarget={searchTarget} />
      </div>
    </div>
  );
}
