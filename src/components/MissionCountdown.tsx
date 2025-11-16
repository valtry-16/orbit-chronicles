import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Timer, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CountdownMission {
  id: string;
  name: string;
  agency: string;
  launchDate: Date;
  status: "upcoming" | "countdown" | "critical" | "launched";
}

export const MissionCountdown = () => {
  const [upcomingMissions, setUpcomingMissions] = useState<CountdownMission[]>([]);
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  const [notifiedMissions, setNotifiedMissions] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulated upcoming missions for demonstration
    const now = new Date();
    const simulatedMissions: CountdownMission[] = [
      {
        id: "demo-1",
        name: "Artemis II",
        agency: "NASA",
        launchDate: new Date(now.getTime() + 180000), // 3 minutes from now
        status: "upcoming"
      },
      {
        id: "demo-2",
        name: "Europa Clipper Test",
        agency: "NASA",
        launchDate: new Date(now.getTime() + 90000), // 1.5 minutes from now
        status: "upcoming"
      },
      {
        id: "demo-3",
        name: "Starship Test Flight",
        agency: "SpaceX",
        launchDate: new Date(now.getTime() + 45000), // 45 seconds from now
        status: "upcoming"
      }
    ];

    setUpcomingMissions(simulatedMissions);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newCountdowns: { [key: string]: number } = {};
      const newNotified = new Set(notifiedMissions);

      upcomingMissions.forEach((mission) => {
        const timeRemaining = Math.max(0, mission.launchDate.getTime() - now.getTime());
        newCountdowns[mission.id] = timeRemaining;

        // Countdown started notification (less than 5 minutes)
        if (timeRemaining > 0 && timeRemaining <= 300000 && !newNotified.has(`${mission.id}-start`)) {
          toast.info(`Countdown Started: ${mission.name}`, {
            description: `Launch scheduled in ${Math.floor(timeRemaining / 60000)} minutes`,
            icon: <Timer className="w-4 h-4" />
          });
          newNotified.add(`${mission.id}-start`);
        }

        // Critical countdown notification (last 60 seconds)
        if (timeRemaining > 0 && timeRemaining <= 60000 && !newNotified.has(`${mission.id}-critical`)) {
          toast.warning(`Critical: ${mission.name} Launch Imminent!`, {
            description: "Less than 60 seconds to launch",
            icon: <AlertCircle className="w-4 h-4" />,
            duration: 10000
          });
          newNotified.add(`${mission.id}-critical`);
        }

        // Launch notification
        if (timeRemaining === 0 && !newNotified.has(`${mission.id}-launch`)) {
          toast.success(`🚀 Liftoff! ${mission.name}`, {
            description: `${mission.agency} mission has launched!`,
            icon: <Rocket className="w-4 h-4" />,
            duration: 15000
          });
          newNotified.add(`${mission.id}-launch`);
        }
      });

      setCountdowns(newCountdowns);
      setNotifiedMissions(newNotified);
    }, 1000);

    return () => clearInterval(interval);
  }, [upcomingMissions, notifiedMissions]);

  const formatCountdown = (ms: number) => {
    if (ms === 0) return "LAUNCHED";
    
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `T-${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `T-${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (ms: number) => {
    if (ms === 0) return { variant: "default" as const, text: "Launched" };
    if (ms <= 60000) return { variant: "destructive" as const, text: "Critical" };
    if (ms <= 300000) return { variant: "default" as const, text: "Active Countdown" };
    return { variant: "secondary" as const, text: "Upcoming" };
  };

  const getCountdownColor = (ms: number) => {
    if (ms === 0) return "text-green-500";
    if (ms <= 60000) return "text-red-500 animate-pulse";
    if (ms <= 300000) return "text-yellow-500";
    return "text-primary";
  };

  return (
    <Card className="cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient">
          <Rocket className="w-6 h-6" />
          Mission Launch Countdowns
        </CardTitle>
        <CardDescription>
          Live countdown timers for upcoming launches with automatic notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingMissions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No upcoming launches scheduled at this time
            </p>
          ) : (
            upcomingMissions.map((mission) => {
              const timeRemaining = countdowns[mission.id] || 0;
              const status = getStatusBadge(timeRemaining);
              
              return (
                <div
                  key={mission.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50 space-y-3 md:space-y-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{mission.name}</h4>
                      <Badge variant={status.variant}>{status.text}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{mission.agency}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Launch Time</p>
                      <p className="text-sm">
                        {mission.launchDate.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="text-right min-w-[120px]">
                      <p className="text-xs text-muted-foreground mb-1">Countdown</p>
                      <p className={`text-2xl font-mono font-bold ${getCountdownColor(timeRemaining)}`}>
                        {formatCountdown(timeRemaining)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <AlertCircle className="w-3 h-3 inline mr-1" />
            You will receive automatic notifications when countdowns start, during critical phase (last 60 seconds), and at launch
          </p>
        </div>
      </CardContent>
    </Card>
  );
};