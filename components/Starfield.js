// components/Starfield.js
import { useEffect, useRef } from "react";

export default function Starfield({ count = 300 }) {
  const ref = useRef(null);

  useEffect(() => {
    // SSR safety
    if (typeof window === "undefined") return;
    const container = ref.current;
    if (!container) return;

    // only generate once per mount
    if (container.children.length === 0) {
      const sizes = ["small", "medium", "large", "pointy"];

      // create stars
      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        star.className = `star ${sizeClass}`;

        // random position
        star.style.top = Math.random() * window.innerHeight + "px";
        star.style.left = Math.random() * window.innerWidth + "px";

        // random timing
        star.style.animationDelay = Math.random() * 2 + "s";
        star.style.animationDuration = 4 + Math.random() * 6 + "s";

        container.appendChild(star);
      }

      // shooting stars (same as your index.js)
      const createShootingStar = () => {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        shootingStar.style.top =
          Math.random() * window.innerHeight * 0.5 + "px";
        shootingStar.style.left = Math.random() * window.innerWidth + "px";
        container.appendChild(shootingStar);
        setTimeout(() => {
          if (container.contains(shootingStar)) {
            container.removeChild(shootingStar);
          }
        }, 1000); // match animation duration
      };

      const shootingInterval = setInterval(createShootingStar, 3000);

      // cleanup on unmount: remove interval + remove stars
      return () => {
        clearInterval(shootingInterval);
        while (container.firstChild)
          container.removeChild(container.firstChild);
      };
    }
  }, [count]);

  // NOTE: className matches your globals.css (.starry-background)
  // Positioning is from CSS: fixed full-screen background layer.
  return (
    <div
      ref={ref}
      className="starry-background"
      style={{ zIndex: 1, pointerEvents: "none" }}
    />
  );
}
