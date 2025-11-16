// src/pages/Index.tsx

import { useState, useMemo } from "react";
import { missions } from "@/data/missions";
import { MissionCard } from "@/components/MissionCard";

import InFeedAd from "@/components/InFeedAd";

// Individual component imports
import { MissionComparison } from "@/components/MissionComparison";
import { GlobeTracker } from "@/components/GlobeTracker";
import { MissionStatistics } from "@/components/MissionStatistics";
import { TechnicalGlossary } from "@/components/TechnicalGlossary";
import { TelemetryDashboard } from "@/components/TelemetryDashboard";
import { MissionTimeline } from "@/components/MissionTimeline";
import { MissionPlanner } from "@/components/MissionPlanner";
import { EducationalQuiz } from "@/components/EducationalQuiz";
import { OrbitalMechanicsLearning } from "@/components/OrbitalMechanicsLearning";
import { SpacecraftComparison } from "@/components/SpacecraftComparison";
import { OrbitalMechanics3D } from "@/components/OrbitalMechanics3D";
import { SpaceWeatherDashboard } from "@/components/SpaceWeatherDashboard";
import { MissionCountdown } from "@/components/MissionCountdown";
import { NEOTracker } from "@/components/NEOTracker";
import { AlertSubscriptions } from "@/components/AlertSubscriptions";
import { ImpactEventsHistory } from "@/components/ImpactEventsHistory";
import { ARSkyView } from "@/components/ARSkyView";
import { CitizenScience } from "@/components/CitizenScience";

import {
  Rocket, Search, Filter, GitCompare, Globe, BarChart3, BookOpen, Activity,
  Clock, Calculator, GraduationCap, Atom, Circle, CloudSun, Timer,
  Sparkles, Bell, History, Eye, Users
} from "lucide-react";

import heroImage from "@/assets/hero-space.jpg";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";


