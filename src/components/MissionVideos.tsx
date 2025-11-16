import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Rocket, Target, Orbit, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MissionVideosProps {
  videos: {
    launch?: string;
    landing?: string;
    orbit?: string;
    mission?: string;
  };
  missionName: string;
}

export const MissionVideos = ({ videos, missionName }: MissionVideosProps) => {
  const availableVideos = Object.entries(videos).filter(([_, url]) => url);

  if (availableVideos.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'launch':
        return <Rocket className="w-4 h-4" />;
      case 'landing':
        return <Target className="w-4 h-4" />;
      case 'orbit':
        return <Orbit className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'launch':
        return 'Launch';
      case 'landing':
        return 'Landing';
      case 'orbit':
        return 'Orbit';
      case 'mission':
        return 'Mission Highlights';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <Card className="cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient">
          <Play className="w-5 h-5" />
          Mission Videos
        </CardTitle>
        <CardDescription>
          Watch key moments from the {missionName} mission
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={availableVideos[0][0]} className="w-full">
          <TabsList className="grid w-full gap-2 h-auto bg-card/50" style={{ gridTemplateColumns: `repeat(${availableVideos.length}, 1fr)` }}>
            {availableVideos.map(([type]) => (
              <TabsTrigger
                key={type}
                value={type}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                {getIcon(type)}
                {getTitle(type)}
              </TabsTrigger>
            ))}
          </TabsList>

          {availableVideos.map(([type, url]) => (
            <TabsContent key={type} value={type} className="mt-6">
              <div className="relative rounded-lg overflow-hidden bg-black aspect-video border border-primary/20 shadow-lg shadow-primary/10">
                <iframe
                  src={url}
                  title={`${missionName} - ${getTitle(type)}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="outline" className="text-sm">
                  {getIcon(type)}
                  <span className="ml-2">{getTitle(type)} Video</span>
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {missionName}
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
