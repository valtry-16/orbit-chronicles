import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Atom, Wrench, Rocket as RocketIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: "material" | "technology" | "physics" | "component";
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  // Materials
  {
    term: "Beryllium",
    definition: "A lightweight, rigid metal with excellent thermal properties used in telescope mirrors and spacecraft structures. It maintains its shape across extreme temperatures and has high stiffness-to-weight ratio.",
    category: "material",
    relatedTerms: ["Gold Coating", "Cryogenic"]
  },
  {
    term: "Inconel",
    definition: "A family of nickel-chromium-based superalloys resistant to extreme heat, oxidation, and corrosion. Used in rocket engines and turbopumps operating at temperatures exceeding 1,000°C.",
    category: "material",
    relatedTerms: ["Turbopump", "Regenerative Cooling"]
  },
  {
    term: "Carbon Fiber Composite",
    definition: "Ultra-strong, lightweight material made of carbon fiber strands embedded in resin matrix. Offers superior strength-to-weight ratio, crucial for aerospace structures like rocket bodies and solar panels.",
    category: "material",
    relatedTerms: ["Honeycomb Structure", "Interstage"]
  },
  {
    term: "Titanium",
    definition: "Strong, lightweight metal with excellent corrosion resistance and high-temperature capability. Used in grid fins, landing legs, and structural components where strength and heat resistance are critical.",
    category: "material",
    relatedTerms: ["Grid Fins", "Heat Shield"]
  },
  {
    term: "Kapton",
    definition: "Heat-resistant polyimide film that remains stable from -269°C to +400°C. Used extensively for thermal insulation, cable insulation, and sunshields in spacecraft.",
    category: "material",
    relatedTerms: ["Sunshield", "Thermal Control"]
  },

  // Technologies
  {
    term: "Regenerative Cooling",
    definition: "Cooling technique where cold propellant is circulated through channels in the engine nozzle walls before combustion, absorbing heat and protecting the nozzle from extreme temperatures.",
    category: "technology",
    relatedTerms: ["LOX", "RP-1", "Combustion Chamber"]
  },
  {
    term: "Gimbal Control",
    definition: "System allowing rocket engines to pivot on two axes for thrust vectoring and steering. Critical for guidance, stability, and landing maneuvers in reusable rockets.",
    category: "technology",
    relatedTerms: ["Thrust Vectoring", "Attitude Control"]
  },
  {
    term: "Radioisotope Thermoelectric Generator (RTG)",
    definition: "Nuclear power source converting heat from radioactive decay (usually plutonium-238) into electricity. Enables deep space missions where solar power is insufficient.",
    category: "technology",
    relatedTerms: ["Deep Space", "Plutonium-238"]
  },
  {
    term: "Ion Propulsion",
    definition: "Electric propulsion system accelerating ionized gas (usually xenon) to very high speeds using electromagnetic fields. Extremely fuel-efficient for long-duration missions.",
    category: "technology",
    relatedTerms: ["Xenon", "Electric Propulsion"]
  },
  {
    term: "Sky Crane Maneuver",
    definition: "Landing technique where a hovering platform lowers a rover to the surface using cables. Used by Mars rovers to safely land heavy payloads on complex terrain.",
    category: "technology",
    relatedTerms: ["EDL", "Mars Landing"]
  },
  {
    term: "Gravity Assist",
    definition: "Technique using a planet's gravity to alter spacecraft trajectory and speed without fuel. Enables missions to outer planets and deep space by 'slingshotting' around celestial bodies.",
    category: "technology",
    relatedTerms: ["Trajectory", "Orbital Mechanics"]
  },

  // Physics & Orbital Mechanics
  {
    term: "Delta-v",
    definition: "The change in velocity a spacecraft can achieve with its propellant. A fundamental metric for mission planning, representing the total maneuverability available.",
    category: "physics",
    relatedTerms: ["Specific Impulse", "Propellant Mass"]
  },
  {
    term: "Specific Impulse (Isp)",
    definition: "Measure of rocket engine efficiency, expressed in seconds. Higher Isp means more thrust per unit of propellant. Chemical rockets typically achieve 300-450s, ion engines 3,000+s.",
    category: "physics",
    relatedTerms: ["Thrust", "Propellant Efficiency"]
  },
  {
    term: "Lagrange Points",
    definition: "Five positions in space where gravitational forces of two large bodies (e.g., Earth-Sun) create equilibrium, allowing objects to maintain stable positions with minimal fuel.",
    category: "physics",
    relatedTerms: ["L2", "Orbital Stability"]
  },
  {
    term: "Max-Q",
    definition: "Point of maximum aerodynamic pressure during ascent, typically around 10-15km altitude. Critical phase requiring careful throttle management to prevent structural failure.",
    category: "physics",
    relatedTerms: ["Aerodynamic Stress", "Structural Load"]
  },
  {
    term: "Inclination",
    definition: "Angle between an orbital plane and the equatorial plane, measured in degrees. Determines which latitudes a spacecraft can observe and affects launch energy requirements.",
    category: "physics",
    relatedTerms: ["Orbital Parameters", "Launch Window"]
  },
  {
    term: "Apogee/Perigee",
    definition: "Highest (apogee) and lowest (perigee) points in an elliptical orbit around Earth. For other bodies, terms are apoapse/periapse. Critical for orbit characterization.",
    category: "physics",
    relatedTerms: ["Orbital Mechanics", "Elliptical Orbit"]
  },

  // Components
  {
    term: "Turbopump",
    definition: "High-speed pump driven by a turbine that delivers propellants to the combustion chamber at extremely high pressure and flow rates. Essential for liquid rocket engines.",
    category: "component",
    relatedTerms: ["LOX", "RP-1", "Combustion Chamber"]
  },
  {
    term: "Heat Shield",
    definition: "Ablative or thermal protection system protecting spacecraft during atmospheric entry. Dissipates extreme heat (1,500-3,000°C) through ablation, radiation, or insulation.",
    category: "component",
    relatedTerms: ["Entry Descent Landing", "Thermal Protection"]
  },
  {
    term: "Reaction Wheel",
    definition: "Flywheel used for spacecraft attitude control. By spinning up or slowing down the wheel, the spacecraft rotates in the opposite direction via conservation of angular momentum.",
    category: "component",
    relatedTerms: ["Attitude Control", "Gyroscope"]
  },
  {
    term: "Solar Array",
    definition: "Deployable panels covered with photovoltaic cells converting sunlight to electricity. Primary power source for satellites and spacecraft in inner solar system.",
    category: "component",
    relatedTerms: ["Power System", "Photovoltaic"]
  },
  {
    term: "Star Tracker",
    definition: "Optical device identifying star patterns to determine spacecraft orientation with high precision (arcsecond accuracy). Essential for navigation and attitude control.",
    category: "component",
    relatedTerms: ["Attitude Determination", "Navigation"]
  },
  {
    term: "Grid Fins",
    definition: "Lattice-structure aerodynamic control surfaces that deploy during descent. Provide precise steering authority during atmospheric flight, enabling pinpoint landings.",
    category: "component",
    relatedTerms: ["Titanium", "Landing System"]
  },
  {
    term: "Combustion Chamber",
    definition: "High-pressure chamber where propellants burn to generate thrust. Must withstand extreme temperatures (3,000°C+) and pressures while maintaining structural integrity.",
    category: "component",
    relatedTerms: ["Regenerative Cooling", "Nozzle"]
  },
  {
    term: "Nozzle",
    definition: "Convergent-divergent duct accelerating hot exhaust gases to supersonic speeds, converting thermal energy to kinetic energy. Design optimized for specific altitude ranges.",
    category: "component",
    relatedTerms: ["Expansion Ratio", "Thrust"]
  },

  // Propellants
  {
    term: "LOX (Liquid Oxygen)",
    definition: "Cryogenic oxidizer stored at -183°C. Highly reactive, used in most liquid rocket engines. Requires sophisticated storage and handling due to extreme cold and reactivity.",
    category: "material",
    relatedTerms: ["RP-1", "Cryogenic"]
  },
  {
    term: "RP-1",
    definition: "Highly refined kerosene rocket fuel. Stable at room temperature, dense, and provides good performance. Widely used in first-stage rockets due to high thrust and density.",
    category: "material",
    relatedTerms: ["LOX", "Kerosene"]
  },
  {
    term: "Liquid Hydrogen",
    definition: "Cryogenic fuel stored at -253°C. Highest energy per unit mass of any chemical fuel, but very low density requiring large tanks. Used in upper stages for maximum efficiency.",
    category: "material",
    relatedTerms: ["LOX", "Cryogenic", "Upper Stage"]
  },
  {
    term: "Hypergolic Propellants",
    definition: "Fuel and oxidizer that ignite spontaneously on contact, requiring no ignition system. Highly reliable but toxic. Common combinations include hydrazine with nitrogen tetroxide.",
    category: "material",
    relatedTerms: ["Hydrazine", "Storable Propellants"]
  },
  {
    term: "Solid Rocket Motor",
    definition: "Rocket motor containing pre-mixed solid propellant (fuel and oxidizer). Simple, reliable, and powerful, but cannot be throttled or shut down once ignited.",
    category: "component",
    relatedTerms: ["SRB", "Booster"]
  }
];

