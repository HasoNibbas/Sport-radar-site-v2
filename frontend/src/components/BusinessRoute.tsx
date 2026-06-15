import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

interface BusinessRouteProps {
  children: ReactNode;
}

const BusinessRoute: React.FC<BusinessRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.type !== 'business') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default BusinessRoute;
