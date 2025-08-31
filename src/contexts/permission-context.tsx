import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useAuth } from "../hooks/use-auth";

// Permission types matching backend
export type Permission = 
  // User Management Permissions
  | "users:create"
  | "users:read" 
  | "users:update"
  | "users:delete"
  | "users:manage_roles"
  // Project Management Permissions
  | "projects:create"
  | "projects:read"
  | "projects:update" 
  | "projects:delete"
  | "projects:assign_members"
  // Milestone Permissions
  | "milestones:create"
  | "milestones:read"
  | "milestones:update"
  | "milestones:delete"
  // Activity Log Permissions
  | "activity_logs:read"
  | "activity_logs:manage"
  // System Administration
  | "system:admin"
  | "system:settings";

export type UserRole = "Admin" | "External Partner" | "Project Mentor" | "Lead Mentor" | "Student";

// Role-based permissions mapping
const RolePermissions: Record<UserRole, Permission[]> = {
  Admin: [
    "users:create", "users:read", "users:update", "users:delete", "users:manage_roles",
    "projects:create", "projects:read", "projects:update", "projects:delete", "projects:assign_members",
    "milestones:create", "milestones:read", "milestones:update", "milestones:delete",
    "activity_logs:read", "activity_logs:manage",
    "system:admin", "system:settings"
  ],
  "Lead Mentor": [
    "users:read", "users:update",
    "projects:create", "projects:read", "projects:update", "projects:assign_members",
    "milestones:create", "milestones:read", "milestones:update", "milestones:delete",
    "activity_logs:read"
  ],
  "Project Mentor": [
    "users:read",
    "projects:read", "projects:update",
    "milestones:create", "milestones:read", "milestones:update", "milestones:delete",
    "activity_logs:read"
  ],
  "External Partner": [
    "projects:read",
    "milestones:read",
    "activity_logs:read"
  ],
  Student: [
    "projects:read",
    "milestones:read"
  ]
};

interface UserPermission {
  permission: Permission;
  granted: "allow" | "deny";
}

interface PermissionContextType {
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canManageUser: (targetUserId?: string) => boolean;
  canManageProject: (projectId?: string) => boolean;
  userRole?: UserRole;
  effectivePermissions: Permission[];
  isLoading: boolean;
}

const PermissionContext = createContext<PermissionContextType | null>(null);

interface PermissionProviderProps {
  children: React.ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const { currentUser, loading } = useAuth({});

  const userRole = currentUser?.role as UserRole | undefined;
  const customPermissions = currentUser?.userPermissions as UserPermission[] | undefined;

  // Calculate effective permissions
  const effectivePermissions = useMemo(() => {
    if (!userRole) return [];

    const rolePermissions = RolePermissions[userRole] || [];
    const effectivePerms = new Set(rolePermissions);

    // Apply custom permissions
    if (customPermissions) {
      for (const perm of customPermissions) {
        if (perm.granted === "allow") {
          effectivePerms.add(perm.permission);
        } else if (perm.granted === "deny") {
          effectivePerms.delete(perm.permission);
        }
      }
    }

    return Array.from(effectivePerms);
  }, [userRole, customPermissions]);

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      return effectivePermissions.includes(permission);
    },
    [effectivePermissions]
  );

  const hasAnyPermission = useCallback(
    (permissions: Permission[]): boolean => {
      return permissions.some(perm => hasPermission(perm));
    },
    [hasPermission]
  );

  const hasAllPermissions = useCallback(
    (permissions: Permission[]): boolean => {
      return permissions.every(perm => hasPermission(perm));
    },
    [hasPermission]
  );

  const canManageUser = useCallback(
    (targetUserId?: string): boolean => {
      // Admins can manage all users
      if (hasPermission("users:update")) return true;
      
      // Users can manage themselves
      if (targetUserId && currentUser?.id === targetUserId) return true;
      
      return false;
    },
    [hasPermission, currentUser?.id]
  );

  const canManageProject = useCallback(
    (projectId?: string): boolean => {
      // Check if user has project management permissions
      if (hasPermission("projects:update")) return true;
      
      // TODO: Check if user is a member of the specific project
      return false;
    },
    [hasPermission]
  );

  const value: PermissionContextType = {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canManageUser,
    canManageProject,
    userRole,
    effectivePermissions,
    isLoading: loading,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
};

// HOC for permission-based component rendering
interface WithPermissionProps {
  permission: Permission | Permission[];
  fallback?: React.ReactNode;
  requireAll?: boolean;
  children: React.ReactNode;
}

export const WithPermission: React.FC<WithPermissionProps> = ({
  permission,
  fallback = null,
  requireAll = false,
  children,
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  const hasAccess = useMemo(() => {
    if (Array.isArray(permission)) {
      return requireAll ? hasAllPermissions(permission) : hasAnyPermission(permission);
    }
    return hasPermission(permission);
  }, [permission, requireAll, hasPermission, hasAnyPermission, hasAllPermissions]);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
