import { useParams, useNavigate } from "react-router-dom";
import { missions } from "@/data/missions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpacecraftModel } from "@/components/SpacecraftModel";
import { ImageGallery } from "@/components/ImageGallery";
import { TrajectoryViewer3D } from "@/components/TrajectoryViewer3D";
import { OrbitalTracker } from "@/components/OrbitalTracker";
import { ComponentDetails } from "@/components/ComponentDetails";
import { MissionVideos } from "@/components/MissionVideos";
import { ArrowLeft, Calendar, Building2, Info, Download } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { generateMissionPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

// ⭐ Accept onUserAction
const MissionDetail = ({ onUserAction }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const mission = missions.find((m) => m.id === id);

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Mission Not Found</h1>
          <Button onClick={() => {
            onUserAction();     // ⭐ refresh ad
            navigate("/");
          }}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={mission.thumbnail}
          alt={mission.name}
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">

            {/* ⭐ Back + PDF buttons trigger ad refresh */}
            <div className="flex items-center justify-between mb-4">
              
              <Button
                variant="ghost"
                onClick={() => {
                  onUserAction();
                  navigate("/");
                }}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Missions
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  onUserAction(); // refresh ad
                  generateMissionPDF(mission);
                  toast.success("PDF Generated!", {
                    description: "Mission report has been downloaded"
                  });
                }}
                className="hover:bg-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>

            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">{mission.name}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Mission Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <Card className="cosmic-glow" onClick={onUserAction}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-primary" />
                Agency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{mission.agency}</p>
            </CardContent>
          </Card>

          <Card className="cosmic-glow" onClick={onUserAction}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                Launch Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{mission.launchDate}</p>
            </CardContent>
          </Card>

          <Card className="cosmic-glow" onClick={onUserAction}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-primary" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">Active</p>
            </CardContent>
          </Card>

        </div>

        {/* Description */}
        <Card className="mb-8 cosmic-glow" onClick={onUserAction}>
          <CardHeader>
            <CardTitle>Mission Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 leading-relaxed">{mission.description}</p>
          </CardContent>
        </Card>

        {/* Detailed Explanation */}
        <Card className="mb-8 cosmic-glow">
          <CardHeader>
            <CardTitle>Brief Explanation</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-foreground/90 leading-relaxed mb-4">
              {mission.briefExplanation}
            </p>

            <Collapsible
              open={isHistoryOpen}
              onOpenChange={(open) => {
                setIsHistoryOpen(open);
                onUserAction(); // ⭐ refresh ad
              }}
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  {isHistoryOpen ? "Hide" : "Show"} Detailed History & Research
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4 space-y-4">
                <div className="prose prose-invert max-w-none">
                  {mission.detailedHistory
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </CollapsibleContent>

            </Collapsible>

          </CardContent>
        </Card>

        {/* ⭐ 3D model refreshes ad on first interaction */}
        <div className="mb-8" onClick={onUserAction}>
          <h2 className="text-2xl font-bold mb-4 text-gradient">3D Model Viewer</h2>
          <SpacecraftModel type={mission.modelType} />
        </div>

        <div className="mb-8" onClick={onUserAction}>
          <h2 className="text-2xl font-bold mb-4 text-gradient">Interactive 3D Trajectory Path</h2>
          <TrajectoryViewer3D
            trajectory={mission.trajectory}
            missionName={mission.name}
          />
        </div>

        {/* Videos */}
        {mission.videos && (
          <div className="mb-8" onClick={onUserAction}>
            <MissionVideos videos={mission.videos} missionName={mission.name} />
          </div>
        )}

        {mission.trajectory.orbitalData && (
          <div className="mb-8" onClick={onUserAction}>
            <OrbitalTracker 
              orbitalData={mission.trajectory.orbitalData}
              missionName={mission.name}
            />
          </div>
        )}

        {mission.components && mission.components.length > 0 && (
          <div className="mb-8" onClick={onUserAction}>
            <ComponentDetails components={mission.components} />
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mission Trajectory & Current Location</h2>
          <Card className="cosmic-glow" onClick={onUserAction}>
            <CardHeader>
              <CardTitle>Flight Path</CardTitle>
              <CardDescription>{mission.trajectory.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              <ol className="list-decimal list-inside space-y-1">
                {mission.trajectory.path.map((stage, index) => (
                  <li key={index} className="text-foreground/90">
                    {stage}
                  </li>
                ))}
              </ol>

            </CardContent>
          </Card>
        </div>

        {/* Images */}
        <div className="mb-8" onClick={onUserAction}>
          <h2 className="text-2xl font-bold mb-4">Mission Gallery</h2>
          <ImageGallery images={mission.images} missionName={mission.name} />
        </div>

      </div>
    </div>
  );
};

export default MissionDetail;