import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Orbit, Zap, Calculator, BookOpen } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const OrbitalMechanicsLearning = () => {
  // Tsiolkovsky Calculator
  const [deltaV, setDeltaV] = useState(9400);
  const [exhaustVel, setExhaustVel] = useState(4400);
  const [massRatio, setMassRatio] = useState(0);
  const [fuelMass, setFuelMass] = useState(0);

  // Hohmann Transfer Calculator
  const [r1, setR1] = useState(6778); // LEO
  const [r2, setR2] = useState(42164); // GEO
  const [hohmannDeltaV, setHohmannDeltaV] = useState(0);
  const [transferTime, setTransferTime] = useState(0);

  const calculateTsiolkovsky = () => {
    const ratio = Math.exp(deltaV / exhaustVel);
    setMassRatio(ratio);
    const fuel = 1000 * (ratio - 1); // assuming 1000kg dry mass
    setFuelMass(fuel);
  };

  const calculateHohmann = () => {
    const mu = 398600; // Earth's gravitational parameter
    const v1 = Math.sqrt(mu / r1);
    const v2 = Math.sqrt(mu / r2);
    const a = (r1 + r2) / 2;
    const vTransfer1 = Math.sqrt(mu * (2/r1 - 1/a));
    const vTransfer2 = Math.sqrt(mu * (2/r2 - 1/a));
    
    const dv1 = Math.abs(vTransfer1 - v1);
    const dv2 = Math.abs(v2 - vTransfer2);
    const totalDV = dv1 + dv2;
    
    setHohmannDeltaV(totalDV);
    
    const period = Math.PI * Math.sqrt(Math.pow(a, 3) / mu);
    setTransferTime(period / 3600); // convert to hours
  };

  return (
    <div className="space-y-6">
      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <BookOpen className="w-6 h-6" />
            Orbital Mechanics Learning Module
          </CardTitle>
          <CardDescription>
            Interactive calculators and animations to understand rocket science fundamentals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tsiolkovsky" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto gap-2">
              <TabsTrigger value="tsiolkovsky">
                <Rocket className="w-4 h-4 mr-2" />
                Tsiolkovsky Equation
              </TabsTrigger>
              <TabsTrigger value="hohmann">
                <Orbit className="w-4 h-4 mr-2" />
                Hohmann Transfer
              </TabsTrigger>
              <TabsTrigger value="gravity-assist">
                <Zap className="w-4 h-4 mr-2" />
                Gravity Assists
              </TabsTrigger>
            </TabsList>

            {/* Tsiolkovsky Rocket Equation */}
            <TabsContent value="tsiolkovsky" className="space-y-6">
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">The Tsiolkovsky Rocket Equation</CardTitle>
                  <CardDescription>
                    The fundamental equation of rocket propulsion, relating change in velocity to exhaust velocity and mass ratio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theory */}
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-3">The Equation:</h4>
                    <div className="text-center text-2xl font-mono mb-4 p-4 bg-background/50 rounded">
                      Δv = v<sub>e</sub> × ln(m<sub>0</sub> / m<sub>f</sub>)
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><strong>Δv</strong> = Change in velocity (delta-v) in m/s</p>
                      <p><strong>v<sub>e</sub></strong> = Effective exhaust velocity in m/s</p>
                      <p><strong>m<sub>0</sub></strong> = Initial total mass (wet mass)</p>
                      <p><strong>m<sub>f</sub></strong> = Final total mass (dry mass)</p>
                      <p><strong>ln</strong> = Natural logarithm</p>
                    </div>
                  </div>

                  {/* Calculator */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Target Delta-V (m/s)</Label>
                        <Input
                          type="number"
                          value={deltaV}
                          onChange={(e) => setDeltaV(Number(e.target.value))}
                          min="0"
                          max="50000"
                        />
                        <Slider
                          value={[deltaV]}
                          onValueChange={(val) => setDeltaV(val[0])}
                          min={0}
                          max={50000}
                          step={100}
                        />
                        <p className="text-xs text-muted-foreground">
                          LEO: ~9,400 m/s | Moon: ~13,900 m/s | Mars: ~16,300 m/s
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Exhaust Velocity (m/s)</Label>
                        <Input
                          type="number"
                          value={exhaustVel}
                          onChange={(e) => setExhaustVel(Number(e.target.value))}
                          min="0"
                          max="10000"
                        />
                        <Slider
                          value={[exhaustVel]}
                          onValueChange={(val) => setExhaustVel(val[0])}
                          min={2000}
                          max={10000}
                          step={100}
                        />
                        <p className="text-xs text-muted-foreground">
                          RP-1/LOX: ~4,400 m/s | LH2/LOX: ~4,600 m/s | Ion: ~9,000 m/s
                        </p>
                      </div>

                      <Button onClick={calculateTsiolkovsky} className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-primary/5">
                        <CardContent className="pt-6">
                          <h4 className="font-semibold mb-4">Results:</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Mass Ratio (m₀/m_f)</p>
                              <p className="text-3xl font-bold text-primary">
                                {massRatio > 0 ? massRatio.toFixed(2) : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Fuel Mass Required (for 1000kg payload)</p>
                              <p className="text-2xl font-bold text-accent">
                                {fuelMass > 0 ? `${fuelMass.toFixed(0)} kg` : "—"}
                              </p>
                            </div>
                            <div className="pt-3 border-t">
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                A mass ratio of {massRatio > 0 ? massRatio.toFixed(1) : "X"} means for every 1 kg of final mass, 
                                you need {massRatio > 0 ? (massRatio - 1).toFixed(1) : "X"} kg of fuel.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Visualization */}
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <h4 className="font-semibold mb-3">Why It Matters:</h4>
                    <p className="text-sm leading-relaxed">
                      This equation shows the exponential relationship between delta-v and fuel. Small increases in delta-v 
                      require exponentially more fuel, which is why staging is crucial for efficient rocket design. The equation 
                      also reveals why higher exhaust velocities (like ion engines) are so valuable for deep space missions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hohmann Transfer */}
            <TabsContent value="hohmann" className="space-y-6">
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Hohmann Transfer Orbits</CardTitle>
                  <CardDescription>
                    The most fuel-efficient way to transfer between two circular orbits using two engine burns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theory */}
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <h4 className="font-semibold mb-3">How It Works:</h4>
                    <div className="space-y-3 text-sm">
                      <p><strong>1. First Burn:</strong> Accelerate at periapsis to enter elliptical transfer orbit</p>
                      <p><strong>2. Coast Phase:</strong> Travel along the elliptical trajectory</p>
                      <p><strong>3. Second Burn:</strong> Accelerate at apoapsis to circularize at target orbit</p>
                      <p className="text-muted-foreground italic">
                        Named after Walter Hohmann who published this technique in 1925
                      </p>
                    </div>
                  </div>

                  {/* Calculator */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Initial Orbit Radius (km)</Label>
                        <Input
                          type="number"
                          value={r1}
                          onChange={(e) => setR1(Number(e.target.value))}
                          min="6378"
                          max="100000"
                        />
                        <p className="text-xs text-muted-foreground">
                          LEO: 6,778 km | MEO: 20,000 km | GEO: 42,164 km
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Target Orbit Radius (km)</Label>
                        <Input
                          type="number"
                          value={r2}
                          onChange={(e) => setR2(Number(e.target.value))}
                          min="6378"
                          max="100000"
                        />
                      </div>

                      <Button onClick={calculateHohmann} className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Transfer
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-accent/5">
                        <CardContent className="pt-6">
                          <h4 className="font-semibold mb-4">Transfer Requirements:</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Delta-V</p>
                              <p className="text-3xl font-bold text-accent">
                                {hohmannDeltaV > 0 ? `${hohmannDeltaV.toFixed(0)} m/s` : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Transfer Time</p>
                              <p className="text-2xl font-bold text-primary">
                                {transferTime > 0 ? `${transferTime.toFixed(1)} hours` : "—"}
                              </p>
                            </div>
                            <div className="pt-3 border-t">
                              <Badge variant="outline" className="mb-2">Efficiency Rating</Badge>
                              <p className="text-xs text-muted-foreground">
                                Hohmann transfers are the most fuel-efficient method but take longer than direct transfers.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Visual Diagram */}
                  <div className="p-6 bg-gradient-to-br from-background to-card rounded-lg border">
                    <h4 className="font-semibold mb-4 text-center">Transfer Orbit Visualization</h4>
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* Earth */}
                        <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" />
                        
                        {/* Initial orbit */}
                        <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2,2" />
                        
                        {/* Target orbit */}
                        <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(var(--success))" strokeWidth="1" strokeDasharray="2,2" />
                        
                        {/* Transfer orbit */}
                        <ellipse cx="100" cy="100" rx="50" ry="35" fill="none" stroke="hsl(var(--warning))" strokeWidth="2" />
                        
                        {/* Labels */}
                        <text x="100" y="125" textAnchor="middle" fontSize="8" fill="hsl(var(--accent))">Initial Orbit</text>
                        <text x="100" y="175" textAnchor="middle" fontSize="8" fill="hsl(var(--success))">Target Orbit</text>
                        <text x="155" y="105" textAnchor="middle" fontSize="8" fill="hsl(var(--warning))">Transfer</text>
                        
                        {/* Burn points */}
                        <circle cx="130" cy="100" r="3" fill="hsl(var(--destructive))" />
                        <circle cx="70" cy="100" r="3" fill="hsl(var(--destructive))" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gravity Assists */}
            <TabsContent value="gravity-assist" className="space-y-6">
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Gravity Assist Maneuvers</CardTitle>
                  <CardDescription>
                    Using a planet's gravity to change a spacecraft's speed and direction without using fuel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theory */}
                  <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                    <h4 className="font-semibold mb-3">The Concept:</h4>
                    <p className="text-sm mb-3">
                      A gravity assist (or slingshot maneuver) uses a planet's gravity and orbital motion to alter a spacecraft's 
                      velocity. The spacecraft "steals" a tiny amount of the planet's orbital momentum.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Speed Boost:</strong> Approach from behind the planet's orbital motion</p>
                      <p><strong>Speed Reduction:</strong> Approach from in front of the planet's orbital motion</p>
                      <p><strong>Direction Change:</strong> Alter trajectory for new target without fuel</p>
                    </div>
                  </div>

                  {/* Famous Examples */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-primary/5">
                      <CardContent className="pt-6">
                        <Badge className="mb-3">Voyager 1 & 2</Badge>
                        <h4 className="font-semibold mb-2">The Grand Tour</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Used gravity assists from Jupiter, Saturn, Uranus, and Neptune to reach the outer solar system 
                          in just 12 years instead of 30.
                        </p>
                        <div className="text-xs space-y-1">
                          <p>• Jupiter: +35,000 mph</p>
                          <p>• Saturn: +15,000 mph</p>
                          <p>• Uranus: +10,000 mph (Voyager 2)</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-accent/5">
                      <CardContent className="pt-6">
                        <Badge className="mb-3">Cassini</Badge>
                        <h4 className="font-semibold mb-2">Multiple Flybys</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Used 4 gravity assists (Venus twice, Earth, Jupiter) to reach Saturn efficiently with 
                          minimal fuel expenditure.
                        </p>
                        <div className="text-xs space-y-1">
                          <p>• Venus 1: +7 km/s</p>
                          <p>• Venus 2: +5.5 km/s</p>
                          <p>• Earth: +5.2 km/s</p>
                          <p>• Jupiter: +2 km/s</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Limitations */}
                  <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold mb-3">Limitations & Challenges:</h4>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                      <li>Requires precise timing - planets must be in correct positions</li>
                      <li>Launch windows occur infrequently (sometimes once every several years)</li>
                      <li>Increases mission duration significantly</li>
                      <li>Complex navigation and trajectory calculations required</li>
                      <li>Small errors can compound over multiple assists</li>
                    </ul>
                  </div>

                  {/* Energy Conservation */}
                  <div className="p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-3">The Physics:</h4>
                    <p className="text-sm leading-relaxed mb-3">
                      While it seems like "free energy," gravity assists actually work through conservation of momentum. 
                      The spacecraft gains speed by stealing an infinitesimally small amount of the planet's orbital momentum. 
                      The planet's orbit is affected, but the change is so tiny it's unmeasurable.
                    </p>
                    <div className="p-3 bg-background/50 rounded font-mono text-xs">
                      <p>Δv_spacecraft ≈ 2 × v_planet × sin(θ/2)</p>
                      <p className="text-muted-foreground mt-1">where θ is the deflection angle</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
