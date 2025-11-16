import { useMemo } from "react";
import { missions } from "@/data/missions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";
import { TrendingUp, Rocket, Globe2, Award, Calendar } from "lucide-react";

export const MissionStatistics = () => {
  const statistics = useMemo(() => {
    // Agency distribution
    const agencyCount = missions.reduce((acc, mission) => {
      const agencies = mission.agency.split(" / ");
      agencies.forEach(agency => {
        acc[agency] = (acc[agency] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const agencyData = Object.entries(agencyCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    // Mission type distribution
    const typeCount = missions.reduce((acc, mission) => {
      acc[mission.modelType] = (acc[mission.modelType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeData = Object.entries(typeCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));

    // Active vs inactive
    const statusData = [
      {
        name: "Active",
        value: missions.filter(m => m.trajectory.currentStatus?.includes("Active")).length
      },
      {
        name: "Completed",
        value: missions.filter(m => 
          m.trajectory.currentStatus?.includes("completed") || 
          m.trajectory.currentStatus?.includes("ended")
        ).length
      }
    ];

    // Launches by year
    const launchByYear = missions.reduce((acc, mission) => {
      const year = new Date(mission.launchDate).getFullYear();
      if (year >= 2000) { // Focus on recent decades
        acc[year] = (acc[year] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    const yearData = Object.entries(launchByYear)
      .map(([year, count]) => ({ year: year, launches: count }))
      .sort((a, b) => Number(a.year) - Number(b.year));

    // Success metrics
    const totalMissions = missions.length;
    const activeMissions = missions.filter(m => m.trajectory.currentStatus?.includes("Active")).length;
    const completedMissions = missions.filter(m => 
      m.trajectory.currentStatus?.includes("completed") || 
      m.trajectory.currentStatus?.includes("ended")
    ).length;
    const successRate = ((completedMissions / totalMissions) * 100).toFixed(1);

    return {
      agencyData,
      typeData,
      statusData,
      yearData,
      totalMissions,
      activeMissions,
      completedMissions,
      successRate,
      uniqueAgencies: Object.keys(agencyCount).length
    };
  }, []);

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#f43f5e", "#a855f7"];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cosmic-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Total Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient">{statistics.totalMissions}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all agencies</p>
          </CardContent>
        </Card>

        <Card className="cosmic-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Active Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{statistics.activeMissions}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently operational</p>
          </CardContent>
        </Card>

        <Card className="cosmic-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Globe2 className="w-4 h-4" />
              Space Agencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{statistics.uniqueAgencies}</div>
            <p className="text-xs text-muted-foreground mt-1">International collaboration</p>
          </CardContent>
        </Card>

        <Card className="cosmic-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{statistics.successRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Mission completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missions by Agency */}
        <Card className="cosmic-glow">
          <CardHeader>
            <CardTitle className="text-lg">Missions by Agency</CardTitle>
            <CardDescription>Distribution of missions across space agencies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistics.agencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mission Types */}
        <Card className="cosmic-glow">
          <CardHeader>
            <CardTitle className="text-lg">Mission Types</CardTitle>
            <CardDescription>Breakdown by spacecraft category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statistics.typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statistics.typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Launch Timeline */}
        <Card className="cosmic-glow lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Launch Activity (2000-Present)
            </CardTitle>
            <CardDescription>Number of missions launched per year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statistics.yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="launches" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="cosmic-glow lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Mission Status</CardTitle>
            <CardDescription>Current operational status of all missions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statistics.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
