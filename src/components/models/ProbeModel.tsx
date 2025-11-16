import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const ProbeModel = () => {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main probe body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 1.2]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Large antenna dish */}
      <mesh position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.15, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Antenna support structure */}
      <mesh position={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.05, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Instruments boom */}
      <mesh position={[0, 0, 1]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* RTG power source */}
      <mesh position={[1.2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#aa6600" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Small antennas */}
      {[0.4, -0.4].map((xPos, i) => (
        <mesh key={i} position={[xPos, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Thruster pods */}
      {[-0.5, 0.5].map((xPos, i) => (
        <mesh key={i} position={[xPos, -0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.2, 8]} />
          <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};
