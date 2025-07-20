// Planet.js
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Planet({ path, position, scale, onPlanetClick, name }) {
  const ref = useRef();
  const { scene } = useGLTF(path);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        if (onPlanetClick) onPlanetClick(position, name);
      }}
    />
  );
}
