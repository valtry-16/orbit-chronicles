import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, Clock, AlertTriangle, Info, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { nasaApi, NASANearEarthObject } from "@/services/nasaApi";
import { exportToCSV, exportToJSON, exportNEOtoPDF } from "@/utils/exportUtils";

interface NearEarthObject {
  id: string;
  name: string;
  type: "Asteroid" | "Comet";
  distanceFromEarth: number;
  approachDate: Date;
  nextVisibleDate?: Date;
  magnitude: number;
  hazardous: boolean;
  diameter: string;
  velocity: number;
  viewingLocation: string;
  bestViewingTime: string;
}

export const NEOTracker = () => {
  const [neoObjects, setNeoObjects] = useState<NearEarthObject[]>([]);
  const [notifiedObjects, setNotifiedObjects] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNASAData = async () => {
    setLoading(true);
    try {
      const neoFeed = await nasaApi.getUpcomingNeos();
      const transformedData: NearEarthObject[] = [];
      
      Object.values(neoFeed.near_earth_objects).forEach(dateNeos => {
        dateNeos.forEach((neo: NASANearEarthObject) => {
          if (neo.close_approach_data && neo.close_approach_data.length > 0) {
            const approach = neo.close_approach_data[0];
            const distanceKm = parseFloat(approach.miss_distance.kilometers);
            const velocityKmS = parseFloat(approach.relative_velocity.kilometers_per_second);
            
            transformedData.push({
              id: neo.id,
              name: neo.name.replace(/[()]/g, ''),
              type: "Asteroid",
              distanceFromEarth: distanceKm / 1000000,
              approachDate: new Date(approach.close_approach_date_full),
              nextVisibleDate: neo.absolute_magnitude_h < 18 ? new Date(approach.close_approach_date_full) : undefined,
              magnitude: neo.absolute_magnitude_h,
              hazardous: neo.is_potentially_hazardous_asteroid,
              diameter: `${(neo.estimated_diameter.kilometers.estimated_diameter_min).toFixed(2)}-${(neo.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)} km`,
              velocity: parseFloat(velocityKmS.toFixed(2)),
              viewingLocation: neo.absolute_magnitude_h < 15 ? "Visible with telescopes from most locations" : 
                               neo.absolute_magnitude_h < 18 ? "Requires large telescope in dark skies" : 
                               "Professional observatory only",
              bestViewingTime: neo.absolute_magnitude_h < 18 ? "11:00 PM - 3:00 AM local time" : "Not visible to amateur equipment"
            });
          }
        });
      });

      transformedData.sort((a, b) => a.distanceFromEarth - b.distanceFromEarth);
      setNeoObjects(transformedData);
      setLastUpdated(new Date());
      toast.success("Live NASA Data Loaded", {
        description: `${transformedData.length} Near-Earth Objects tracked`
      });
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      toast.error("Failed to load NASA data", {
        description: "Check API key or connection"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNASAData();
    const interval = setInterval(fetchNASAData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotified = new Set(notifiedObjects);
      neoObjects.forEach((neo) => {
        const now = new Date();
        const timeToApproach = neo.approachDate.getTime() - now.getTime();
        const daysUntil = timeToApproach / (1000 * 60 * 60 * 24);

        if (neo.hazardous && !newNotified.has(`${neo.id}-hazard`)) {
          toast.error(`⚠️ Potentially Hazardous: ${neo.name}`, {
            description: `Approaching Earth at ${neo.distanceFromEarth} million km in ${Math.floor(daysUntil)} days`
          });
          newNotified.add(`${neo.id}-hazard`);
        }

        if (daysUntil <= 3 && daysUntil > 0 && !newNotified.has(`${neo.id}-approach`)) {
          toast.info(`🌠 ${neo.type} Approaching: ${neo.name}`, {
            description: `Closest approach in ${Math.floor(daysUntil)} days at ${neo.distanceFromEarth} million km`
          });
          newNotified.add(`${neo.id}-approach`);
        }
      });
      setNotifiedObjects(newNotified);
    }, 10000);

    return () => clearInterval(interval);
  }, [neoObjects, notifiedObjects]);

  const getDistanceColor = (distance: number) => {
    if (distance < 0.01) return "text-red-500";
    if (distance < 0.1) return "text-orange-500";
    if (distance < 0.5) return "text-yellow-500";
    return "text-green-500";
  };

  const getDistanceStatus = (distance: number) => {
    if (distance < 0.01) return "VERY CLOSE";
    if (distance < 0.1) return "Close Approach";
    if (distance < 0.5) return "Near";
    return "Distant";
  };

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    const exportData = neoObjects.map(neo => ({
      name: neo.name,
      type: neo.type,
      distanceFromEarth: `${neo.distanceFromEarth} million km`,
      approachDate: neo.approachDate.toISOString(),
      diameter: neo.diameter,
      velocity: `${neo.velocity} km/s`,
      magnitude: neo.magnitude,
      hazardous: neo.hazardous ? 'Yes' : 'No'
    }));

    const filename = `neo-tracking-${new Date().toISOString().split('T')[0]}`;
    switch (format) {
      case 'csv':
        exportToCSV(exportData, filename);
        toast.success("CSV Export Complete");
        break;
      case 'json':
        exportToJSON(exportData, filename);
        toast.success("JSON Export Complete");
        break;
      case 'pdf':
        exportNEOtoPDF(neoObjects, filename);
        toast.success("PDF Export Complete");
        break;
    }
  };

  return (
    <div className="space-y-6 relative z-10">
      <Alert className="glass-morphism">
        <Info className="h-4 w-4" />
        <AlertTitle>Live NASA Data</AlertTitle>
        <AlertDescription>
          Real-time asteroid tracking from NASA's Near-Earth Object Web Service
        </AlertDescription>
      </Alert>

      <Card className="cosmic-glow floating-card">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="flex items-center gap-2 text-gradient">
              <Sparkles className="w-6 h-6" />
              NASA Near-Earth Object Tracker
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNASAData}
              disabled={loading}
              className="glass-morphism"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <CardDescription>
            Live tracking • {neoObjects.length} objects monitored
            {lastUpdated && (
              <span className="block text-xs mt-1">Updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => handleExport('pdf')} variant="outline" size="sm" className="glass-morphism">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={() => handleExport('csv')} variant="outline" size="sm" className="glass-morphism">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport('json')} variant="outline" size="sm" className="glass-morphism">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading live NASA data...</p>
            </div>
          ) : (
            neoObjects.map((neo) => {
              const now = new Date();
              const daysUntil = Math.floor((neo.approachDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div
                  key={neo.id}
                  className="p-4 rounded-lg glass-morphism space-y-3"
                >
                  {neo.hazardous && (
                    <Alert variant="destructive" className="mb-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Potentially Hazardous Object</AlertTitle>
                      <AlertDescription>
                        NASA monitoring this object due to its size and orbit proximity
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{neo.name}</h3>
                        <Badge variant={neo.hazardous ? "destructive" : "secondary"}>
                          {neo.type}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Distance:</span>
                          <p className={`font-bold ${getDistanceColor(neo.distanceFromEarth)}`}>
                            {neo.distanceFromEarth.toFixed(4)} million km
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getDistanceStatus(neo.distanceFromEarth)}
                          </p>
                        </div>

                        <div>
                          <span className="text-muted-foreground">Diameter:</span>
                          <p className="font-semibold">{neo.diameter}</p>
                        </div>

                        <div>
                          <span className="text-muted-foreground">Velocity:</span>
                          <p className="font-semibold">{neo.velocity} km/s</p>
                        </div>

                        <div>
                          <span className="text-muted-foreground">Magnitude:</span>
                          <p className="font-semibold">{neo.magnitude.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:text-right space-y-2">
                      <div className="flex items-center gap-2 md:justify-end">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Closest Approach</p>
                          <p className="font-semibold">{daysUntil} days</p>
                          <p className="text-xs">{neo.approachDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {neo.nextVisibleDate && (
                    <div className="mt-4 p-3 glass-morphism rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-2">Viewing Information</h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">Next Visible:</span>{" "}
                              <span className="font-medium">{neo.nextVisibleDate.toLocaleDateString()}</span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Best Time:</span>{" "}
                              <span className="font-medium">{neo.bestViewingTime}</span>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Location:</span>{" "}
                              <span className="font-medium">{neo.viewingLocation}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};