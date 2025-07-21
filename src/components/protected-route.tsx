import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useProjectStore } from '../components/Store/project-store';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth({});
  const { currentProject } = useProjectStore();
  // TODO: Add a loading spinner
  if (loading) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/welcome" replace />;
  }

    if (
    currentUser.role === "student" &&
    currentProject?.id !== currentUser.assignedProjectId
  ) {
    return <Navigate to={`/projects/${currentUser.assignedProjectId}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
