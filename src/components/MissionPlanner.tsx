import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Rocket, Target, Gauge, Calculator, Orbit, Zap, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MissionParams {
  vehicle: string;
  payload: number;
  destination: string;
  launchWindow: string;
}

const launchVehicles = [
  { id: "falcon-9", name: "Falcon 9", capacity: 22800, deltaV: 9.7, cost: 62 },
  { id: "falcon-heavy", name: "Falcon Heavy", capacity: 63800, deltaV: 11.2, cost: 97 },
  { id: "sls", name: "SLS Block 1", capacity: 95000, deltaV: 10.5, cost: 2000 },
  { id: "starship", name: "Starship", capacity: 150000, deltaV: 13.5, cost: 10 },
  { id: "ariane-6", name: "Ariane 6", capacity: 21500, deltaV: 9.5, cost: 115 },
  { id: "vulcan", name: "Vulcan Centaur", capacity: 27200, deltaV: 10.1, cost: 100 }
];

const destinations = [
  { id: "leo", name: "Low Earth Orbit", deltaV: 9.4, distance: 400 },
  { id: "geo", name: "Geostationary Orbit", deltaV: 13.2, distance: 35786 },
  { id: "moon", name: "Lunar Orbit", deltaV: 13.9, distance: 384400 },
  { id: "moon-surface", name: "Lunar Surface", deltaV: 15.6, distance: 384400 },
  { id: "mars", name: "Mars Orbit", deltaV: 16.3, distance: 225000000 },
  { id: "mars-surface", name: "Mars Surface", deltaV: 20.1, distance: 225000000 },
  { id: "jupiter", name: "Jupiter Orbit", deltaV: 24.8, distance: 778000000 },
  { id: "asteroid", name: "Asteroid Belt", deltaV: 18.5, distance: 450000000 }
];

export const MissionPlanner = () => {
  const [params, setParams] = useState<MissionParams>({
    vehicle: "",
    payload: 1000,
    destination: "",
    launchWindow: ""
  });

  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateMission = () => {
    const vehicle = launchVehicles.find(v => v.id === params.vehicle);
    const destination = destinations.find(d => d.id === params.destination);

    if (!vehicle || !destination) return;

    const payloadRatio = params.payload / vehicle.capacity;
    const deltaVRequired = destination.deltaV;
    const deltaVAvailable = vehicle.deltaV;
    const deltaVMargin = deltaVAvailable - deltaVRequired;
    
    const feasible = deltaVMargin >= 0 && params.payload <= vehicle.capacity;
    const efficiency = (params.payload / vehicle.capacity) * 100;
    const missionDuration = destination.distance / (30 * 24 * 3600); // days at 30 km/s average
    const estimatedCost = vehicle.cost * (1 + payloadRatio * 0.5);

    // Calculate fuel requirements (Tsiolkovsky rocket equation)
    const exhaustVelocity = 4.4; // km/s for RP-1/LOX
    const massRatio = Math.exp(deltaVRequired / exhaustVelocity);
    const fuelMass = params.payload * (massRatio - 1);

    setResults({
      feasible,
      deltaVRequired,
      deltaVAvailable,
      deltaVMargin,
      efficiency,
      missionDuration: Math.round(missionDuration),
      estimatedCost: estimatedCost.toFixed(1),
      fuelMass: fuelMass.toFixed(0),
      massRatio: massRatio.toFixed(2),
      vehicle,
      destination
    });
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Calculator className="w-6 h-6" />
            Mission Planning Tool
          </CardTitle>
          <CardDescription>
            Design your own space mission - select launch vehicle, payload, and destination to calculate delta-v requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Launch Vehicle</Label>
              <Select value={params.vehicle} onValueChange={(value) => setParams({...params, vehicle: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select launch vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {launchVehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{vehicle.name}</span>
                        <span className="text-xs text-muted-foreground ml-4">
                          {(vehicle.capacity / 1000).toFixed(1)}t • Δv {vehicle.deltaV} km/s
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Select value={params.destination} onValueChange={(value) => setParams({...params, destination: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map(dest => (
                    <SelectItem key={dest.id} value={dest.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{dest.name}</span>
                        <span className="text-xs text-muted-foreground ml-4">
                          Δv {dest.deltaV} km/s
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payload">Payload Mass (kg)</Label>
              <Input
                id="payload"
                type="number"
                value={params.payload}
                onChange={(e) => setParams({...params, payload: parseInt(e.target.value) || 0})}
                min="100"
                max="150000"
                step="100"
              />
              <p className="text-xs text-muted-foreground">
                Enter the mass of your payload in kilograms
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="window">Launch Window</Label>
              <Input
                id="window"
                type="date"
                value={params.launchWindow}
                onChange={(e) => setParams({...params, launchWindow: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Optimal launch date for trajectory
              </p>
            </div>
          </div>

          <Button 
            onClick={calculateMission} 
            className="w-full"
            disabled={!params.vehicle || !params.destination}
          >
            <Rocket className="w-4 h-4 mr-2" />
            Calculate Mission Parameters
          </Button>

          {/* Results */}
          {showResults && results && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                Mission Analysis Results
              </h3>

              {/* Feasibility Alert */}
              <Alert variant={results.feasible ? "default" : "destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {results.feasible ? "Mission Feasible" : "Mission Not Feasible"}
                </AlertTitle>
                <AlertDescription>
                  {results.feasible 
                    ? "The selected launch vehicle can deliver the payload to the destination with positive delta-v margin."
                    : "The selected launch vehicle cannot deliver the payload to this destination. Consider reducing payload mass or selecting a more powerful vehicle."
                  }
                </AlertDescription>
              </Alert>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Delta-V Required</span>
                    </div>
                    <p className="text-2xl font-bold">{results.deltaVRequired}</p>
                    <p className="text-xs text-muted-foreground">km/s</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Orbit className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">Delta-V Available</span>
                    </div>
                    <p className="text-2xl font-bold">{results.deltaVAvailable}</p>
                    <p className="text-xs text-muted-foreground">km/s</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground">Delta-V Margin</span>
                    </div>
                    <p className={`text-2xl font-bold ${results.deltaVMargin >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {results.deltaVMargin >= 0 ? '+' : ''}{results.deltaVMargin.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">km/s</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-4 h-4 text-warning" />
                      <span className="text-xs text-muted-foreground">Efficiency</span>
                    </div>
                    <p className="text-2xl font-bold">{results.efficiency.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">% capacity</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Mission Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Launch Vehicle:</span>
                        <Badge variant="outline">{results.vehicle.name}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Destination:</span>
                        <Badge variant="outline">{results.destination.name}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Payload Mass:</span>
                        <span className="font-medium">{params.payload.toLocaleString()} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Fuel Mass Required:</span>
                        <span className="font-medium">{parseInt(results.fuelMass).toLocaleString()} kg</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Mass Ratio:</span>
                        <span className="font-medium">{results.massRatio}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Mission Duration:</span>
                        <span className="font-medium">{results.missionDuration} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Estimated Cost:</span>
                        <span className="font-medium">${results.estimatedCost}M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Distance:</span>
                        <span className="font-medium">{(results.destination.distance / 1000).toFixed(0)}k km</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
