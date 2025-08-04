import "@/styles/globals.css";
import { Michroma } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
});

export default function App({ Component, pageProps }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.2;

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          console.log("Still blocked");
        });

      // Remove listener after first click
      window.removeEventListener("click", tryPlay);
    };

    // Try to autoplay once user interacts
    window.addEventListener("click", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <main className={michroma.variable}>
      <Navbar />

      {/* 🔊 Global background audio (hidden player) */}
      <audio
        ref={audioRef}
        src="/cosmic-space.mp3"
        loop
        preload="auto"
        style={{ display: "none" }}
      />

      {/* 🎵 Toggle button (bottom-left corner) */}
      <button
        onClick={toggleAudio}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 9999,
          padding: "10px 16px",
          borderRadius: "8px",
          background: "#111",
          color: "white",
          border: "1px solid #555",
          cursor: "pointer",
          fontFamily: "Michroma, sans-serif",
          fontSize: "0.8rem",
          boxShadow: "0 0 10px rgba(255,255,255,0.2)",
        }}
      >
        {isPlaying ? "⏸ Pause Music" : "▶️ Play Music"}
      </button>

      <Component {...pageProps} />
    </main>
  );
}
