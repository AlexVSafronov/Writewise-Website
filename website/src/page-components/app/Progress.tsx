import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Award,
  Target,
  Calendar,
  Flame,
  BookOpen,
  Star,
  CheckCircle2,
} from "lucide-react";

// Skills radar data
const skillsData = [
  { skill: "Grammar", current: 78, previous: 65 },
  { skill: "Vocabulary", current: 65, previous: 58 },
  { skill: "Writing", current: 72, previous: 62 },
  { skill: "Reading", current: 85, previous: 80 },
  { skill: "Listening", current: 60, previous: 52 },
  { skill: "Speaking", current: 55, previous: 48 },
];

// Monthly progress
const monthlyProgress = [
  { month: "Aug", score: 58, tasks: 12 },
  { month: "Sep", score: 62, tasks: 18 },
  { month: "Oct", score: 68, tasks: 22 },
  { month: "Nov", score: 72, tasks: 20 },
  { month: "Dec", score: 75, tasks: 25 },
  { month: "Jan", score: 78, tasks: 24 },
];

// Task completion by type
const tasksByType = [
  { type: "Writing", completed: 45, pending: 8 },
  { type: "Grammar", completed: 62, pending: 5 },
  { type: "Reading", completed: 28, pending: 3 },
  { type: "Vocabulary", completed: 35, pending: 6 },
];

// Recent achievements
const achievements = [
  { title: "7-Day Streak", description: "Completed tasks 7 days in a row", icon: Flame, date: "Today" },
  { title: "Grammar Master", description: "Scored 90%+ on 10 grammar tasks", icon: Award, date: "2 days ago" },
  { title: "First B2 Task", description: "Completed your first B2 level task", icon: Star, date: "1 week ago" },
  { title: "Writing Pro", description: "Completed 50 writing exercises", icon: BookOpen, date: "2 weeks ago" },
];

// Level milestones
const levelMilestones = [
  { level: "A2", status: "completed", score: 100 },
  { level: "B1", status: "current", score: 68 },
  { level: "B2", status: "locked", score: 0 },
  { level: "C1", status: "locked", score: 0 },
];

export const ProgressPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Learning Progress</h1>
        <p className="text-muted-foreground">Track your improvement across all language skills.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-foreground">170</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-foreground">78%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">7 days</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skills Radar */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Language Skills Overview</CardTitle>
            <p className="text-sm text-muted-foreground">Current vs. 3 months ago</p>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="3 Months Ago"
                    dataKey="previous"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted-foreground))"
                    fillOpacity={0.1}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Progress</CardTitle>
            <div className="flex items-center gap-2 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+20% improvement over 6 months</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgress}>
                  <defs>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#progressGradient)"
                    name="Avg. Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks by Type & Level Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tasks by Type */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Tasks by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByType} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="type" type="category" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Completed" />
                  <Bar dataKey="pending" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Pending" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CEFR Level Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">CEFR Level Journey</CardTitle>
            <p className="text-sm text-muted-foreground">Your path from A2 to C1</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {levelMilestones.map((milestone, index) => (
              <div key={milestone.level} className="relative">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg ${
                      milestone.status === "completed"
                        ? "bg-green-500 text-white"
                        : milestone.status === "current"
                        ? "bg-gradient-brand text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">
                        {milestone.status === "completed" && "Completed"}
                        {milestone.status === "current" && "In Progress"}
                        {milestone.status === "locked" && "Locked"}
                      </span>
                      {milestone.status !== "locked" && (
                        <span className="text-sm font-medium">{milestone.score}%</span>
                      )}
                    </div>
                    {milestone.status !== "locked" && (
                      <Progress value={milestone.score} className="h-2" />
                    )}
                    {milestone.status === "locked" && (
                      <div className="h-2 rounded-full bg-muted" />
                    )}
                  </div>
                </div>
                {index < levelMilestones.length - 1 && (
                  <div className="absolute left-6 top-14 h-6 w-0.5 bg-border" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="flex items-start gap-3 rounded-lg border bg-card p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand">
                  <achievement.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