export const TechnicalGlossary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = searchQuery === "" ||
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "material": return <Atom className="w-4 h-4" />;
      case "technology": return <RocketIcon className="w-4 h-4" />;
      case "physics": return <BookOpen className="w-4 h-4" />;
      case "component": return <Wrench className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "material": return "text-primary";
      case "technology": return "text-accent";
      case "physics": return "text-success";
      case "component": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient">
          <BookOpen className="w-6 h-6" />
          Technical Glossary
        </CardTitle>
        <CardDescription>
          Comprehensive guide to aerospace terms, materials, and technologies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search terms and definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-primary/30"
          />
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5 bg-card/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="material">Materials</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="component">Components</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTerms.length} of {glossaryTerms.length} terms
              </p>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredTerms.map((term, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`term-${index}`}
                    className="border border-primary/20 rounded-lg px-4 bg-card/30"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className={getCategoryColor(term.category)}>
                          {getCategoryIcon(term.category)}
                        </div>
                        <div>
                          <p className="font-semibold">{term.term}</p>
                          <Badge variant="outline" className="mt-1">
                            {term.category}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-4">
                      <p className="leading-relaxed">{term.definition}</p>
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs font-medium mb-2">Related Terms:</p>
                          <div className="flex flex-wrap gap-2">
                            {term.relatedTerms.map((related, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {related}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {["material", "technology", "physics", "component"].map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTerms.filter(t => t.category === category).length} {category} terms
                </p>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredTerms
                    .filter(t => t.category === category)
                    .map((term, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`term-${index}`}
                        className="border border-primary/20 rounded-lg px-4 bg-card/30"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div className={getCategoryColor(term.category)}>
                              {getCategoryIcon(term.category)}
                            </div>
                            <p className="font-semibold">{term.term}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-4">
                          <p className="leading-relaxed">{term.definition}</p>
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <p className="text-xs font-medium mb-2">Related Terms:</p>
                              <div className="flex flex-wrap gap-2">
                                {term.relatedTerms.map((related, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {related}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No terms found matching your search.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
