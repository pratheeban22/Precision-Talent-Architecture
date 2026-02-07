import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
