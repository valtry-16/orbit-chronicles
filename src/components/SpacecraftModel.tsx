import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { RocketModel } from "./models/RocketModel";
import { SatelliteModel } from "./models/SatelliteModel";
import { RoverModel } from "./models/RoverModel";
import { StationModel } from "./models/StationModel";
import { ProbeModel } from "./models/ProbeModel";

interface SpacecraftModelProps {
  type: "rocket" | "satellite" | "rover" | "station" | "probe";
}

export const SpacecraftModel = ({ type }: SpacecraftModelProps) => {
  const renderModel = () => {
    switch (type) {
      case "rocket":
        return <RocketModel />;
      case "satellite":
        return <SatelliteModel />;
      case "rover":
        return <RoverModel />;
      case "station":
        return <StationModel />;
      case "probe":
        return <ProbeModel />;
      default:
        return <RocketModel />;
    }
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden cosmic-glow bg-card/50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} />
        <OrbitControls enableZoom={true} enablePan={false} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4fc3f7" />
        
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {renderModel()}
        </Suspense>
      </Canvas>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Click and drag to rotate • Scroll to zoom
      </p>
    </div>
  );
};