// ⭐ Index page receives `onUserAction` from App.tsx
const Index = ({ onUserAction }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("missions");

  const agencies = useMemo(() => {
    const uniqueAgencies = [...new Set(missions.map((m) => m.agency))];
    return uniqueAgencies.sort();
  }, []);

  const missionTypes = useMemo(() => {
    const types = [...new Set(missions.map((m) => m.modelType))];
    return types.sort();
  }, []);

  const filteredMissions = useMemo(() => {
    return missions.filter((mission) => {
      const matchesSearch =
        searchQuery === "" ||
        mission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.agency.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAgency =
        agencyFilter === "all" || mission.agency === agencyFilter;

      const matchesType =
        typeFilter === "all" || mission.modelType === typeFilter;

      return matchesSearch && matchesAgency && matchesType;
    });
  }, [searchQuery, agencyFilter, typeFilter]);

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt="Space missions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <Rocket className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-gradient">Space Missions Explorer</h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
              Discover, Compare & Explore Groundbreaking Space Missions
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-4 py-16">

        {/* ⭐ Tabs refresh ads on switch */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
            onUserAction();
          }}
          className="space-y-8"
        >
          <TabsList className="grid w-full max-w-6xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-2 p-2 bg-card/50">

            {/* Each tab triggers ad refresh */}
            <TabsTrigger value="missions" onClick={onUserAction}>
              <Search className="w-4 h-4 mr-2" /> Missions
            </TabsTrigger>

            <TabsTrigger value="compare" onClick={onUserAction}>
              <GitCompare className="w-4 h-4 mr-2" /> Compare
            </TabsTrigger>

            <TabsTrigger value="tracker" onClick={onUserAction}>
              <Globe className="w-4 h-4 mr-2" /> Live Tracker
            </TabsTrigger>

            <TabsTrigger value="telemetry" onClick={onUserAction}>
              <Activity className="w-4 h-4 mr-2" /> Telemetry
            </TabsTrigger>

            <TabsTrigger value="statistics" onClick={onUserAction}>
              <BarChart3 className="w-4 h-4 mr-2" /> Stats
            </TabsTrigger>

            <TabsTrigger value="timeline" onClick={onUserAction}>
              <Clock className="w-4 h-4 mr-2" /> Timeline
            </TabsTrigger>

            <TabsTrigger value="planner" onClick={onUserAction}>
              <Calculator className="w-4 h-4 mr-2" /> Planner
            </TabsTrigger>

            <TabsTrigger value="learning" onClick={onUserAction}>
              <Atom className="w-4 h-4 mr-2" /> Learn
            </TabsTrigger>

            <TabsTrigger value="quiz" onClick={onUserAction}>
              <GraduationCap className="w-4 h-4 mr-2" /> Quiz
            </TabsTrigger>

            <TabsTrigger value="glossary" onClick={onUserAction}>
              <BookOpen className="w-4 h-4 mr-2" /> Glossary
            </TabsTrigger>

            <TabsTrigger value="spacecraft-compare" onClick={onUserAction}>
              <GitCompare className="w-4 h-4 mr-2" /> Compare
            </TabsTrigger>

            <TabsTrigger value="3d-orbits" onClick={onUserAction}>
              <Circle className="w-4 h-4 mr-2" /> 3D
            </TabsTrigger>

            <TabsTrigger value="weather" onClick={onUserAction}>
              <CloudSun className="w-4 h-4 mr-2" /> Weather
            </TabsTrigger>

            <TabsTrigger value="countdown" onClick={onUserAction}>
              <Timer className="w-4 h-4 mr-2" /> Countdown
            </TabsTrigger>

            <TabsTrigger value="neo" onClick={onUserAction}>
              <Sparkles className="w-4 h-4 mr-2" /> NEO
            </TabsTrigger>

            <TabsTrigger value="alerts" onClick={onUserAction}>
              <Bell className="w-4 h-4 mr-2" /> Alerts
            </TabsTrigger>

            <TabsTrigger value="impacts" onClick={onUserAction}>
              <History className="w-4 h-4 mr-2" /> Impacts
            </TabsTrigger>

            <TabsTrigger value="ar" onClick={onUserAction}>
              <Eye className="w-4 h-4 mr-2" /> AR
            </TabsTrigger>

            <TabsTrigger value="citizen" onClick={onUserAction}>
              <Users className="w-4 h-4 mr-2" /> Citizen
            </TabsTrigger>

          </TabsList>

          {/* ===================================== */}
          {/*               MISSIONS TAB            */}
          {/* ===================================== */}
          <TabsContent value="missions" className="space-y-8">

            {/* SEARCH */}
            <Input
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onUserAction();
              }}
              className="pl-10 bg-card/50 border-primary/30 focus:border-primary h-12"
            />

            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row gap-4">

              <Select
                value={agencyFilter}
                onValueChange={(v) => {
                  setAgencyFilter(v);
                  onUserAction();
                }}
              >
                <SelectTrigger className="bg-card/50 border-primary/30">
                  <SelectValue placeholder="All Agencies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agencies</SelectItem>
                  {agencies.map((agency) => (
                    <SelectItem key={agency} value={agency}>
                      {agency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(v) => {
                  setTypeFilter(v);
                  onUserAction();
                }}
              >
                <SelectTrigger className="bg-card/50 border-primary/30">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {missionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            {/* RESULTS COUNT */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredMissions.length} of {missions.length} missions
            </p>

            {/* ===================================== */}
            {/*   MISSION CARDS + IN-FEED ADS INSERT  */}
            {/* ===================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredMissions.map((mission, index) => (
                <>

                  {/* Mission Card */}
                  <div key={mission.id} onClick={onUserAction}>
                    <MissionCard mission={mission} />
                  </div>

                  {/* Insert In-Feed Ad every 6 cards */}
                  {index % 6 === 0 && index !== 0 ? (
                    <div className="col-span-full">
                      <InFeedAd refreshKey={index} />
                    </div>
                  ) : null}

                </>
              ))}

            </div>

            {filteredMissions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No missions found matching your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setAgencyFilter("all");
                    setTypeFilter("all");
                    onUserAction();
                  }}
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

          </TabsContent>

          {/* === OTHER TABS === */}
          <TabsContent value="compare"><MissionComparison /></TabsContent>
          <TabsContent value="tracker"><GlobeTracker /></TabsContent>
          <TabsContent value="telemetry"><TelemetryDashboard /></TabsContent>
          <TabsContent value="statistics"><MissionStatistics /></TabsContent>
          <TabsContent value="timeline"><MissionTimeline /></TabsContent>
          <TabsContent value="planner"><MissionPlanner /></TabsContent>
          <TabsContent value="learning"><OrbitalMechanicsLearning /></TabsContent>
          <TabsContent value="quiz"><EducationalQuiz /></TabsContent>
          <TabsContent value="glossary"><TechnicalGlossary /></TabsContent>
          <TabsContent value="spacecraft-compare"><SpacecraftComparison /></TabsContent>
          <TabsContent value="3d-orbits"><OrbitalMechanics3D /></TabsContent>
          <TabsContent value="weather"><SpaceWeatherDashboard /></TabsContent>
          <TabsContent value="countdown"><MissionCountdown /></TabsContent>
          <TabsContent value="neo"><NEOTracker /></TabsContent>
          <TabsContent value="alerts"><AlertSubscriptions /></TabsContent>
          <TabsContent value="impacts"><ImpactEventsHistory /></TabsContent>
          <TabsContent value="ar"><ARSkyView /></TabsContent>
          <TabsContent value="citizen"><CitizenScience /></TabsContent>

        </Tabs>
      </section>
    </div>
  );
};

export default Index;