import "@/styles/globals.css";
import { Michroma } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
// If using Next.js 13+ with app dir, add this in _app.js or _document.js:
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={michroma.variable}>
      <Navbar /> {/* ✅ use your styled component here */}
      <Component {...pageProps} />
    </main>
  );
}
