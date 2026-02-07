import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import DashboardLayout from './layout/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/assessment',
    element: (
      <ProtectedRoute>
        <Assessment />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/roadmap',
        element: <Roadmap />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
]);

export default routes;
