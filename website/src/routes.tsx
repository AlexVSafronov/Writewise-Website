import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { AppLayout } from './components/app';

// Marketing pages — loaded on demand
const Index             = lazy(() => import('./pages/Index'));
const Pricing           = lazy(() => import('./pages/Pricing'));
const About             = lazy(() => import('./pages/About'));
const Blog              = lazy(() => import('./pages/Blog'));
const BlogPost          = lazy(() => import('./pages/BlogPost'));
const Resources         = lazy(() => import('./pages/Resources'));
const VideoResource     = lazy(() => import('./pages/VideoResource'));
const Page              = lazy(() => import('./pages/Page'));
const Contact           = lazy(() => import('./pages/Contact'));
const Freelancers       = lazy(() => import('./pages/Freelancers'));
const PlacementTestHub     = lazy(() => import('./pages/PlacementTestHub'));
const PlacementTestGerman  = lazy(() => import('./pages/PlacementTestGerman'));
const PlacementTestEnglish = lazy(() => import('./pages/PlacementTestEnglish'));
const MarkdownTest      = lazy(() => import('./pages/MarkdownTest'));
const NotFound          = lazy(() => import('./pages/NotFound'));

// App pages — loaded on demand
const AppDashboard = lazy(() => import('./pages/app/Dashboard'));
const TaskDetail   = lazy(() => import('./pages/app/TaskDetail'));
const TasksList    = lazy(() => import('./pages/app/TasksList'));
const ProgressPage = lazy(() => import('./pages/app/Progress'));

const wrap = (Component: React.ComponentType) => (
  <Suspense fallback={<div className="min-h-screen" />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  // Marketing pages
  { path: '/',                              element: wrap(Index) },
  { path: '/pricing',                       element: wrap(Pricing) },
  { path: '/about',                         element: wrap(About) },
  { path: '/blog',                          element: wrap(Blog) },
  { path: '/blog/:slug',                    element: wrap(BlogPost) },
  { path: '/resources',                     element: wrap(Resources) },
  { path: '/resources/videos/:slug',        element: wrap(VideoResource) },
  { path: '/privacy',                       element: wrap(Page) },
  { path: '/terms',                         element: wrap(Page) },
  { path: '/contact',                       element: wrap(Contact) },
  { path: '/for-freelancers',               element: wrap(Freelancers) },
  { path: '/placement-test',                element: wrap(PlacementTestHub) },
  { path: '/placement-test/german',         element: wrap(PlacementTestGerman) },
  { path: '/placement-test/english',        element: wrap(PlacementTestEnglish) },
  { path: '/markdown-test',                 element: wrap(MarkdownTest) },

  // App pages (client-side only — never pre-rendered)
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true,               element: wrap(AppDashboard) },
      { path: 'tasks',             element: wrap(TasksList) },
      { path: 'tasks/:taskId',     element: wrap(TaskDetail) },
      { path: 'progress',          element: wrap(ProgressPage) },
    ],
  },

  // Catch-all → 404
  { path: '*', element: wrap(NotFound) },
];
