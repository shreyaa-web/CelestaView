import React, { useState } from "react";
import planetData from "../data/planetData";
import styles from "../styles/spaceRoute.module.css";
import Link from "next/link";

export default function SpaceRoute() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [bodies, setBodies] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowModal(false);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: source.trim().toLowerCase(),
          destination: destination.trim().toLowerCase(),
        }),
      });

      // Only parse JSON if the server actually sent JSON
      const isJson = res.headers
        .get("content-type")
        ?.toLowerCase()
        .includes("application/json");

      if (!res.ok) {
        const errMsg = isJson
          ? (await res.json())?.error
          : `HTTP ${res.status}`;
        setBodies([]);
        setError(errMsg || "Request failed");
        return;
      }

      const data = isJson ? await res.json() : { resultBodies: [] };
      setBodies(data.resultBodies || []);
      setShowModal(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.heading}>Celestial Journey Planner</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Source planet"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Destination planet"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Find Route
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>🪐 Intermediate Bodies</h2>
            <ul className={styles.bodyList}>
              {bodies.map((body, index) => (
                <li key={index} className={styles.bodyItem}>
                  {planetData[body]?.title || body}
                </li>
              ))}
            </ul>
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
