import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/journey">Go to space</Link>
        </li>
        <li>
          <Link href="/spaceRoute">Space Route</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
