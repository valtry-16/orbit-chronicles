import { useState } from "react";
import { missions, Mission } from "@/data/missions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MissionComparison = () => {
  const [selectedMissions, setSelectedMissions] = useState<Mission[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  const addMission = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (mission && !selectedMissions.find((m) => m.id === missionId) && selectedMissions.length < 3) {
      setSelectedMissions([...selectedMissions, mission]);
      setSelectedId("");
    }
  };

  const removeMission = (missionId: string) => {
    setSelectedMissions(selectedMissions.filter((m) => m.id !== missionId));
  };

  const availableMissions = missions.filter(
    (m) => !selectedMissions.find((sm) => sm.id === m.id)
  );

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-gradient">Mission Comparison Tool</span>
            <Badge variant="secondary">{selectedMissions.length}/3 Selected</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <Select value={selectedId} onValueChange={addMission}>
              <SelectTrigger className="flex-1 bg-muted/50 border-primary/30">
                <SelectValue placeholder="Select a mission to compare..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30 z-50">
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
              variant="outline"
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedMissions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedMissions.map((mission) => (
            <Card key={mission.id} className="cosmic-glow relative">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10 h-8 w-8"
                onClick={() => removeMission(mission.id)}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <CardHeader>
                <img
                  src={mission.thumbnail}
                  alt={mission.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-lg">{mission.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Agency</p>
                  <p className="font-semibold text-primary">{mission.agency}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Launch Date</p>
                  <p className="font-semibold">{mission.launchDate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge variant="outline" className="mt-1">
                    {mission.modelType}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Components</p>
                  <p className="font-semibold text-accent">
                    {mission.components.length} Technical Parts
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <p className="font-semibold text-primary">
                    {mission.trajectory.currentStatus || "Mission Complete"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm line-clamp-3">{mission.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedMissions.length === 0 && (
        <Card className="cosmic-glow">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Select missions from the dropdown above to compare them side-by-side
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
