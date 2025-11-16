import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Package, Building2, Gauge, Thermometer, Zap, Fuel } from "lucide-react";
import type { Component } from "@/data/missions";

interface ComponentDetailsProps {
  components: Component[];
}

export const ComponentDetails = ({ components }: ComponentDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gradient">Technical Components & Parts</h2>
        <Badge variant="outline" className="text-sm">
          {components.length} Components
        </Badge>
      </div>

      <Tabs defaultValue="0" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-auto bg-card/50">
          {components.map((component, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm py-2"
            >
              {component.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {components.map((component, index) => (
          <TabsContent key={index} value={index.toString()} className="space-y-6 mt-6">
            <Card className="cosmic-glow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{component.name}</CardTitle>
                    <p className="text-muted-foreground">{component.description}</p>
                  </div>
                  <Wrench className="w-8 h-8 text-primary flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image */}
                <div className="relative rounded-lg overflow-hidden border border-primary/20">
                  <img
                    src={component.image}
                    alt={component.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Technical Details */}
                {component.technicalDetails && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      Technical Details
                    </h3>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {component.technicalDetails}
                    </p>
                  </div>
                )}

                {/* Specifications Grid */}
                {component.specifications && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Manufacturer */}
                    {component.specifications.manufacturer && (
                      <Card className="bg-card/50">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-muted-foreground mb-1">Manufacturer</p>
                              <p className="font-semibold text-accent break-words">
                                {component.specifications.manufacturer}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Material */}
                    {component.specifications.material && (
                      <Card className="bg-card/50">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-muted-foreground mb-1">Material</p>
                              <p className="font-semibold text-primary break-words">
                                {component.specifications.material}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Dimensions */}
                    {component.specifications.dimensions && (
                    <Card className="bg-card/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Gauge className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">Dimensions</p>
                            <p className="font-semibold break-words">
                              {component.specifications.dimensions}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Weight */}
                  {component.specifications.weight && (
                    <Card className="bg-card/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Gauge className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">Weight</p>
                            <p className="font-semibold break-words">
                              {component.specifications.weight}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Thrust */}
                  {component.specifications.thrust && (
                    <Card className="bg-card/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">Thrust</p>
                            <p className="font-semibold text-accent break-words">
                              {component.specifications.thrust}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Fuel */}
                  {component.specifications.fuel && (
                    <Card className="bg-card/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Fuel className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">Fuel Type</p>
                            <p className="font-semibold break-words">
                              {component.specifications.fuel}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Operating Temperature */}
                  {component.specifications.operatingTemp && (
                    <Card className="bg-card/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Thermometer className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">Operating Temp</p>
                            <p className="font-semibold text-destructive break-words">
                              {component.specifications.operatingTemp}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Power */}
                  {component.specifications.power && (
                    <Card className="bg-card/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">Power System</p>
                            <p className="font-semibold text-accent break-words">
                              {component.specifications.power}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
