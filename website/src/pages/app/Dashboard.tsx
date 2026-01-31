import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "recharts";
import {
  TrendingUp,
  Clock,
  Target,
  Flame,
  ArrowRight,
  CheckCircle2,
  Circle,
  Play,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for radar chart - language skills
const skillsData = [
  { skill: "Grammar", score: 78, fullMark: 100 },
  { skill: "Vocabulary", score: 65, fullMark: 100 },
  { skill: "Writing", score: 72, fullMark: 100 },
  { skill: "Reading", score: 85, fullMark: 100 },
  { skill: "Listening", score: 60, fullMark: 100 },
  { skill: "Speaking", score: 55, fullMark: 100 },
];

// Mock data for progress chart
const weeklyProgress = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 78 },
  { day: "Fri", score: 82 },
  { day: "Sat", score: 75 },
  { day: "Sun", score: 88 },
];

// Mock tasks data
const recentTasks = [
  {
    id: "1",
    title: "Write a formal email requesting time off",
    type: "Writing",
    level: "B1",
    status: "completed",
    score: 85,
    date: "Today",
  },
  {
    id: "2",
    title: "Complete the past tense exercise",
    type: "Grammar",
    level: "B1",
    status: "completed",
    score: 92,
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Describe your ideal vacation",
    type: "Writing",
    level: "B1",
    status: "in_progress",
    score: null,
    date: "In progress",
  },
  {
    id: "4",
    title: "Conditional sentences practice",
    type: "Grammar",
    level: "B2",
    status: "pending",
    score: null,
    date: "Not started",
  },
  {
    id: "5",
    title: "Write a product review",
    type: "Writing",
    level: "B1",
    status: "pending",
    score: null,
    date: "Not started",
  },
];

const stats = [
  {
    title: "Current Streak",
    value: "7 days",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Tasks Completed",
    value: "24",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Avg. Score",
    value: "78%",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Time Spent",
    value: "12.5h",
    icon: Clock,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "in_progress":
      return <Play className="h-4 w-4 text-primary" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Completed</Badge>;
    case "in_progress":
      return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">In Progress</Badge>;
    default:
      return <Badge variant="outline">Pending</Badge>;
  }
};

export const AppDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress and continue where you left off.</p>
        </div>
        <Button className="bg-gradient-brand hover:opacity-90">
          <Play className="mr-2 h-4 w-4" />
          Start New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Task List */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Recent Tasks</CardTitle>
              <Link to="/app/tasks">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/app/tasks/${task.id}`}
                  className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  {getStatusIcon(task.status)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{task.type}</Badge>
                      <span className="text-xs text-muted-foreground">Level {task.level}</span>
                      <span className="text-xs text-muted-foreground">• {task.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {task.score !== null && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-foreground">{task.score}%</span>
                      </div>
                    )}
                    {getStatusBadge(task.status)}
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills Radar Chart */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Language Skills</CardTitle>
              <p className="text-sm text-muted-foreground">Your proficiency across all areas</p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {skillsData.slice(0, 4).map((skill) => (
                  <div key={skill.skill} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{skill.skill}</span>
                    <span className="font-medium text-foreground">{skill.score}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
            <p className="text-sm text-muted-foreground">Your average scores this week</p>
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+12% from last week</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Current Level Progress */}
      <Card className="border-0 shadow-sm bg-gradient-brand-subtle">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Level Progress: B1 → B2</h3>
              <p className="text-sm text-muted-foreground">Complete 12 more tasks to reach B2 level</p>
            </div>
            <Badge className="bg-gradient-brand text-white text-lg px-4 py-1">B1</Badge>
          </div>
          <Progress value={68} className="h-3" />
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <span>68% Complete</span>
            <span>24/36 Tasks</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppDashboard;
