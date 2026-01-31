import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Clock,
  Target,
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  BookOpen,
  RefreshCw,
} from "lucide-react";

// Mock task data
const taskData = {
  id: "1",
  title: "Write a formal email requesting time off",
  type: "Writing",
  level: "B1",
  status: "completed",
  description: `Write a formal email to your manager requesting two weeks of vacation time. Your email should:

• Use appropriate formal greetings and closings
• Clearly state the dates you wish to take off
• Briefly explain the reason for your request
• Mention how you will ensure your work is covered
• Express willingness to discuss the request

**Word count:** 150-200 words
**Time limit:** 30 minutes`,
  tips: [
    "Start with 'Dear [Name]' for formal emails",
    "Be clear and concise about your request",
    "Show consideration for your team by mentioning coverage",
    "End with a professional closing like 'Best regards' or 'Sincerely'",
  ],
  submission: `Dear Mr. Thompson,

I am writing to formally request two weeks of annual leave from January 15th to January 29th, 2025.

During this period, I plan to visit my family abroad, as it has been over a year since I last saw them. I understand this is a busy time for the team, and I want to assure you that I will complete all urgent tasks before my departure.

I have already spoken with Sarah from my team, and she has kindly agreed to handle any urgent matters in my absence. I will also prepare detailed handover notes to ensure a smooth transition.

I would be happy to discuss this request at your convenience and make any necessary adjustments to the dates if required.

Thank you for considering my request.

Best regards,
John Doe`,
  evaluation: {
    overallScore: 85,
    breakdown: [
      { area: "Grammar", score: 90, feedback: "Excellent grammar with minor issues" },
      { area: "Vocabulary", score: 82, feedback: "Good range of formal vocabulary" },
      { area: "Structure", score: 88, feedback: "Well-organized with clear paragraphs" },
      { area: "Tone", score: 85, feedback: "Appropriate formal tone maintained" },
      { area: "Task Completion", score: 80, feedback: "All requirements addressed" },
    ],
    improvements: [
      "Consider using more varied sentence structures to enhance readability",
      "The phrase 'kindly agreed' could be replaced with 'agreed' for more natural business English",
      "Adding a specific timeline for when you'll prepare handover notes would strengthen the email",
    ],
    strengths: [
      "Clear and professional opening paragraph",
      "Good use of transitional phrases",
      "Appropriate formal closing",
      "Consideration shown for team coverage",
    ],
  },
  wordCount: 178,
  timeSpent: "22 min",
};

export const TaskDetail = () => {
  const { taskId } = useParams();
  const [answer, setAnswer] = useState(taskData.submission);
  const [activeTab, setActiveTab] = useState("task");

  const isCompleted = taskData.status === "completed";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/app">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Badge variant="outline">{taskData.type}</Badge>
            <Badge className="bg-primary/10 text-primary">Level {taskData.level}</Badge>
            {isCompleted && (
              <Badge className="bg-green-500/10 text-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="text-xl font-bold text-foreground">{taskData.title}</h1>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2">
            <Star className="h-5 w-5 text-white fill-white" />
            <span className="text-2xl font-bold text-white">{taskData.evaluation.overallScore}%</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="task">Task</TabsTrigger>
          <TabsTrigger value="submission">Submission</TabsTrigger>
          <TabsTrigger value="evaluation" disabled={!isCompleted}>
            Evaluation
          </TabsTrigger>
        </TabsList>

        {/* Task Tab */}
        <TabsContent value="task" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Task Description */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Task Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground">
                    {taskData.description.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('•') ? 'ml-4' : ''}>
                        {line.startsWith('**') ? (
                          <strong>{line.replace(/\*\*/g, '')}</strong>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Writing Area (if not completed) */}
              {!isCompleted && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Your Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Start writing your response here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-[300px] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Word count: {answer.split(/\s+/).filter(Boolean).length}
                      </span>
                      <Button className="bg-gradient-brand hover:opacity-90">
                        <Send className="mr-2 h-4 w-4" />
                        Submit for Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tips Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {taskData.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Limit
                    </span>
                    <span className="font-medium">30 min</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Word Count
                    </span>
                    <span className="font-medium">150-200</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Submission Tab */}
        <TabsContent value="submission" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Submission</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {taskData.timeSpent}
                </span>
                <span>{taskData.wordCount} words</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted/50 p-6 whitespace-pre-wrap font-mono text-sm">
                {taskData.submission}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evaluation Tab */}
        <TabsContent value="evaluation" className="space-y-6 mt-6">
          {/* Overall Score */}
          <Card className="border-0 shadow-sm bg-gradient-brand-subtle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Overall Score</h3>
                  <p className="text-sm text-muted-foreground">Based on 5 evaluation criteria</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-4xl font-bold text-gradient-brand">
                      {taskData.evaluation.overallScore}%
                    </span>
                    <p className="text-sm text-muted-foreground">Great job!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Score Breakdown */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {taskData.evaluation.breakdown.map((item) => (
                  <div key={item.area} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.area}</span>
                      <span className="font-semibold text-primary">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{item.feedback}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths & Improvements */}
            <div className="space-y-6">
              <Card className="border-0 shadow-sm border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {taskData.evaluation.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {taskData.evaluation.improvements.map((improvement, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button className="bg-gradient-brand hover:opacity-90" size="lg">
              Next Task
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskDetail;
