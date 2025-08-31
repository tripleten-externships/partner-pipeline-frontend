import React from "react";
import { Navigate } from "react-router-dom";
import { useSessionAuth } from "../hooks/use-session-auth";
import { useProjectStore } from '../components/Store/project-store';
import { usePermissions, Permission } from "../contexts/permission-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission | Permission[];
  requireAll?: boolean;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  requireAll = false,
  fallbackPath = "/welcome"
}) => {
  const { currentUser, loading } = useSessionAuth();
  const { currentProject } = useProjectStore();
  const { hasPermission, hasAnyPermission, hasAllPermissions, isLoading: permissionsLoading } = usePermissions();
  
  // TODO: Add a loading spinner
  if (loading || permissionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/welcome" replace />;
  }

  // Check permissions if required
  if (requiredPermission) {
    let hasAccess = false;
    
    if (Array.isArray(requiredPermission)) {
      hasAccess = requireAll 
        ? hasAllPermissions(requiredPermission)
        : hasAnyPermission(requiredPermission);
    } else {
      hasAccess = hasPermission(requiredPermission);
    }
    
    if (!hasAccess) {
      return <Navigate to={fallbackPath} replace />;
    }
  }

  // Student-specific project routing
  if (
    currentUser.role === "student" &&
    currentProject?.id !== currentUser.assignedProjectId
  ) {
    return <Navigate to={`/projects/${currentUser.assignedProjectId}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
