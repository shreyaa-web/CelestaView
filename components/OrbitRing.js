// components/OrbitRing.js
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function OrbitRing({ radius }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.0005; // slight rotation for dynamic effect
    }
  });

  const segments = 100;
  const positions = [];

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    positions.push(radius * Math.cos(angle), 0, radius * Math.sin(angle));
  }

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(positions)}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="gray" linewidth={1} />
    </line>
  );
}
