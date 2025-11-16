import { useState } from "react";
import { missions } from "@/data/missions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Rocket, Scale, Calendar, Building2, Gauge, Orbit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export const SpacecraftComparison = () => {
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  const addMission = (missionId: string) => {
    if (!selectedMissions.includes(missionId) && selectedMissions.length < 3) {
      setSelectedMissions([...selectedMissions, missionId]);
      setSelectedId("");
    }
  };

  const removeMission = (missionId: string) => {
    setSelectedMissions(selectedMissions.filter(id => id !== missionId));
  };

  const selectedMissionData = selectedMissions.map(id => 
    missions.find(m => m.id === id)
  ).filter(Boolean);

  const availableMissions = missions.filter(m => !selectedMissions.includes(m.id));

  // Prepare comparison chart data
  const componentCountData = selectedMissionData.map(mission => ({
    name: mission!.name.split(' ')[0],
    components: mission!.components.length,
    fill: mission!.id === selectedMissions[0] ? "#00FFFF" : mission!.id === selectedMissions[1] ? "#FF00FF" : "#FFD700"
  }));

  // Performance metrics for radar chart
  const getPerformanceScore = (mission: typeof selectedMissionData[0]) => {
    if (!mission) return null;
    
    const componentScore = Math.min(mission.components.length * 20, 100);
    const hasOrbit = mission.trajectory.orbitalData ? 80 : 40;
    const hasVideos = mission.videos ? 90 : 50;
    const complexityScore = mission.detailedHistory.length > 500 ? 85 : 60;
    
    return {
      name: mission.name.split(' ')[0],
      instrumentation: componentScore,
      documentation: complexityScore,
      tracking: hasOrbit,
      media: hasVideos
    };
  };

  const radarData = selectedMissionData.map(getPerformanceScore).filter(Boolean);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Spacecraft Comparison Tool
          </CardTitle>
          <CardDescription>
            Compare technical specifications, performance metrics, and capabilities of up to 3 missions side-by-side
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a mission to compare..." />
              </SelectTrigger>
              <SelectContent>
                {availableMissions.map((mission) => (
                  <SelectItem key={mission.id} value={mission.id}>
                    {mission.name} - {mission.agency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => selectedId && addMission(selectedId)}
              disabled={!selectedId || selectedMissions.length >= 3}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          {selectedMissions.length >= 3 && (
            <p className="text-sm text-muted-foreground mt-2">Maximum 3 missions can be compared at once</p>
          )}
        </CardContent>
      </Card>

      {selectedMissionData.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Rocket className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No missions selected. Add missions above to start comparing their specifications.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedMissionData.length > 0 && (
        <>
          {/* Comparison Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Component Count Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={componentCountData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="components" name="Components" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {radarData.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={[
                      { metric: "Instrumentation", ...Object.fromEntries(radarData.map(d => [d.name, d.instrumentation])) },
                      { metric: "Documentation", ...Object.fromEntries(radarData.map(d => [d.name, d.documentation])) },
                      { metric: "Tracking", ...Object.fromEntries(radarData.map(d => [d.name, d.tracking])) },
                      { metric: "Media", ...Object.fromEntries(radarData.map(d => [d.name, d.media])) }
                    ]}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" stroke="hsl(var(--foreground))" />
                      <PolarRadiusAxis stroke="hsl(var(--foreground))" />
                      {radarData.map((data, idx) => (
                        <Radar
                          key={data.name}
                          name={data.name}
                          dataKey={data.name}
                          stroke={idx === 0 ? "#00FFFF" : idx === 1 ? "#FF00FF" : "#FFD700"}
                          fill={idx === 0 ? "#00FFFF" : idx === 1 ? "#FF00FF" : "#FFD700"}
                          fillOpacity={0.3}
                        />
                      ))}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedMissionData.map((mission) => (
              <Card key={mission!.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10"
                  onClick={() => removeMission(mission!.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <CardHeader>
                  <img 
                    src={mission!.thumbnail} 
                    alt={mission!.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="pr-8">{mission!.name}</CardTitle>
                  <CardDescription>{mission!.agency}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Launch:</span>
                      <span className="text-muted-foreground">{mission!.launchDate}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Type:</span>
                      <Badge variant="outline">{mission!.modelType}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Components:</span>
                      <span className="text-muted-foreground">{mission!.components.length}</span>
                    </div>

                    {mission!.trajectory.orbitalData && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Orbit className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Altitude:</span>
                          <span className="text-muted-foreground">
                            {mission!.trajectory.orbitalData.altitude.toLocaleString()} km
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Velocity:</span>
                          <span className="text-muted-foreground">
                            {mission!.trajectory.orbitalData.velocity} km/s
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Components</h4>
                    <div className="space-y-1">
                      {mission!.components.slice(0, 4).map((comp, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{comp.name}</span>
                        </div>
                      ))}
                      {mission!.components.length > 4 && (
                        <div className="text-sm text-muted-foreground italic">
                          +{mission!.components.length - 4} more components
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Status</h4>
                    <Badge variant={mission!.trajectory.currentStatus?.includes("Active") ? "default" : "secondary"}>
                      {mission!.trajectory.currentStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
