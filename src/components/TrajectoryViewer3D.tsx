import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import type { Trajectory } from "@/data/missions";

interface TrajectoryViewer3DProps {
  trajectory: Trajectory;
  missionName: string;
}

const TrajectoryPath = ({ trajectory }: { trajectory: Trajectory }) => {
  // Create curved path through space
  const points = useMemo(() => {
    const pathPoints: THREE.Vector3[] = [];
    const steps = trajectory.path.length;
    
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      // Create an elliptical orbit-like path
      const angle = t * Math.PI * 2;
      const radius = 5 + Math.sin(t * Math.PI) * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(t * Math.PI * 4) * 2;
      const z = Math.sin(angle) * radius;
      pathPoints.push(new THREE.Vector3(x, y, z));
    }
    
    return pathPoints;
  }, [trajectory.path.length]);
  
  return (
    <>
      <Line
        points={points}
        color="#00FFFF"
        lineWidth={2}
        transparent
        opacity={0.7}
      />
      
      {/* Waypoint markers */}
      {points.map((point, index) => (
        <group key={index} position={point}>
          <Sphere args={[0.15, 16, 16]}>
            <meshStandardMaterial 
              color="#00FFFF" 
              emissive="#00FFFF"
              emissiveIntensity={0.5}
            />
          </Sphere>
          {index < trajectory.path.length && (
            <Text
              position={[0.5, 0.5, 0]}
              fontSize={0.3}
              color="#FFFFFF"
              anchorX="left"
              anchorY="middle"
            >
              {index + 1}
            </Text>
          )}
        </group>
      ))}
    </>
  );
};

const SpaceCraft = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <coneGeometry args={[0.3, 0.8, 4]} />
      <meshStandardMaterial 
        color="#FF00FF" 
        emissive="#FF00FF"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const Stars = () => {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#FFFFFF" sizeAttenuation transparent opacity={0.6} />
    </points>
  );
};

export const TrajectoryViewer3D = ({ trajectory, missionName }: TrajectoryViewer3DProps) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden cosmic-glow">
      <Canvas camera={{ position: [10, 5, 10], fov: 60 }}>
        <color attach="background" args={["#0a0a1a"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00FF" />
        
        <Stars />
        <SpaceCraft />
        <TrajectoryPath trajectory={trajectory} />
        
        {/* Central body (Earth/Planet) */}
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#1a5fb4"
            emissive="#1a5fb4"
            emissiveIntensity={0.2}
          />
        </Sphere>
        
        {/* Target destination */}
        {trajectory.landingLocation && (
          <Sphere args={[0.8, 32, 32]} position={[8, 0, 8]}>
            <meshStandardMaterial 
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={0.3}
            />
          </Sphere>
        )}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
        />
        
        <Text
          position={[0, 8, 0]}
          fontSize={0.8}
          color="#00FFFF"
          anchorX="center"
          anchorY="middle"
        >
          {missionName}
        </Text>
      </Canvas>
    </div>
  );
};
