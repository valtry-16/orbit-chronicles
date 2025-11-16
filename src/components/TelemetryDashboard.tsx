import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Battery, Radio, Thermometer, Gauge, Satellite, AlertCircle, CheckCircle } from "lucide-react";
import { missions } from "@/data/missions";

export const TelemetryDashboard = () => {
  const activeMissions = missions.filter(m => 
    m.trajectory.currentStatus?.toLowerCase().includes("active") || 
    m.trajectory.currentStatus?.toLowerCase().includes("operational")
  );

  const [telemetryData, setTelemetryData] = useState<Record<string, any>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newData: Record<string, any> = {};
      activeMissions.forEach(mission => {
        newData[mission.id] = {
          power: 65 + Math.random() * 25,
          batteryHealth: 85 + Math.random() * 10,
          temperature: -50 + Math.random() * 100,
          signalStrength: 75 + Math.random() * 20,
          dataRate: 100 + Math.random() * 400,
          systemHealth: Math.random() > 0.1 ? "nominal" : "warning",
          instrumentStatus: {
            primary: Math.random() > 0.05,
            secondary: Math.random() > 0.05,
            communications: Math.random() > 0.02,
            propulsion: Math.random() > 0.05
          }
        };
      });
      setTelemetryData(newData);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (health: string) => {
    switch(health) {
      case "nominal": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold text-gradient">Real-Time Mission Telemetry</h2>
      </div>
      
      <Tabs defaultValue={activeMissions[0]?.id} className="w-full">
        <TabsList className="grid w-full gap-2 h-auto bg-card/50 flex-wrap" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))` }}>
          {activeMissions.map(mission => (
            <TabsTrigger
              key={mission.id}
              value={mission.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Satellite className="w-4 h-4 mr-2" />
              {mission.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {activeMissions.map(mission => {
          const data = telemetryData[mission.id] || {};
          
          return (
            <TabsContent key={mission.id} value={mission.id} className="space-y-6 mt-6">
              {/* Mission Status Overview */}
              <Card className="cosmic-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Mission Status
                    </CardTitle>
                    <Badge variant={data.systemHealth === "nominal" ? "default" : "destructive"}>
                      {data.systemHealth === "nominal" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {data.systemHealth?.toUpperCase() || "STANDBY"}
                    </Badge>
                  </div>
                  <CardDescription>{mission.name} - {mission.agency}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Power Systems */}
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Battery className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Power</span>
                          </div>
                          <span className="text-sm font-bold">{data.power?.toFixed(1) || 0}%</span>
                        </div>
                        <Progress value={data.power || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Battery Health: {data.batteryHealth?.toFixed(1) || 0}%
                        </p>
                      </CardContent>
                    </Card>

                    {/* Temperature */}
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium">Temperature</span>
                          </div>
                          <span className="text-sm font-bold">{data.temperature?.toFixed(1) || 0}°C</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-4">
                          Operating Range: -100°C to +100°C
                        </div>
                      </CardContent>
                    </Card>

                    {/* Communications */}
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Radio className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">Signal</span>
                          </div>
                          <span className="text-sm font-bold">{data.signalStrength?.toFixed(0) || 0}%</span>
                        </div>
                        <Progress value={data.signalStrength || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Data Rate: {data.dataRate?.toFixed(0) || 0} kbps
                        </p>
                      </CardContent>
                    </Card>

                    {/* System Health */}
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Gauge className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Systems</span>
                        </div>
                        <div className="space-y-2 mt-4">
                          {data.instrumentStatus && Object.entries(data.instrumentStatus).map(([key, status]: [string, any]) => (
                            <div key={key} className="flex items-center justify-between text-xs">
                              <span className="capitalize">{key}</span>
                              <Badge variant={status ? "default" : "destructive"} className="h-5">
                                {status ? "OK" : "ERR"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Scientific Instruments */}
              <Card className="cosmic-glow">
                <CardHeader>
                  <CardTitle>Scientific Instruments Status</CardTitle>
                  <CardDescription>Real-time instrument readings and operational status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mission.components.slice(0, 4).map((component, idx) => (
                      <Card key={idx} className="bg-card/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-sm">{component.name}</h4>
                            <Badge variant={Math.random() > 0.1 ? "default" : "secondary"}>
                              {Math.random() > 0.1 ? "Active" : "Standby"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{component.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Data Collection:</span>
                              <span className="font-medium">{(Math.random() * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={Math.random() * 100} className="h-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Orbital Parameters (if available) */}
              {mission.trajectory.orbitalData && (
                <Card className="cosmic-glow">
                  <CardHeader>
                    <CardTitle>Orbital Parameters</CardTitle>
                    <CardDescription>Current orbital state and dynamics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Altitude</p>
                        <p className="text-lg font-bold">{mission.trajectory.orbitalData.altitude} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Velocity</p>
                        <p className="text-lg font-bold">{mission.trajectory.orbitalData.velocity} km/s</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Period</p>
                        <p className="text-lg font-bold">{mission.trajectory.orbitalData.period} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Inclination</p>
                        <p className="text-lg font-bold">{mission.trajectory.orbitalData.inclination}°</p>
                      </div>
                      {mission.trajectory.orbitalData.apogee && (
                        <div>
                          <p className="text-xs text-muted-foreground">Apogee</p>
                          <p className="text-lg font-bold">{mission.trajectory.orbitalData.apogee} km</p>
                        </div>
                      )}
                      {mission.trajectory.orbitalData.perigee && (
                        <div>
                          <p className="text-xs text-muted-foreground">Perigee</p>
                          <p className="text-lg font-bold">{mission.trajectory.orbitalData.perigee} km</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
