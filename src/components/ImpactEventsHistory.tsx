import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, MapPin, Calendar, Ruler } from "lucide-react";
import { useState } from "react";

interface ImpactEvent {
  id: string;
  name: string;
  year: number;
  location: string;
  coordinates: { lat: number; lng: number };
  diameter: string;
  energy: string;
  casualties?: number;
  description: string;
  severity: "catastrophic" | "major" | "significant" | "minor";
}

export const ImpactEventsHistory = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const impactEvents: ImpactEvent[] = [
    {
      id: "chicxulub",
      name: "Chicxulub Impact",
      year: -65000000,
      location: "Yucatán Peninsula, Mexico",
      coordinates: { lat: 21.3, lng: -89.5 },
      diameter: "10-15 km asteroid",
      energy: "100 million megatons TNT",
      description: "Caused the extinction of dinosaurs and 75% of Earth's species. Created a 180km crater and triggered global climate change lasting decades.",
      severity: "catastrophic"
    },
    {
      id: "tunguska",
      name: "Tunguska Event",
      year: 1908,
      location: "Tunguska, Siberia, Russia",
      coordinates: { lat: 60.9, lng: 101.9 },
      diameter: "60-190 m asteroid/comet",
      energy: "10-15 megatons TNT",
      description: "Largest impact event in recorded history. Flattened 2,000 km² of forest, felling an estimated 80 million trees. No crater formed due to airburst.",
      severity: "major"
    },
    {
      id: "chelyabinsk",
      name: "Chelyabinsk Meteor",
      year: 2013,
      location: "Chelyabinsk, Russia",
      coordinates: { lat: 55.15, lng: 61.4 },
      diameter: "20 m asteroid",
      energy: "500 kilotons TNT",
      casualties: 1500,
      description: "Airburst over populated area. Shockwave damaged 7,200 buildings and injured ~1,500 people from flying glass. Largest recorded entry since Tunguska.",
      severity: "significant"
    },
    {
      id: "barringer",
      name: "Barringer Crater (Meteor Crater)",
      year: -50000,
      location: "Arizona, USA",
      coordinates: { lat: 35.0, lng: -111.0 },
      diameter: "50 m iron meteorite",
      energy: "10 megatons TNT",
      description: "Best-preserved impact crater on Earth. 1,200 meters in diameter and 170 meters deep. Used for Apollo astronaut training.",
      severity: "major"
    },
    {
      id: "vredefort",
      name: "Vredefort Crater",
      year: -2023000000,
      location: "Free State, South Africa",
      coordinates: { lat: -27.0, lng: 27.5 },
      diameter: "10-15 km asteroid",
      energy: "Over 1 billion megatons",
      description: "Largest verified impact crater on Earth at 300 km diameter. Now a UNESCO World Heritage Site. Impact significantly altered Earth's crust.",
      severity: "catastrophic"
    },
    {
      id: "sudbury",
      name: "Sudbury Basin",
      year: -1849000000,
      location: "Ontario, Canada",
      coordinates: { lat: 46.6, lng: -81.2 },
      diameter: "10-15 km asteroid",
      energy: "Comparable to Vredefort",
      description: "Second-largest confirmed impact structure. Rich nickel and copper deposits formed by impact. Crater is 130 km long, 62 km wide.",
      severity: "catastrophic"
    },
    {
      id: "popigai",
      name: "Popigai Crater",
      year: -35700000,
      location: "Siberia, Russia",
      coordinates: { lat: 71.7, lng: 111.2 },
      diameter: "5-8 km asteroid",
      energy: "Millions of megatons",
      description: "Impact created industrial-grade synthetic diamonds. Crater is 100 km in diameter. One of Earth's largest impact structures.",
      severity: "catastrophic"
    },
    {
      id: "manicouagan",
      name: "Manicouagan Crater",
      year: -214000000,
      location: "Quebec, Canada",
      coordinates: { lat: 51.4, lng: -68.7 },
      diameter: "5 km asteroid",
      energy: "Millions of megatons",
      description: "Visible from space as a ring-shaped lake. 85 km diameter. May have contributed to Triassic-Jurassic extinction event.",
      severity: "catastrophic"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "catastrophic": return "destructive";
      case "major": return "default";
      case "significant": return "secondary";
      default: return "outline";
    }
  };

  const formatYear = (year: number) => {
    if (year < 0) {
      const absYear = Math.abs(year);
      if (absYear >= 1000000) {
        return `${(absYear / 1000000).toFixed(1)} million years ago`;
      }
      return `${absYear.toLocaleString()} years ago`;
    }
    return year.toString();
  };

  const sortedEvents = [...impactEvents].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <AlertTriangle className="w-6 h-6" />
            Historical Impact Events Database
          </CardTitle>
          <CardDescription>
            Major asteroid and comet impacts throughout Earth's history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />

                {sortedEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`relative pl-12 pb-8 cursor-pointer transition-all ${
                      selectedEvent === event.id ? 'scale-105' : ''
                    }`}
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-2 w-5 h-5 rounded-full border-4 border-background ${
                      event.severity === 'catastrophic' ? 'bg-red-500' :
                      event.severity === 'major' ? 'bg-orange-500' :
                      event.severity === 'significant' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />

                    <Card className={`transition-all ${selectedEvent === event.id ? 'ring-2 ring-primary' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{event.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={getSeverityColor(event.severity) as any}>
                                {event.severity}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {formatYear(event.year)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Location:
                            </span>
                            <p className="font-medium">{event.location}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Ruler className="w-3 h-3" />
                              Object Size:
                            </span>
                            <p className="font-medium">{event.diameter}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Energy Released:</span>
                            <p className="font-medium">{event.energy}</p>
                          </div>
                          {event.casualties && (
                            <div>
                              <span className="text-muted-foreground">Casualties:</span>
                              <p className="font-medium text-red-500">~{event.casualties.toLocaleString()} injured</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map">
              <div className="space-y-4">
                <div className="aspect-video rounded-lg border border-border/50 bg-muted/50 flex items-center justify-center relative overflow-hidden">
                  {/* Simple world map representation */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-background" />
                  </div>
                  
                  <div className="relative z-10 text-center space-y-4 p-8">
                    <MapPin className="w-16 h-16 mx-auto text-primary" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Interactive Impact Map</h3>
                      <p className="text-muted-foreground">
                        Click on timeline events to see impact locations
                      </p>
                      {selectedEvent && (
                        <div className="mt-4 p-4 bg-card rounded-lg border border-primary/20">
                          {impactEvents.find(e => e.id === selectedEvent) && (
                            <>
                              <h4 className="font-semibold mb-2">
                                {impactEvents.find(e => e.id === selectedEvent)?.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Coordinates: {impactEvents.find(e => e.id === selectedEvent)?.coordinates.lat}°N, 
                                {impactEvents.find(e => e.id === selectedEvent)?.coordinates.lng}°E
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overlay impact markers */}
                  {impactEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all ${
                        selectedEvent === event.id 
                          ? 'scale-150 ring-4 ring-primary' 
                          : 'hover:scale-125'
                      } ${
                        event.severity === 'catastrophic' ? 'bg-red-500' :
                        event.severity === 'major' ? 'bg-orange-500' :
                        event.severity === 'significant' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{
                        left: `${((event.coordinates.lng + 180) / 360) * 100}%`,
                        top: `${((90 - event.coordinates.lat) / 180) * 100}%`
                      }}
                      onClick={() => setSelectedEvent(event.id)}
                      title={event.name}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Catastrophic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span>Major</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Significant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Minor</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};