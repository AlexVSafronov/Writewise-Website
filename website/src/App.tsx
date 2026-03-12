import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Marketing pages — loaded on demand
const Index = lazy(() => import("./pages/Index"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Resources = lazy(() => import("./pages/Resources"));
const VideoResource = lazy(() => import("./pages/VideoResource"));
const Page = lazy(() => import("./pages/Page"));
const Contact = lazy(() => import("./pages/Contact"));
const Freelancers = lazy(() => import("./pages/Freelancers"));
const PlacementTestHub     = lazy(() => import("./pages/PlacementTestHub"));
const PlacementTestGerman  = lazy(() => import("./pages/PlacementTestGerman"));
const PlacementTestEnglish = lazy(() => import("./pages/PlacementTestEnglish"));
const MarkdownTest = lazy(() => import("./pages/MarkdownTest"));
const NotFound = lazy(() => import("./pages/NotFound"));

// App pages — loaded on demand
import { AppLayout } from "./components/app";
const AppDashboard = lazy(() => import("./pages/app/Dashboard"));
const TaskDetail = lazy(() => import("./pages/app/TaskDetail"));
const TasksList = lazy(() => import("./pages/app/TasksList"));
const ProgressPage = lazy(() => import("./pages/app/Progress"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          {/* Marketing pages */}
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/videos/:slug" element={<VideoResource />} />
          <Route path="/privacy" element={<Page />} />
          <Route path="/terms" element={<Page />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/for-freelancers" element={<Freelancers />} />
          <Route path="/placement-test" element={<PlacementTestHub />} />
          <Route path="/placement-test/german"  element={<PlacementTestGerman />} />
          <Route path="/placement-test/english" element={<PlacementTestEnglish />} />
          <Route path="/markdown-test" element={<MarkdownTest />} />

          {/* App pages */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<AppDashboard />} />
            <Route path="tasks" element={<TasksList />} />
            <Route path="tasks/:taskId" element={<TaskDetail />} />
            <Route path="progress" element={<ProgressPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
