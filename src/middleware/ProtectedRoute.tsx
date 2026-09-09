import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useIsSuperUser } from '../hooks/usePermissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'super_user' | 'normal_user' | 'any';
  fallback?: React.ReactNode;
}

/**
 * Component to protect routes based on authentication and roles
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'any',
  fallback = null,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const isSuperUser = useIsSuperUser();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || <div className="flex items-center justify-center h-screen">Please log in</div>;
  }

  if (requiredRole !== 'any') {
    if (requiredRole === 'super_user' && !isSuperUser) {
      return fallback || (
        <div className="flex items-center justify-center h-screen">
          You do not have permission to access this page
        </div>
      );
    }

    if (requiredRole === 'normal_user' && user?.role !== 'normal_user') {
      return fallback || (
        <div className="flex items-center justify-center h-screen">
          You do not have permission to access this page
        </div>
      );
    }
  }

  return <>{children}</>;
};
