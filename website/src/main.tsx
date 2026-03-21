/**
 * Development entry point — used only by `vite` (npm run dev).
 *
 * Production builds use main.ssg.tsx via `vite-ssg build`.
 * This file is NOT included in the production bundle.
 */
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { routes } from './routes';
import { initGA } from './lib/analytics';
import './index.css';

initGA();

// Wrap App (layout shell) with all the routes for local development.
// vite-ssg provides this wrapper automatically in production.
const router = createBrowserRouter([
  {
    element: <App />,
    children: routes,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
