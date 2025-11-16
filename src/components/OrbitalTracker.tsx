import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Activity, Gauge, Navigation, Clock } from "lucide-react";
import type { OrbitalData } from "@/data/missions";

interface OrbitalTrackerProps {
  orbitalData: OrbitalData;
  missionName: string;
}

export const OrbitalTracker = ({ orbitalData, missionName }: OrbitalTrackerProps) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    lng: 0,
    timestamp: new Date()
  });

  // Simulate real-time orbital position calculation
  useEffect(() => {
    const calculatePosition = () => {
      const now = new Date();
      const msPerOrbit = orbitalData.period * 60 * 1000;
      const msSinceLaunch = now.getTime() % msPerOrbit;
      const orbitFraction = msSinceLaunch / msPerOrbit;

      // Calculate latitude based on inclination
      const lat = Math.sin(orbitFraction * 2 * Math.PI) * orbitalData.inclination;
      
      // Calculate longitude (Earth rotates ~15 degrees per hour)
      const earthRotationRate = 360 / (24 * 60); // degrees per minute
      const lng = ((orbitFraction * 360) - (now.getMinutes() * earthRotationRate)) % 360;
      const adjustedLng = lng > 180 ? lng - 360 : lng;

      setCurrentPosition({
        lat: parseFloat(lat.toFixed(4)),
        lng: parseFloat(adjustedLng.toFixed(4)),
        timestamp: now
      });
    };

    calculatePosition();
    const interval = setInterval(calculatePosition, 1000);
    return () => clearInterval(interval);
  }, [orbitalData]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className="cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient">
          <Satellite className="w-5 h-5" />
          Real-Time Orbital Tracking
        </CardTitle>
        <CardDescription>
          Live position data calculated using orbital mechanics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Current Position</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {currentPosition.lat > 0 ? '+' : ''}{currentPosition.lat}°
              </p>
              <p className="text-sm text-muted-foreground">Latitude</p>
              <p className="text-2xl font-bold text-primary">
                {currentPosition.lng > 0 ? '+' : ''}{currentPosition.lng}°
              </p>
              <p className="text-sm text-muted-foreground">Longitude</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Last Update</span>
            </div>
            <p className="text-2xl font-bold text-accent">
              {formatTime(currentPosition.timestamp)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">UTC Time</p>
            <Badge variant="outline" className="mt-2 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>

        {/* Orbital Parameters */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-sm text-muted-foreground mb-1">Altitude</p>
            <p className="text-xl font-bold text-foreground">{orbitalData.altitude} km</p>
          </div>

          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-sm text-muted-foreground mb-1">Velocity</p>
            <p className="text-xl font-bold text-foreground">{orbitalData.velocity} km/s</p>
          </div>

          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-sm text-muted-foreground mb-1">Period</p>
            <p className="text-xl font-bold text-foreground">{orbitalData.period} min</p>
          </div>

          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-sm text-muted-foreground mb-1">Inclination</p>
            <p className="text-xl font-bold text-foreground">{orbitalData.inclination}°</p>
          </div>

          {orbitalData.apogee && (
            <div className="p-3 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground mb-1">Apogee</p>
              <p className="text-xl font-bold text-foreground">{orbitalData.apogee} km</p>
            </div>
          )}

          {orbitalData.perigee && (
            <div className="p-3 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground mb-1">Perigee</p>
              <p className="text-xl font-bold text-foreground">{orbitalData.perigee} km</p>
            </div>
          )}
        </div>

        {/* Visual Orbit Indicator */}
        <div className="relative h-48 rounded-lg bg-gradient-to-b from-background to-card/50 overflow-hidden border border-primary/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Earth */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/50" />
              
              {/* Orbit path */}
              <div 
                className="absolute border-2 border-primary/30 rounded-full"
                style={{
                  width: '200%',
                  height: '200%',
                  top: '-50%',
                  left: '-50%',
                  animation: 'spin 10s linear infinite'
                }}
              >
                {/* Satellite position */}
                <div 
                  className="absolute w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary"
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    animation: `pulse 2s ease-in-out infinite`
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Gauge className="w-3 h-3" />
              <span>Orbital visualization (not to scale)</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </CardContent>
    </Card>
  );
};
