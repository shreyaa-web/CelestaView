import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const container = document.getElementById("stars");
    if (container && container.children.length === 0) {
      const totalStars = 300;

      for (let i = 0; i < totalStars; i++) {
        const star = document.createElement("div");
        const sizes = ["small", "medium", "large", "pointy"];
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        star.className = `star ${sizeClass}`;

        // Random position
        star.style.top = Math.random() * window.innerHeight + "px";
        star.style.left = Math.random() * window.innerWidth + "px";

        // Random animation delay so stars move at different times
        star.style.animationDelay = Math.random() * 2 + "s";
        star.style.animationDuration = 4 + Math.random() * 6 + "s";

        container.appendChild(star);
      }
      // ⬇ Add inside useEffect (after normal stars are generated)
      const createShootingStar = () => {
        const container = document.getElementById("stars");
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";

        // Random start position from left to right
        shootingStar.style.top =
          Math.random() * window.innerHeight * 0.5 + "px";
        shootingStar.style.left = Math.random() * window.innerWidth + "px";

        container.appendChild(shootingStar);

        // Remove after animation ends
        setTimeout(() => {
          container.removeChild(shootingStar);
        }, 1000); // should match animation duration
      };

      // Create a shooting star every few seconds
      const shootingInterval = setInterval(() => {
        createShootingStar();
      }, 3000); // every 3 seconds

      // Clean up
      return () => {
        clearInterval(shootingInterval);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>CelestaView</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="starry-background" id="stars"></div>

      <main>
        <h1 className="fancy-title">CelestaView</h1>

        <p>
          Let’s fly from the Moon to Mars. Your cosmic adventure starts here!
        </p>
      </main>
    </>
  );
}
