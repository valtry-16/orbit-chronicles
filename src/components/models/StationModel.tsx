import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const StationModel = () => {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central truss */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 6, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Habitat modules */}
      {[-1.5, 0, 1.5].map((yPos, i) => (
        <mesh key={i} position={[0, yPos, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Solar panels - top left */}
      <group position={[-3, 2.5, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 4, 2]} />
          <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Solar panels - top right */}
      <group position={[3, 2.5, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 4, 2]} />
          <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Solar panels - bottom left */}
      <group position={[-3, -2.5, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 4, 2]} />
          <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Solar panels - bottom right */}
      <group position={[3, -2.5, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 4, 2]} />
          <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Radiators */}
      {[-2, 2].map((yPos, i) => (
        <mesh key={i} position={[0, yPos, 1.5]}>
          <boxGeometry args={[0.05, 1.5, 1]} />
          <meshStandardMaterial color="#ffcc00" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Docking port */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};
