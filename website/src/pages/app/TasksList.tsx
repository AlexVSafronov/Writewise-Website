import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Circle,
  Play,
  Star,
  Clock,
  Calendar,
} from "lucide-react";

// Mock tasks data
const allTasks = [
  {
    id: "1",
    title: "Write a formal email requesting time off",
    type: "Writing",
    level: "B1",
    status: "completed",
    score: 85,
    date: "2025-01-30",
    duration: "22 min",
  },
  {
    id: "2",
    title: "Complete the past tense exercise",
    type: "Grammar",
    level: "B1",
    status: "completed",
    score: 92,
    date: "2025-01-29",
    duration: "15 min",
  },
  {
    id: "3",
    title: "Describe your ideal vacation",
    type: "Writing",
    level: "B1",
    status: "in_progress",
    score: null,
    date: "2025-01-30",
    duration: null,
  },
  {
    id: "4",
    title: "Conditional sentences practice",
    type: "Grammar",
    level: "B2",
    status: "pending",
    score: null,
    date: null,
    duration: null,
  },
  {
    id: "5",
    title: "Write a product review",
    type: "Writing",
    level: "B1",
    status: "pending",
    score: null,
    date: null,
    duration: null,
  },
  {
    id: "6",
    title: "Passive voice transformation",
    type: "Grammar",
    level: "B1",
    status: "completed",
    score: 78,
    date: "2025-01-28",
    duration: "18 min",
  },
  {
    id: "7",
    title: "Write a complaint letter",
    type: "Writing",
    level: "B2",
    status: "completed",
    score: 88,
    date: "2025-01-27",
    duration: "30 min",
  },
  {
    id: "8",
    title: "Reported speech exercises",
    type: "Grammar",
    level: "B2",
    status: "pending",
    score: null,
    date: null,
    duration: null,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "in_progress":
      return <Play className="h-5 w-5 text-primary" />;
    default:
      return <Circle className="h-5 w-5 text-muted-foreground" />;
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

export const TasksList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || task.type === typeFilter;
    const matchesLevel = levelFilter === "all" || task.level === levelFilter;
    const matchesStatus = activeTab === "all" || task.status === activeTab;
    return matchesSearch && matchesType && matchesLevel && matchesStatus;
  });

  const taskCounts = {
    all: allTasks.length,
    pending: allTasks.filter(t => t.status === "pending").length,
    in_progress: allTasks.filter(t => t.status === "in_progress").length,
    completed: allTasks.filter(t => t.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground">Manage and track all your learning tasks.</p>
        </div>
        <Button className="bg-gradient-brand hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Writing">Writing</SelectItem>
              <SelectItem value="Grammar">Grammar</SelectItem>
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({taskCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({taskCounts.pending})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({taskCounts.in_progress})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({taskCounts.completed})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Circle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">No tasks found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Link key={task.id} to={`/app/tasks/${task.id}`}>
                  <Card className="border-0 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    <CardContent className="flex items-center gap-4 p-4">
                      {getStatusIcon(task.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{task.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className="text-xs">{task.type}</Badge>
                          <span className="text-xs text-muted-foreground">Level {task.level}</span>
                          {task.date && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {task.date}
                            </span>
                          )}
                          {task.duration && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.duration}
                            </span>
                          )}
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
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksList;
