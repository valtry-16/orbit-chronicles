// src/pages/MissionDetail.tsx

import { useParams, useNavigate } from "react-router-dom";
import { missions } from "@/data/missions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SpacecraftModel } from "@/components/SpacecraftModel";
import { ImageGallery } from "@/components/ImageGallery";
import { TrajectoryViewer3D } from "@/components/TrajectoryViewer3D";
import { OrbitalTracker } from "@/components/OrbitalTracker";
import { ComponentDetails } from "@/components/ComponentDetails";
import { MissionVideos } from "@/components/MissionVideos";

import InArticleAd from "@/components/InArticleAd";
import MultiplexAd from "@/components/MultiplexAd";

import {
  ArrowLeft,
  Calendar,
  Building2,
  Info,
  Download,
} from "lucide-react";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { generateMissionPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

const MissionDetail = ({ onUserAction }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const mission = missions.find((m) => m.id === id);

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Mission Not Found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* HEADER */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={mission.thumbnail}
          alt={mission.name}
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">

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
                  generateMissionPDF(mission);
                  toast.success("PDF Generated!", {
                    description: "Mission report downloaded",
                  });
                  onUserAction();
                }}
                className="hover:bg-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>

            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {mission.name}
            </h1>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* ===== AD INSERT #1 — In-Article Ad under mission header ===== */}
        <div className="my-6">
          <InArticleAd refreshKey={id} />
        </div>

        {/* === Mission Info Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <Card className="cosmic-glow">
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

          <Card className="cosmic-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                Launch Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {mission.launchDate}
              </p>
            </CardContent>
          </Card>

          <Card className="cosmic-glow">
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

        {/* === Mission Overview === */}
        <Card className="mb-8 cosmic-glow">
          <CardHeader>
            <CardTitle>Mission Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 leading-relaxed">
              {mission.description}
            </p>
          </CardContent>
        </Card>

        {/* === BRIEF + COLLAPSIBLE HISTORY === */}
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
              onOpenChange={(val) => {
                setIsHistoryOpen(val);
                onUserAction();
              }}
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  {isHistoryOpen ? "Hide" : "Show"} Detailed History
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4 space-y-4">
                <div className="prose prose-invert max-w-none">
                  {mission.detailedHistory
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

          </CardContent>
        </Card>

        {/* ===== AD INSERT #2 — In-Article Ad after history ===== */}
        <div className="my-8">
          <InArticleAd refreshKey={isHistoryOpen ? 999 : 888} />
        </div>

        {/* === 3D MODEL VIEWER === */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gradient">
            3D Model Viewer
          </h2>
          <div onClick={onUserAction}>
            <SpacecraftModel type={mission.modelType} />
          </div>
        </div>

        {/* === TRAJECTORY VIEWER === */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gradient">
            Interactive 3D Trajectory Path
          </h2>
          <p className="text-muted-foreground mb-4">
            Rotate, zoom, and explore the mission path in 3D.
          </p>
          <div onClick={onUserAction}>
            <TrajectoryViewer3D
              trajectory={mission.trajectory}
              missionName={mission.name}
            />
          </div>
        </div>

        {/* === VIDEOS === */}
        {mission.videos && (
          <div className="mb-8" onClick={onUserAction}>
            <MissionVideos videos={mission.videos} missionName={mission.name} />
          </div>
        )}

        {/* === ORBITAL TRACKING === */}
        {mission.trajectory.orbitalData && (
          <div className="mb-8" onClick={onUserAction}>
            <OrbitalTracker
              orbitalData={mission.trajectory.orbitalData}
              missionName={mission.name}
            />
          </div>
        )}

        {/* === COMPONENT DETAILS === */}
        {mission.components?.length > 0 && (
          <div className="mb-8" onClick={onUserAction}>
            <ComponentDetails components={mission.components} />
          </div>
        )}

        {/* === TRAJECTORY PATH DETAILS === */}
        {mission.trajectory && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mission Trajectory</h2>

            <Card className="cosmic-glow">
              <CardHeader>
                <CardTitle>Flight Path</CardTitle>
                <CardDescription>{mission.trajectory.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <ol className="list-decimal list-inside space-y-1">
                  {mission.trajectory.path.map((stage, index) => (
                    <li key={index}>{stage}</li>
                  ))}
                </ol>

                {mission.trajectory.landingLocation && (
                  <p>
                    <strong>Landing Location:</strong>{" "}
                    {mission.trajectory.landingLocation}
                  </p>
                )}

                {mission.trajectory.coordinates && (
                  <p>
                    <strong>Coordinates:</strong>{" "}
                    {mission.trajectory.coordinates}
                  </p>
                )}

                {mission.trajectory.currentStatus && (
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-primary font-semibold">
                      {mission.trajectory.currentStatus}
                    </span>
                  </p>
                )}

              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== AD INSERT #3 — Multiplex Ad near bottom ===== */}
        <div className="my-12">
          <MultiplexAd refreshKey={id} />
        </div>

        {/* === IMAGE GALLERY === */}
        <div className="mb-8" onClick={onUserAction}>
          <h2 className="text-2xl font-bold mb-4">Mission Gallery</h2>
          <ImageGallery images={mission.images} missionName={mission.name} />
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;