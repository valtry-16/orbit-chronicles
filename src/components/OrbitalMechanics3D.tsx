import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere, Text, Html } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface OrbitProps {
  radius: number;
  color: string;
  speed: number;
  label: string;
  showOrbit?: boolean;
}

const OrbitingBody = ({ radius, color, speed, label, showOrbit = true }: OrbitProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [angle, setAngle] = useState(0);

  useFrame((state, delta) => {
    setAngle((prev) => prev + delta * speed);
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
    }
  });

  const orbitPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return points;
  }, [radius]);

  return (
    <>
      {showOrbit && (
        <Line points={orbitPoints} color={color} lineWidth={1} transparent opacity={0.4} />
      )}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </>
  );
};

const HohmannTransferScene = () => {
  const transferRef = useRef<THREE.Group>(null);
  const [phase, setPhase] = useState(0);

  useFrame((state, delta) => {
    setPhase((prev) => (prev + delta * 0.3) % (Math.PI * 2));
  });

  // Inner orbit (Earth)
  const innerRadius = 5;
  const outerRadius = 8;

  const innerOrbitPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * innerRadius, 0, Math.sin(theta) * innerRadius));
    }
    return points;
  }, []);

  const outerOrbitPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * outerRadius, 0, Math.sin(theta) * outerRadius));
    }
    return points;
  }, []);

  // Transfer ellipse
  const transferPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const a = (innerRadius + outerRadius) / 2; // Semi-major axis
    const c = (outerRadius - innerRadius) / 2; // Distance from center to focus
    const b = Math.sqrt(a * a - c * c); // Semi-minor axis
    
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const r = (a * (1 - (c / a) ** 2)) / (1 + (c / a) * Math.cos(theta));
      points.push(new THREE.Vector3(
        Math.cos(theta) * r - c,
        0,
        Math.sin(theta) * r
      ));
    }
    return points;
  }, []);

  const spacecraftPos = useMemo(() => {
    if (phase < Math.PI) {
      // On transfer orbit
      const a = (innerRadius + outerRadius) / 2;
      const c = (outerRadius - innerRadius) / 2;
      const b = Math.sqrt(a * a - c * c);
      const theta = phase;
      const r = (a * (1 - (c / a) ** 2)) / (1 + (c / a) * Math.cos(theta));
      return new THREE.Vector3(
        Math.cos(theta) * r - c,
        0,
        Math.sin(theta) * r
      );
    } else {
      // On outer orbit
      const adjustedPhase = phase - Math.PI;
      return new THREE.Vector3(
        Math.cos(adjustedPhase + Math.PI) * outerRadius,
        0,
        Math.sin(adjustedPhase + Math.PI) * outerRadius
      );
    }
  }, [phase]);

  return (
    <group ref={transferRef}>
      {/* Central body (Sun/Earth) */}
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.5} />
      </Sphere>

      {/* Orbits */}
      <Line points={innerOrbitPoints} color="#00FFFF" lineWidth={2} transparent opacity={0.6} />
      <Line points={outerOrbitPoints} color="#FF00FF" lineWidth={2} transparent opacity={0.6} />
      <Line points={transferPoints} color="#00FF00" lineWidth={2} transparent opacity={0.8} />

      {/* Spacecraft */}
      <mesh position={spacecraftPos}>
        <coneGeometry args={[0.2, 0.5, 4]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} />
      </mesh>

      {/* Labels */}
      <Text position={[0, -2, 0]} fontSize={0.4} color="#FFFFFF" anchorX="center" anchorY="middle">
        Hohmann Transfer
      </Text>
      
      <Text position={[innerRadius, 0.5, 0]} fontSize={0.3} color="#00FFFF" anchorX="center">
        Inner Orbit
      </Text>
      
      <Text position={[outerRadius, 0.5, 0]} fontSize={0.3} color="#FF00FF" anchorX="center">
        Outer Orbit
      </Text>
    </group>
  );
};

