import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Upload, Camera, MapPin, Star, Calendar, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { exportToCSV, exportToJSON, exportObservationsToPDF } from "@/utils/exportUtils";

interface Observation {
  id: string;
  observer: string;
  objectName: string;
  objectType: string;
  date: Date;
  location: string;
  magnitude: number;
  description: string;
  verified: boolean;
}

export const CitizenScience = () => {
  const [observations, setObservations] = useState<Observation[]>([
    {
      id: "obs-1",
      observer: "Sarah Johnson",
      objectName: "2024 XR7",
      objectType: "Asteroid",
      date: new Date(Date.now() - 86400000 * 2),
      location: "Arizona, USA",
      magnitude: 15.2,
      description: "Observed moving east to west, approximately 2° from Polaris. Clear visibility.",
      verified: true
    },
    {
      id: "obs-2",
      observer: "Michael Chen",
      objectName: "Comet C/2023 P1",
      objectType: "Comet",
      date: new Date(Date.now() - 86400000 * 5),
      location: "New South Wales, Australia",
      magnitude: 8.5,
      description: "Visible tail approximately 0.5° in length. Green coma observed through 8-inch telescope.",
      verified: true
    },
    {
      id: "obs-3",
      observer: "Emma Rodriguez",
      objectName: "Unknown Object",
      objectType: "Unidentified",
      date: new Date(Date.now() - 86400000),
      location: "Madrid, Spain",
      magnitude: 12.0,
      description: "Fast-moving object, possibly satellite or asteroid. Need verification.",
      verified: false
    }
  ]);

  const [formData, setFormData] = useState({
    observer: "",
    objectName: "",
    objectType: "",
    location: "",
    magnitude: "",
    date: "",
    time: "",
    description: "",
    equipment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.observer || !formData.objectName || !formData.location) {
      toast.error("Please fill in required fields");
      return;
    }

    const newObservation: Observation = {
      id: `obs-${Date.now()}`,
      observer: formData.observer,
      objectName: formData.objectName,
      objectType: formData.objectType,
      date: new Date(formData.date),
      location: formData.location,
      magnitude: parseFloat(formData.magnitude) || 0,
      description: formData.description,
      verified: false
    };

    setObservations([newObservation, ...observations]);

    toast.success("Observation Submitted!", {
      description: "Thank you for contributing to citizen science. Your observation will be reviewed by astronomers."
    });

    // Reset form
    setFormData({
      observer: "",
      objectName: "",
      objectType: "",
      location: "",
      magnitude: "",
      date: "",
      time: "",
      description: "",
      equipment: ""
    });
  };

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    const filename = `citizen-observations-${new Date().toISOString().split('T')[0]}`;
    
    switch (format) {
      case 'csv':
        exportToCSV(observations, filename);
        toast.success("CSV Export Complete");
        break;
      case 'json':
        exportToJSON(observations, filename);
        toast.success("JSON Export Complete");
        break;
      case 'pdf':
        exportObservationsToPDF(observations, filename);
        toast.success("PDF Export Complete");
        break;
    }
  };

  return (
    <div className="space-y-6 relative z-10">
      <Card className="cosmic-glow floating-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Users className="w-6 h-6" />
            Citizen Science Observatory Network
          </CardTitle>
          <CardDescription>
            Report your asteroid and comet observations to contribute to global tracking efforts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="submit">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="submit">Submit Observation</TabsTrigger>
              <TabsTrigger value="community">Community Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="submit">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="observer">Your Name *</Label>
                    <Input
                      id="observer"
                      placeholder="Enter your name"
                      value={formData.observer}
                      onChange={(e) => setFormData({ ...formData, observer: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectName">Object Name/Designation *</Label>
                    <Input
                      id="objectName"
                      placeholder="e.g., 2024 XR7, Comet C/2023 P1"
                      value={formData.objectName}
                      onChange={(e) => setFormData({ ...formData, objectName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectType">Object Type</Label>
                    <Select
                      value={formData.objectType}
                      onValueChange={(value) => setFormData({ ...formData, objectType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asteroid">Asteroid</SelectItem>
                        <SelectItem value="comet">Comet</SelectItem>
                        <SelectItem value="meteor">Meteor</SelectItem>
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="unknown">Unknown/Unidentified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Observation Location *</Label>
                    <Input
                      id="location"
                      placeholder="City, State/Province, Country"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Observation</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time (Local)</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="magnitude">Apparent Magnitude</Label>
                    <Input
                      id="magnitude"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 12.5"
                      value={formData.magnitude}
                      onChange={(e) => setFormData({ ...formData, magnitude: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipment Used</Label>
                    <Input
                      id="equipment"
                      placeholder="e.g., 8-inch telescope, binoculars"
                      value={formData.equipment}
                      onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Observation Details *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you observed: direction, movement, color, tail (if comet), any unusual features..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Data
                  </Button>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Star className="w-4 h-4 mr-2" />
                  Submit Observation Report
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your observation will be reviewed by professional astronomers and added to the global tracking database if verified.
                </p>
              </form>
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <div className="flex gap-2 mb-4 flex-wrap">
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

              <div className="mb-4 p-4 glass-morphism rounded-lg">
                <h3 className="font-semibold mb-2">Community Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="text-2xl font-bold text-primary">{observations.length}</p>
                    <p className="text-muted-foreground">Total Reports</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {observations.filter(o => o.verified).length}
                    </p>
                    <p className="text-muted-foreground">Verified</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {new Set(observations.map(o => o.observer)).size}
                    </p>
                    <p className="text-muted-foreground">Contributors</p>
                  </div>
                </div>
              </div>

              {observations.map((obs) => (
                <Card key={obs.id} className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{obs.objectName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Users className="w-3 h-3" />
                          {obs.observer}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{obs.objectType}</Badge>
                        {obs.verified ? (
                          <Badge variant="default">Verified</Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">{obs.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {obs.date.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {obs.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Mag: {obs.magnitude}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};