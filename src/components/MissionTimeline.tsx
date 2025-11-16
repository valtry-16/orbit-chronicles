import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Rocket, Award, Clock, ChevronRight, Star } from "lucide-react";
import { missions } from "@/data/missions";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  agency: string;
  category: "launch" | "milestone" | "discovery" | "future";
  significance: "low" | "medium" | "high" | "historic";
}

export const MissionTimeline = () => {
  const [selectedDecade, setSelectedDecade] = useState<string>("all");

  // Generate timeline events from missions data
  const timelineEvents: TimelineEvent[] = missions.map(mission => {
    const year = new Date(mission.launchDate).getFullYear();
    const isActive = mission.trajectory.currentStatus?.toLowerCase().includes("active");
    const isFuture = year > new Date().getFullYear();
    
    return {
      year,
      title: mission.name,
      description: mission.briefExplanation,
      agency: mission.agency,
      category: isFuture ? "future" : (isActive ? "milestone" : "launch"),
      significance: year < 1980 ? "historic" : "high"
    };
  });

  // Add major milestones
  const majorMilestones: TimelineEvent[] = [
    {
      year: 1957,
      title: "Sputnik 1",
      description: "First artificial satellite launched by Soviet Union, marking the beginning of the Space Age.",
      agency: "USSR",
      category: "milestone",
      significance: "historic"
    },
    {
      year: 1961,
      title: "Yuri Gagarin - First Human in Space",
      description: "Soviet cosmonaut Yuri Gagarin becomes the first human to journey into outer space.",
      agency: "USSR",
      category: "milestone",
      significance: "historic"
    },
    {
      year: 1969,
      title: "Moon Landing - Apollo 11",
      description: "Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon.",
      agency: "NASA",
      category: "milestone",
      significance: "historic"
    },
    {
      year: 1981,
      title: "First Space Shuttle Flight",
      description: "Columbia becomes the first reusable spacecraft to reach orbit.",
      agency: "NASA",
      category: "milestone",
      significance: "historic"
    },
    {
      year: 2000,
      title: "ISS Continuous Habitation Begins",
      description: "International Space Station becomes permanently crewed.",
      agency: "NASA / Roscosmos / ESA / JAXA / CSA",
      category: "milestone",
      significance: "high"
    },
    {
      year: 2012,
      title: "SpaceX Dragon - First Private Spacecraft to ISS",
      description: "SpaceX's Dragon becomes first commercial spacecraft to deliver cargo to ISS.",
      agency: "SpaceX",
      category: "milestone",
      significance: "high"
    },
    {
      year: 2030,
      title: "Artemis III - Return to Moon",
      description: "NASA plans to land first woman and next man on lunar south pole.",
      agency: "NASA",
      category: "future",
      significance: "high"
    },
    {
      year: 2033,
      title: "First Crewed Mars Mission",
      description: "Planned first human landing on Mars, establishing permanent presence.",
      agency: "NASA / SpaceX",
      category: "future",
      significance: "historic"
    }
  ];

  const allEvents = [...timelineEvents, ...majorMilestones].sort((a, b) => a.year - b.year);

  const decades = ["all", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s", "2030s+"];

  const filteredEvents = selectedDecade === "all" 
    ? allEvents 
    : allEvents.filter(event => {
        if (selectedDecade === "2030s+") return event.year >= 2030;
        const decadeStart = parseInt(selectedDecade.slice(0, 4));
        return event.year >= decadeStart && event.year < decadeStart + 10;
      });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "launch": return <Rocket className="w-4 h-4" />;
      case "milestone": return <Award className="w-4 h-4" />;
      case "discovery": return <Star className="w-4 h-4" />;
      case "future": return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch(significance) {
      case "historic": return "border-l-yellow-500 bg-yellow-500/5";
      case "high": return "border-l-primary bg-primary/5";
      case "medium": return "border-l-blue-500 bg-blue-500/5";
      default: return "border-l-muted bg-muted/5";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Clock className="w-6 h-6" />
            Space Exploration Timeline
          </CardTitle>
          <CardDescription>
            From the dawn of the Space Age to future missions - explore humanity's journey beyond Earth
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Decade Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {decades.map(decade => (
              <Button
                key={decade}
                variant={selectedDecade === decade ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDecade(decade)}
              >
                {decade === "all" ? "All Time" : decade}
              </Button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />
            
            <div className="space-y-6">
              {filteredEvents.map((event, idx) => (
                <div key={idx} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-4 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />
                  
                  {/* Event card */}
                  <Card className={`border-l-4 ${getSignificanceColor(event.significance)} hover:shadow-lg transition-all`}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono text-lg">
                            {event.year}
                          </Badge>
                          <Badge variant={event.category === "future" ? "secondary" : "default"}>
                            {getCategoryIcon(event.category)}
                            <span className="ml-1 capitalize">{event.category}</span>
                          </Badge>
                        </div>
                        <Badge variant="outline" className="w-fit">
                          {event.agency}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gradient">
                        {event.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                      
                      {event.significance === "historic" && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-semibold">Historic Milestone</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-primary">{allEvents.filter(e => e.year < 2025).length}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Missions</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-accent">{allEvents.filter(e => e.significance === "historic").length}</p>
                <p className="text-xs text-muted-foreground mt-1">Historic Events</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-success">{allEvents.filter(e => e.category === "milestone").length}</p>
                <p className="text-xs text-muted-foreground mt-1">Major Milestones</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-warning">{allEvents.filter(e => e.category === "future").length}</p>
                <p className="text-xs text-muted-foreground mt-1">Planned Missions</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
