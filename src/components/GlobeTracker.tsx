import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { missions } from "@/data/missions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Satellite } from "lucide-react";
import * as THREE from "three";

interface MissionMarkerProps {
  position: [number, number, number];
  missionName: string;
  color: string;
  isActive: boolean;
}

const MissionMarker = ({ position, missionName, color, isActive }: MissionMarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isActive ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {missionName}
      </Text>
    </group>
  );
};

interface EarthProps {
  activeMissions: Array<{
    name: string;
    lat: number;
    lng: number;
    color: string;
    status: string;
  }>;
}

const Earth = ({ activeMissions }: EarthProps) => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  const latLngToVector3 = (lat: number, lng: number, radius: number = 2) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    
    return [x, y, z] as [number, number, number];
  };

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          color="#1e40af"
          emissive="#0a1628"
          emissiveIntensity={0.2}
          shininess={25}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial 
          color="#4f7cff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Mission markers */}
      {activeMissions.map((mission, index) => (
        <MissionMarker
          key={index}
          position={latLngToVector3(mission.lat, mission.lng)}
          missionName={mission.name}
          color={mission.color}
          isActive={mission.status.includes("Active")}
        />
      ))}
    </group>
  );
};

export const GlobeTracker = () => {
  const [activeMissions, setActiveMissions] = useState<Array<{
    name: string;
    lat: number;
    lng: number;
    color: string;
    status: string;
  }>>([]);

  useEffect(() => {
    // Calculate positions for active missions with orbital data
    const missionsWithPositions = missions
      .filter(m => m.trajectory.orbitalData && m.trajectory.currentStatus?.includes("Active"))
      .map((mission, index) => {
        const orbitalData = mission.trajectory.orbitalData!;
        const now = new Date();
        const msPerOrbit = orbitalData.period * 60 * 1000;
        const msSinceLaunch = now.getTime() % msPerOrbit;
        const orbitFraction = msSinceLaunch / msPerOrbit;

        const lat = Math.sin(orbitFraction * 2 * Math.PI) * orbitalData.inclination;
        const earthRotationRate = 360 / (24 * 60);
        const lng = ((orbitFraction * 360) - (now.getMinutes() * earthRotationRate)) % 360;
        const adjustedLng = lng > 180 ? lng - 360 : lng;

        const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
        
        return {
          name: mission.name,
          lat: parseFloat(lat.toFixed(2)),
          lng: parseFloat(adjustedLng.toFixed(2)),
          color: colors[index % colors.length],
          status: mission.trajectory.currentStatus || ""
        };
      });

    setActiveMissions(missionsWithPositions);

    const interval = setInterval(() => {
      const updated = missions
        .filter(m => m.trajectory.orbitalData && m.trajectory.currentStatus?.includes("Active"))
        .map((mission, index) => {
          const orbitalData = mission.trajectory.orbitalData!;
          const now = new Date();
          const msPerOrbit = orbitalData.period * 60 * 1000;
          const msSinceLaunch = now.getTime() % msPerOrbit;
          const orbitFraction = msSinceLaunch / msPerOrbit;

          const lat = Math.sin(orbitFraction * 2 * Math.PI) * orbitalData.inclination;
          const earthRotationRate = 360 / (24 * 60);
          const lng = ((orbitFraction * 360) - (now.getMinutes() * earthRotationRate)) % 360;
          const adjustedLng = lng > 180 ? lng - 360 : lng;

          const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
          
          return {
            name: mission.name,
            lat: parseFloat(lat.toFixed(2)),
            lng: parseFloat(adjustedLng.toFixed(2)),
            color: colors[index % colors.length],
            status: mission.trajectory.currentStatus || ""
          };
        });
      
      setActiveMissions(updated);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient">
          <Globe className="w-6 h-6" />
          Live Mission Tracker
        </CardTitle>
        <CardDescription>
          Real-time positions of active space missions orbiting Earth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] rounded-lg overflow-hidden border border-primary/20 bg-background/50">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Earth activeMissions={activeMissions} />
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              minDistance={3}
              maxDistance={10}
            />
          </Canvas>
        </div>

        {/* Mission List */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Satellite className="w-4 h-4 text-primary" />
            Tracked Missions ({activeMissions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeMissions.map((mission, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-card/50 border border-primary/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: mission.color }}
                  />
                  <div>
                    <p className="font-medium text-sm">{mission.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {mission.lat.toFixed(2)}°, {mission.lng.toFixed(2)}°
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {mission.status.split(" - ")[0]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
