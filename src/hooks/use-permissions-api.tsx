import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";

interface UserPermission {
  id: string;
  permission: string;
  granted: "allow" | "deny";
  grantedAt: string;
  grantedBy: {
    id: string;
    name: string;
    email: string;
  };
}

interface PermissionData {
  user: {
    id: string;
    role: string;
    userPermissions: UserPermission[];
  };
  rolePermissions: string[];
  effectivePermissions: string[];
}

interface BulkPermissionUpdate {
  permission: string;
  granted: "allow" | "deny";
}

export const usePermissionsApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth({});

  const apiCall = useCallback(async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("auth_token");
    
    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }, []);

  const getAllPermissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiCall("/api/permissions");
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch permissions";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const getUserPermissions = useCallback(async (userId: string): Promise<PermissionData> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiCall(`/api/users/${userId}/permissions`);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch user permissions";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const grantPermission = useCallback(async (
    userId: string, 
    permission: string, 
    granted: "allow" | "deny" = "allow"
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiCall(`/api/users/${userId}/permissions`, {
        method: "POST",
        body: JSON.stringify({ permission, granted }),
      });
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to grant permission";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const revokePermission = useCallback(async (userId: string, permissionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiCall(`/api/users/${userId}/permissions/${permissionId}`, {
        method: "DELETE",
      });
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to revoke permission";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const bulkUpdatePermissions = useCallback(async (
    userId: string, 
    permissions: BulkPermissionUpdate[]
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiCall(`/api/users/${userId}/permissions/bulk`, {
        method: "PUT",
        body: JSON.stringify({ permissions }),
      });
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update permissions";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return {
    loading,
    error,
    getAllPermissions,
    getUserPermissions,
    grantPermission,
    revokePermission,
    bulkUpdatePermissions,
  };
};
