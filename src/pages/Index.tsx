import { useState, useMemo } from "react";
import { missions } from "@/data/missions";
import { MissionCard } from "@/components/MissionCard";
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
import { Rocket, Search, Filter, GitCompare, Globe, BarChart3, BookOpen, Activity, Clock, Calculator, GraduationCap, Atom, Circle, CloudSun, Timer, Sparkles, Bell, History, Eye, Users } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("missions");

  // Get unique agencies
  const agencies = useMemo(() => {
    const uniqueAgencies = [...new Set(missions.map((m) => m.agency))];
    return uniqueAgencies.sort();
  }, []);

  // Get unique mission types
  const missionTypes = useMemo(() => {
    const types = [...new Set(missions.map((m) => m.modelType))];
    return types.sort();
  }, []);

  // Filter missions
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
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt="Space missions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-12 h-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient">
              Space Missions Explorer
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
              Discover, Compare & Explore Groundbreaking Space Missions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-6xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-2 h-auto bg-card/50 backdrop-blur p-2">
            <TabsTrigger value="missions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Explore</span> Missions
            </TabsTrigger>
            <TabsTrigger value="compare" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="tracker" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Live</span> Tracker
            </TabsTrigger>
            <TabsTrigger value="telemetry" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Activity className="w-4 h-4 mr-2" />
              Telemetry
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Clock className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="planner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calculator className="w-4 h-4 mr-2" />
              Planner
            </TabsTrigger>
            <TabsTrigger value="learning" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Atom className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <GraduationCap className="w-4 h-4 mr-2" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="glossary" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <BookOpen className="w-4 h-4 mr-2" />
              Glossary
            </TabsTrigger>
            <TabsTrigger value="spacecraft-compare" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="3d-orbits" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Circle className="w-4 h-4 mr-2" />
              3D Orbits
            </TabsTrigger>
            <TabsTrigger value="weather" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <CloudSun className="w-4 h-4 mr-2" />
              Space Weather
            </TabsTrigger>
            <TabsTrigger value="countdown" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Timer className="w-4 h-4 mr-2" />
              Launch Countdown
            </TabsTrigger>
            <TabsTrigger value="neo" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Asteroid/Comet
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Bell className="w-4 h-4 mr-2" />
              Alert Subscriptions
            </TabsTrigger>
            <TabsTrigger value="impacts" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <History className="w-4 h-4 mr-2" />
              Impact History
            </TabsTrigger>
            <TabsTrigger value="ar" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Eye className="w-4 h-4 mr-2" />
              AR Sky View
            </TabsTrigger>
            <TabsTrigger value="citizen" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Users className="w-4 h-4 mr-2" />
              Citizen Science
            </TabsTrigger>
          </TabsList>

          <TabsContent value="missions" className="space-y-8">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search missions, agencies, or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card/50 border-primary/30 focus:border-primary h-12"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setAgencyFilter("all");
                    setTypeFilter("all");
                  }}
                  className="border-primary/30"
                >
                  Clear Filters
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter by Agency
                  </label>
                  <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                    <SelectTrigger className="bg-card/50 border-primary/30">
                      <SelectValue placeholder="All Agencies" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/30 z-50">
                      <SelectItem value="all">All Agencies</SelectItem>
                      {agencies.map((agency) => (
                        <SelectItem key={agency} value={agency}>
                          {agency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter by Type
                  </label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-card/50 border-primary/30">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/30 z-50">
                      <SelectItem value="all">All Types</SelectItem>
                      {missionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredMissions.length} of {missions.length} missions
                </p>
              </div>
            </div>

            {/* Missions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
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
                  }}
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compare">
            <MissionComparison />
          </TabsContent>

          <TabsContent value="tracker">
            <GlobeTracker />
          </TabsContent>

          <TabsContent value="telemetry">
            <TelemetryDashboard />
          </TabsContent>

          <TabsContent value="statistics">
            <MissionStatistics />
          </TabsContent>

          <TabsContent value="timeline">
            <MissionTimeline />
          </TabsContent>

          <TabsContent value="planner">
            <MissionPlanner />
          </TabsContent>

          <TabsContent value="learning">
            <OrbitalMechanicsLearning />
          </TabsContent>

          <TabsContent value="quiz">
            <EducationalQuiz />
          </TabsContent>

          <TabsContent value="glossary">
            <TechnicalGlossary />
          </TabsContent>

          <TabsContent value="spacecraft-compare">
            <SpacecraftComparison />
          </TabsContent>

          <TabsContent value="3d-orbits">
            <OrbitalMechanics3D />
          </TabsContent>

          <TabsContent value="weather">
            <SpaceWeatherDashboard />
          </TabsContent>

          <TabsContent value="countdown">
            <MissionCountdown />
          </TabsContent>

          <TabsContent value="neo">
            <NEOTracker />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertSubscriptions />
          </TabsContent>

          <TabsContent value="impacts">
            <ImpactEventsHistory />
          </TabsContent>

          <TabsContent value="ar">
            <ARSkyView />
          </TabsContent>

          <TabsContent value="citizen">
            <CitizenScience />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
