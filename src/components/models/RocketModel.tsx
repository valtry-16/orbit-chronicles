import { useRef } from "react";

export const RocketModel = () => {
  return (
    <group>
      {/* Rocket body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rocket nose cone */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#ff4444" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Fins */}
      {[0, 90, 180, 270].map((rotation, i) => (
        <mesh
          key={i}
          position={[
            Math.sin((rotation * Math.PI) / 180) * 0.7,
            -1.5,
            Math.cos((rotation * Math.PI) / 180) * 0.7,
          ]}
          rotation={[0, (rotation * Math.PI) / 180, 0]}
        >
          <boxGeometry args={[0.1, 1, 0.8]} />
          <meshStandardMaterial color="#4444ff" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Engine nozzle */}
      <mesh position={[0, -2.3, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.6, 32]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Fuel tank bands */}
      {[-0.8, 0, 0.8].map((yPos, i) => (
        <mesh key={i} position={[0, yPos, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.15, 32]} />
          <meshStandardMaterial color="#ff6600" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};
