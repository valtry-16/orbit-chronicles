import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sun, Zap, Radio, AlertTriangle, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { missions } from "@/data/missions";

interface SpaceWeather {
  solarFlareLevel: "None" | "C-Class" | "M-Class" | "X-Class";
  cosmicRadiation: number; // percentage
  solarWindSpeed: number; // km/s
  geomagneticStorm: "None" | "Minor" | "Moderate" | "Strong" | "Severe";
  lastUpdate: Date;
}

interface MissionImpact {
  missionId: string;
  missionName: string;
  communicationImpact: "Low" | "Medium" | "High";
  instrumentImpact: "Low" | "Medium" | "High";
  status: "Operational" | "Monitoring" | "Safe Mode";
}

export const SpaceWeatherDashboard = () => {
  const [weather, setWeather] = useState<SpaceWeather>({
    solarFlareLevel: "None",
    cosmicRadiation: 45,
    solarWindSpeed: 400,
    geomagneticStorm: "None",
    lastUpdate: new Date()
  });

  const [missionImpacts, setMissionImpacts] = useState<MissionImpact[]>([]);

  useEffect(() => {
    // Simulate real-time space weather updates
    const interval = setInterval(() => {
      const flareChance = Math.random();
      let flareLevel: SpaceWeather["solarFlareLevel"] = "None";
      
      if (flareChance > 0.95) flareLevel = "X-Class";
      else if (flareChance > 0.85) flareLevel = "M-Class";
      else if (flareChance > 0.70) flareLevel = "C-Class";

      const radiation = 30 + Math.random() * 60;
      const windSpeed = 300 + Math.random() * 400;
      
      let storm: SpaceWeather["geomagneticStorm"] = "None";
      if (windSpeed > 600) storm = "Severe";
      else if (windSpeed > 550) storm = "Strong";
      else if (windSpeed > 500) storm = "Moderate";
      else if (windSpeed > 450) storm = "Minor";

      setWeather({
        solarFlareLevel: flareLevel,
        cosmicRadiation: Math.round(radiation),
        solarWindSpeed: Math.round(windSpeed),
        geomagneticStorm: storm,
        lastUpdate: new Date()
      });

      // Update mission impacts for active missions
      const activeMissions = missions.filter(m => 
        m.trajectory.currentStatus?.toLowerCase().includes("active")
      ).slice(0, 5);

      const impacts = activeMissions.map(mission => {
        const commImpact = radiation > 70 || windSpeed > 600 ? "High" : 
                          radiation > 50 || windSpeed > 500 ? "Medium" : "Low";
        const instImpact = flareLevel === "X-Class" ? "High" :
                          flareLevel === "M-Class" ? "Medium" : "Low";
        const status = (commImpact === "High" || instImpact === "High") ? "Safe Mode" :
                      (commImpact === "Medium" || instImpact === "Medium") ? "Monitoring" : "Operational";

        return {
          missionId: mission.id,
          missionName: mission.name,
          communicationImpact: commImpact as "Low" | "Medium" | "High",
          instrumentImpact: instImpact as "Low" | "Medium" | "High",
          status: status as "Operational" | "Monitoring" | "Safe Mode"
        };
      });

      setMissionImpacts(impacts);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getFlareColor = (level: string) => {
    switch (level) {
      case "X-Class": return "text-red-500";
      case "M-Class": return "text-orange-500";
      case "C-Class": return "text-yellow-500";
      default: return "text-green-500";
    }
  };

  const getStormColor = (level: string) => {
    switch (level) {
      case "Severe": return "destructive";
      case "Strong": return "destructive";
      case "Moderate": return "default";
      case "Minor": return "secondary";
      default: return "outline";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      default: return "text-green-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Safe Mode": return "destructive";
      case "Monitoring": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Sun className="w-6 h-6" />
            Real-Time Space Weather Conditions
          </CardTitle>
          <CardDescription>
            Live monitoring of solar activity and space environment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Solar Flare Activity</span>
              </div>
              <p className={`text-2xl font-bold ${getFlareColor(weather.solarFlareLevel)}`}>
                {weather.solarFlareLevel}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Cosmic Radiation</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{weather.cosmicRadiation}%</p>
                <Progress value={weather.cosmicRadiation} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Solar Wind Speed</span>
              </div>
              <p className="text-2xl font-bold">{weather.solarWindSpeed} km/s</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Geomagnetic Storm</span>
              </div>
              <Badge variant={getStormColor(weather.geomagneticStorm) as any}>
                {weather.geomagneticStorm}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Last updated: {weather.lastUpdate.toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>

      {/* Mission Impact Assessment */}
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle>Mission Impact Assessment</CardTitle>
          <CardDescription>
            Current space weather effects on active missions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {missionImpacts.map((impact) => (
              <div 
                key={impact.missionId}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50 space-y-2 md:space-y-0"
              >
                <div>
                  <h4 className="font-semibold">{impact.missionName}</h4>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Communication: </span>
                      <span className={`font-medium ${getImpactColor(impact.communicationImpact)}`}>
                        {impact.communicationImpact}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Instruments: </span>
                      <span className={`font-medium ${getImpactColor(impact.instrumentImpact)}`}>
                        {impact.instrumentImpact}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusBadge(impact.status) as any}>
                  {impact.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};