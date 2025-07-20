import { useRouter } from "next/router";
import planetData from "@/data/planetData";
import Link from "next/link";
import Image from "next/image";

export default function PlanetDetail() {
  const router = useRouter();
  const { name } = router.query;
  const data = planetData[name?.toLowerCase()];

  if (!data) {
    return (
      <div style={{ padding: "2rem", color: "white", background: "black" }}>
        <h1 style={{ fontFamily: "Michroma", fontSize: "2rem" }}>
          Planet not found
        </h1>
        <Link href="/journey">← Back to space</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "4rem 5vw",
        fontFamily: "Michroma, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            textShadow: "0 0 10px rgba(255,255,255,0.4)",
            margin: 0,
          }}
        >
          {data.title}
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.7",
            margin: 0,
            color: "#dddddd",
          }}
        >
          {data.description}
        </p>

        {data.image && (
          <div style={{ width: "100%", maxWidth: "600px", margin: "1rem 0" }}>
            <Image
              src={data.image}
              alt={data.title}
              width={600}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "14px",
                boxShadow: "0 0 40px rgba(255,255,255,0.15)",
              }}
              unoptimized // only add this if you're using remote images without domain config
            />
          </div>
        )}

        <a
          href={data.source}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#6cf",
            color: "black",
            fontWeight: "bold",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#4ad")}
          onMouseOut={(e) => (e.target.style.background = "#6cf")}
        >
          🔭 Learn more on NASA↗
        </a>

        <Link
          href="/journey"
          style={{
            marginTop: "1rem",
            color: "#aaa",
            fontSize: "0.95rem",
            textDecoration: "underline",
          }}
        >
          ← Back to space
        </Link>
      </div>
    </div>
  );
}