const GravityAssistScene = () => {
  const spacecraftRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state, delta) => {
    setProgress((prev) => (prev + delta * 0.15) % 1);
  });

  const planetPos = new THREE.Vector3(3, 0, 0);
  const planetRadius = 1.2;

  // Spacecraft trajectory (hyperbolic approach and departure)
  const trajectoryPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const numPoints = 100;
    
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 - 1; // -1 to 1
      const x = t * 8;
      const y = 0;
      
      // Hyperbolic trajectory around planet
      const distToPlanet = Math.sqrt((x - planetPos.x) ** 2);
      const influence = Math.exp(-distToPlanet * 0.5);
      const z = influence * Math.sin(t * Math.PI * 3) * 3;
      
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  const spacecraftPosition = useMemo(() => {
    const idx = Math.floor(progress * (trajectoryPoints.length - 1));
    return trajectoryPoints[idx] || trajectoryPoints[0];
  }, [progress, trajectoryPoints]);

  return (
    <group>
      {/* Planet */}
      <Sphere args={[planetRadius, 32, 32]} position={planetPos}>
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.3} />
      </Sphere>

      {/* Spacecraft trajectory */}
      <Line points={trajectoryPoints} color="#00FF00" lineWidth={2} transparent opacity={0.7} />

      {/* Spacecraft */}
      <mesh ref={spacecraftRef} position={spacecraftPosition}>
        <coneGeometry args={[0.2, 0.5, 4]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} />
      </mesh>

      {/* Velocity vectors */}
      {progress < 0.3 && (
        <Line
          points={[
            spacecraftPosition,
            new THREE.Vector3(spacecraftPosition.x + 1.5, spacecraftPosition.y, spacecraftPosition.z)
          ]}
          color="#FF0000"
          lineWidth={3}
        />
      )}
      
      {progress > 0.7 && (
        <Line
          points={[
            spacecraftPosition,
            new THREE.Vector3(spacecraftPosition.x + 2, spacecraftPosition.y, spacecraftPosition.z + 0.5)
          ]}
          color="#00FF00"
          lineWidth={3}
        />
      )}

      <Text position={[0, -3, 0]} fontSize={0.4} color="#FFFFFF" anchorX="center">
        Gravity Assist Maneuver
      </Text>
      
      <Text position={planetPos.clone().add(new THREE.Vector3(0, 2, 0))} fontSize={0.3} color="#3B82F6" anchorX="center">
        Planet
      </Text>
    </group>
  );
};

const MultiBodySystem = () => {
  return (
    <group>
      {/* Sun */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.8} />
      </Sphere>
      
      <Text position={[0, -1.5, 0]} fontSize={0.3} color="#FDB813" anchorX="center">
        Sun
      </Text>

      {/* Planets with realistic-ish orbital speeds */}
      <OrbitingBody radius={3} color="#8B7355" speed={0.8} label="Mercury" />
      <OrbitingBody radius={4.5} color="#FFA500" speed={0.6} label="Venus" />
      <OrbitingBody radius={6} color="#00BFFF" speed={0.5} label="Earth" />
      <OrbitingBody radius={8} color="#FF4500" speed={0.4} label="Mars" />
      <OrbitingBody radius={11} color="#DAA520" speed={0.2} label="Jupiter" />
    </group>
  );
};

const Stars = () => {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
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

export const OrbitalMechanics3D = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Orbital Mechanics Visualization</CardTitle>
        <CardDescription>
          Interactive real-time simulations of spacecraft trajectories, orbital transfers, and gravity assists
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="solar-system" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="solar-system">Solar System</TabsTrigger>
            <TabsTrigger value="hohmann">Hohmann Transfer</TabsTrigger>
            <TabsTrigger value="gravity">Gravity Assist</TabsTrigger>
          </TabsList>

          <TabsContent value="solar-system" className="space-y-4">
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">Real-time Simulation</Badge>
              <Badge variant="outline">Multi-body Dynamics</Badge>
            </div>
            <div className="w-full h-[600px] rounded-lg overflow-hidden cosmic-glow">
              <Canvas camera={{ position: [15, 10, 15], fov: 60 }}>
                <color attach="background" args={["#0a0a1a"]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
                <Stars />
                <MultiBodySystem />
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={40}
                />
              </Canvas>
            </div>
            <p className="text-sm text-muted-foreground">
              Interactive solar system showing planetary orbits with realistic relative speeds. Use mouse to rotate, scroll to zoom.
            </p>
          </TabsContent>

          <TabsContent value="hohmann" className="space-y-4">
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">Orbital Transfer</Badge>
              <Badge variant="outline">Delta-v Optimization</Badge>
            </div>
            <div className="w-full h-[600px] rounded-lg overflow-hidden cosmic-glow">
              <Canvas camera={{ position: [0, 15, 15], fov: 60 }}>
                <color attach="background" args={["#0a0a1a"]} />
                <ambientLight intensity={0.3} />
                <pointLight position={[0, 10, 10]} intensity={1} color="#FFFFFF" />
                <Stars />
                <HohmannTransferScene />
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={35}
                />
              </Canvas>
            </div>
            <p className="text-sm text-muted-foreground">
              Animation showing a Hohmann transfer orbit - the most fuel-efficient way to move between two circular orbits. 
              The spacecraft fires engines at periapsis (green orbit) to transfer between inner (cyan) and outer (magenta) orbits.
            </p>
          </TabsContent>

          <TabsContent value="gravity" className="space-y-4">
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">Gravity Assist</Badge>
              <Badge variant="outline">Velocity Change</Badge>
            </div>
            <div className="w-full h-[600px] rounded-lg overflow-hidden cosmic-glow">
              <Canvas camera={{ position: [0, 12, 12], fov: 60 }}>
                <color attach="background" args={["#0a0a1a"]} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#FFFFFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
                <Stars />
                <GravityAssistScene />
                <OrbitControls 
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={35}
                />
              </Canvas>
            </div>
            <p className="text-sm text-muted-foreground">
              Gravity assist (or slingshot) maneuver where a spacecraft uses a planet's gravity to change its velocity and trajectory.
              Red vector shows incoming velocity, green shows increased outgoing velocity after the maneuver - all without using fuel!
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
