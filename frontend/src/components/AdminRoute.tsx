import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user?.is_staff) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;
