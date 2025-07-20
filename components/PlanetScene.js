import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Planet from "./Planet";
import { useRef, useState, useEffect } from "react";

// Fun facts
const facts = {
  Sun: "☀️ The Sun contains 99.8% of the mass in the Solar System.",
  Mercury: "☿ Mercury has no atmosphere to retain heat.",
  Venus: "♀️ Venus spins backward compared to most planets.",
  Earth: "🌍 Earth is the only known planet with life.",
  Moon: "🌕 The Moon is drifting away from Earth ~3.8 cm/year.",
  Mars: "🔴 Mars has the tallest volcano in the Solar System.",
  Jupiter: "🪐 Jupiter has at least 92 moons!",
  Saturn: "💍 Saturn's rings are made of ice and rock.",
  Uranus: "🌀 Uranus spins on its side!",
  Neptune: "🔵 Neptune has supersonic winds.",
  ISS: "🛰️ The ISS orbits Earth every 90 minutes.",
  Hubble: "🔭 Hubble has captured over 1.5 million observations!",
  Vesta: "🪨 Vesta is the second-largest asteroid and has its own gravity.",
  Pallas: "🪨 Pallas is the third-largest asteroid and orbits highly tilted.",
  Eros: "💫 Eros was the first asteroid orbited by a spacecraft (NEAR).",
  Itokawa: "🛰️ Itokawa was the first asteroid sampled and returned to Earth.",
  Bennu: "🧪 NASA brought Bennu samples back to Earth in 2023!",
  Pluto: "❄️ Pluto was reclassified as a dwarf planet in 2006.",
};

export default function PlanetScene({ searchTarget }) {
  const [selectedBody, setSelectedBody] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const controlsRef = useRef();
  const cameraRef = useRef();
  const planetRefs = useRef({});

  const handlePlanetClick = (position, name) => {
    const offset = 50;
    if (!cameraRef.current || !cameraRef.current.position) return;

    cameraRef.current.position.set(
      position[0],
      position[1],
      position[2] + offset
    );
    cameraRef.current.lookAt(position[0], position[1], position[2]);
    controlsRef.current?.target.set(position[0], position[1], position[2]);

    setSelectedBody(name);
    setSelectedPosition(position);
  };

  useEffect(() => {
    if (
      searchTarget &&
      planetRefs.current[searchTarget] &&
      cameraRef.current &&
      cameraRef.current.position
    ) {
      handlePlanetClick(planetRefs.current[searchTarget], searchTarget);
    }
  }, [searchTarget]);

  const planets = [
    {
      name: "Sun",
      path: "/models/sun.glb",
      position: [-1000, 0, 0],
      scale: 40,
    },
    {
      name: "Mercury",
      path: "/models/mercury.glb",
      position: [-480, 0, 0],
      scale: 0.05,
    },
    {
      name: "Venus",
      path: "/models/venus.glb",
      position: [-360, 0, 0],
      scale: 0.12,
    },
    {
      name: "Hubble",
      path: "/models/hubble_space_telescope.glb",
      position: [-240, 12, 3],
      scale: 0.001,
    },
    {
      name: "ISS",
      path: "/models/International_Space_Station.glb",
      position: [-240, 8, 2],
      scale: 0.05,
    },
    {
      name: "Earth",
      path: "/models/earth_and_clouds.glb",
      position: [-240, 0, 0],
      scale: 0.13,
    },
    {
      name: "Moon",
      path: "/models/moon.glb",
      position: [-225, -0.5, 1],
      scale: 0.03,
    },
    {
      name: "Mars",
      path: "/models/mars.glb",
      position: [-120, 0, 0],
      scale: 0.07,
    },
    {
      name: "Vesta",
      path: "/models/vesta.glb",
      position: [-100, 4, 3],
      scale: 1,
    },
    {
      name: "Pallas",
      path: "/models/pallas.glb",
      position: [-97, -2, -1],
      scale: 1,
    },
    {
      name: "Eros",
      path: "/models/eros.glb",
      position: [-95, 3, -2],
      scale: 0.00017,
    },
    {
      name: "Itokawa",
      path: "/models/itokawa.glb",
      position: [-92, -1, 1],
      scale: 1,
    },
    {
      name: "Bennu",
      path: "/models/bennu.glb",
      position: [-90, 2, 0],
      scale: 1,
    },
    {
      name: "Jupiter",
      path: "/models/jupiter.glb",
      position: [-25, 0, 0],
      scale: 1.0,
    },
    {
      name: "Saturn",
      path: "/models/saturn.glb",
      position: [150, 0, 0],
      scale: 0.3,
    },
    {
      name: "Uranus",
      path: "/models/uranus.glb",
      position: [320, 0, 0],
      scale: 0.35,
    },
    {
      name: "Neptune",
      path: "/models/neptune.glb",
      position: [460, 0, 0],
      scale: 0.34,
    },
    {
      name: "Pluto",
      path: "/models/pluto.glb",
      position: [550, 0, 0],
      scale: 2,
    },
  ];

  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 30, 1000], fov: 60 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[50, 50, 50]} intensity={1} />
        <OrbitControls
          ref={controlsRef}
          enableZoom
          minDistance={0}
          maxDistance={2000}
        />

        {planets.map(({ name, path, position, scale }) => {
          planetRefs.current[name] = position;
          return (
            <Planet
              key={name}
              name={name}
              path={path}
              position={position}
              scale={scale}
              onPlanetClick={handlePlanetClick}
            />
          );
        })}

        {selectedBody && selectedPosition && (
          <Html position={selectedPosition} center>
            <div
              style={{
                background: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "6px 12px",
                borderRadius: "8px",
                fontFamily: "Michroma, sans-serif",
                fontSize: "12px",
                boxShadow: "0 0 5px rgba(255,255,255,0.4)",
              }}
            >
              {selectedBody}
            </div>
          </Html>
        )}
      </Canvas>

      {selectedBody && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "30px",
            background: "#111c",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            maxWidth: "300px",
            fontFamily: "sans-serif",
            fontSize: "14px",
            boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            zIndex: 10,
          }}
        >
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "16px",
              fontFamily: "Michroma",
            }}
          >
            {selectedBody}
          </h2>
          <p>{facts[selectedBody] || "No facts available."}</p>
          <a
            href={`/planet/${selectedBody.toLowerCase()}`}
            style={{
              marginTop: "10px",
              display: "inline-block",
              color: "#6cf",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Want to know more about {selectedBody}?
          </a>
        </div>
      )}
    </>
  );
}
