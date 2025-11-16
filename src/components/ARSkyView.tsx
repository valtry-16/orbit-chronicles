import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Compass, Eye, Info, Smartphone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CelestialObject {
  id: string;
  name: string;
  type: "spacecraft" | "asteroid" | "comet" | "planet";
  azimuth: number; // 0-360 degrees
  altitude: number; // -90 to 90 degrees
  magnitude: number;
  distance: string;
}

export const ARSkyView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [permission, setPermission] = useState<"granted" | "denied" | "prompt">("prompt");

  // Simulated celestial objects (in real app, calculate based on time/location)
  const celestialObjects: CelestialObject[] = [
    {
      id: "iss",
      name: "International Space Station",
      type: "spacecraft",
      azimuth: 180,
      altitude: 45,
      magnitude: -3.5,
      distance: "408 km altitude"
    },
    {
      id: "jupiter",
      name: "Jupiter",
      type: "planet",
      azimuth: 220,
      altitude: 30,
      magnitude: -2.2,
      distance: "778 million km"
    },
    {
      id: "comet-pons",
      name: "Comet 12P/Pons-Brooks",
      type: "comet",
      azimuth: 270,
      altitude: 25,
      magnitude: 9.5,
      distance: "1.2 million km"
    }
  ];

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setPermission("granted");
        toast.success("Camera Access Granted", {
          description: "Point your camera at the sky to identify objects"
        });
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      setPermission("denied");
      toast.error("Camera Access Denied", {
        description: "Please grant camera permission to use AR view"
      });
    }
  };

  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          startOrientationTracking();
        }
      } catch (error) {
        console.error("Orientation permission denied:", error);
      }
    } else {
      startOrientationTracking();
    }
  };

  const startOrientationTracking = () => {
    window.addEventListener('deviceorientation', (event) => {
      setDeviceOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0
      });
    });
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Draw AR overlays
  useEffect(() => {
    if (!cameraActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawOverlays = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate which objects are in view based on device orientation
      const viewAzimuth = deviceOrientation.alpha;
      const viewAltitude = 90 - (deviceOrientation.beta || 0);

      celestialObjects.forEach((obj) => {
        // Calculate if object is in current view (±30 degrees)
        const azimuthDiff = Math.abs(obj.azimuth - viewAzimuth);
        const altitudeDiff = Math.abs(obj.altitude - viewAltitude);

        if (azimuthDiff < 30 && altitudeDiff < 30) {
          // Calculate screen position
          const x = (canvas.width / 2) + ((obj.azimuth - viewAzimuth) * canvas.width / 60);
          const y = (canvas.height / 2) + ((viewAltitude - obj.altitude) * canvas.height / 60);

          // Draw marker
          ctx.fillStyle = obj.type === 'spacecraft' ? '#3b82f6' :
                          obj.type === 'comet' ? '#22c55e' :
                          obj.type === 'asteroid' ? '#eab308' : '#8b5cf6';
          
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();

          // Draw label
          ctx.fillStyle = 'white';
          ctx.font = '14px sans-serif';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3;
          ctx.strokeText(obj.name, x + 15, y + 5);
          ctx.fillText(obj.name, x + 15, y + 5);

          // Draw info
          ctx.font = '11px sans-serif';
          ctx.strokeText(obj.distance, x + 15, y + 20);
          ctx.fillText(obj.distance, x + 15, y + 20);
        }
      });

      requestAnimationFrame(drawOverlays);
    };

    drawOverlays();
  }, [cameraActive, deviceOrientation]);

  return (
    <div className="space-y-6">
      <Alert>
        <Smartphone className="h-4 w-4" />
        <AlertTitle>Best Experience on Mobile</AlertTitle>
        <AlertDescription>
          AR Sky View works best on mobile devices with cameras and orientation sensors.
          Point your device at the sky to identify celestial objects in real-time.
        </AlertDescription>
      </Alert>

      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Eye className="w-6 h-6" />
            Augmented Reality Sky View
          </CardTitle>
          <CardDescription>
            Use your camera to identify spacecraft, asteroids, and comets in the night sky
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!cameraActive ? (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg border border-border/50 bg-muted/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 mx-auto text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enable Camera Access</h3>
                    <p className="text-muted-foreground mb-4">
                      Point your camera at the sky to identify celestial objects
                    </p>
                    <Button 
                      onClick={() => {
                        requestCameraPermission();
                        requestOrientationPermission();
                      }}
                      size="lg"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Start AR View
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Requirements:</strong>
                    <ul className="list-disc list-inside mt-1">
                      <li>Camera access</li>
                      <li>Device orientation sensors</li>
                      <li>Clear night sky</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Compass className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>How to use:</strong>
                    <ul className="list-disc list-inside mt-1">
                      <li>Point at sky</li>
                      <li>Move slowly</li>
                      <li>Tap markers for info</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-primary/20">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  width={1280}
                  height={720}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Compass indicator */}
                <div className="absolute top-4 left-4 bg-black/70 rounded-lg p-3 text-white">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    <div className="text-sm">
                      <div>Azimuth: {Math.round(deviceOrientation.alpha)}°</div>
                      <div>Altitude: {Math.round(90 - (deviceOrientation.beta || 0))}°</div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={stopCamera}
                  className="absolute bottom-4 right-4"
                >
                  Stop Camera
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {celestialObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className="p-2 rounded-lg border border-border/50 bg-card/50 text-sm"
                  >
                    <Badge variant="secondary" className="mb-1">
                      {obj.type}
                    </Badge>
                    <p className="font-semibold text-xs">{obj.name}</p>
                    <p className="text-xs text-muted-foreground">Mag: {obj.magnitude}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};