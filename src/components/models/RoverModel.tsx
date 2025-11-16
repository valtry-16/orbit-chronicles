import { useRef } from "react";
import { Mesh } from "three";

export const RoverModel = () => {
  return (
    <group>
      {/* Main rover body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.8, 1.5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Camera mast */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Camera head */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Wheels - 6 wheels total */}
      {[-0.8, 0, 0.8].map((xPos, i) =>
        [-1, 1].map((zDir, j) => (
          <group key={`${i}-${j}`} position={[xPos, -0.2, zDir * 0.9]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
              <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.7} />
            </mesh>
          </group>
        ))
      )}

      {/* Robotic arm */}
      <mesh position={[1.2, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arm end effector */}
      <mesh position={[1.8, 0.8, 0]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#777777" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Solar panel on top */}
      <mesh position={[0, 1, 0.6]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a237e" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};
