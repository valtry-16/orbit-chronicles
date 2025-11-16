import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const SatelliteModel = () => {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main satellite body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Solar panels - left */}
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Solar panels - right */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Antenna dish */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Antenna support */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Communication antennas */}
      {[1, -1].map((dir, i) => (
        <mesh key={i} position={[0, dir * 0.7, 0.5]} rotation={[0, 0, dir * Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};
