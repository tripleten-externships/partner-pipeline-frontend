import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectItem } from "../ui/select";
import { Switch } from "../ui/switch";
import { Alert } from "../ui/alert";
import { usePermissionsApi } from "../../hooks/use-permissions-api";
import { usePermissions, Permission, WithPermission } from "../../contexts/permission-context";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

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

interface PermissionCategory {
  category: string;
  permissions: string[];
}

const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    category: "User Management",
    permissions: ["users:create", "users:read", "users:update", "users:delete", "users:manage_roles"]
  },
  {
    category: "Project Management", 
    permissions: ["projects:create", "projects:read", "projects:update", "projects:delete", "projects:assign_members"]
  },
  {
    category: "Milestones",
    permissions: ["milestones:create", "milestones:read", "milestones:update", "milestones:delete"]
  },
  {
    category: "Activity Logs",
    permissions: ["activity_logs:read", "activity_logs:manage"]
  },
  {
    category: "System Administration",
    permissions: ["system:admin", "system:settings"]
  }
];

export const PermissionSettings: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [effectivePermissions, setEffectivePermissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  const { 
    loading, 
    error, 
    getAllPermissions, 
    getUserPermissions, 
    grantPermission, 
    revokePermission,
    bulkUpdatePermissions 
  } = usePermissionsApi();

  const { hasPermission } = usePermissions();

  // Mock users data - replace with actual API call
  useEffect(() => {
    const mockUsers: User[] = [
      { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
      { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Project Mentor" },
      { id: "3", name: "Charlie Kim", email: "charlie@example.com", role: "Student" },
    ];
    setUsers(mockUsers);
  }, []);

  const loadUserPermissions = async (userId: string) => {
    try {
      const data = await getUserPermissions(userId);
      setUserPermissions(data.user.userPermissions || []);
      setRolePermissions(data.rolePermissions || []);
      setEffectivePermissions(data.effectivePermissions || []);
    } catch (err) {
      toast.error("Failed to load user permissions");
    }
  };

  useEffect(() => {
    if (selectedUser) {
      loadUserPermissions(selectedUser);
    }
  }, [selectedUser]);

  const handlePermissionToggle = async (permission: string, currentlyGranted: boolean) => {
    if (!selectedUser) return;

    try {
      if (currentlyGranted) {
        // Find the permission to revoke
        const permissionToRevoke = userPermissions.find(p => p.permission === permission);
        if (permissionToRevoke) {
          await revokePermission(selectedUser, permissionToRevoke.id);
          toast.success("Permission revoked successfully");
        }
      } else {
        await grantPermission(selectedUser, permission, "allow");
        toast.success("Permission granted successfully");
      }
      
      // Reload permissions
      await loadUserPermissions(selectedUser);
    } catch (err) {
      toast.error("Failed to update permission");
    }
  };

  const handlePermissionDeny = async (permission: string) => {
    if (!selectedUser) return;

    try {
      await grantPermission(selectedUser, permission, "deny");
      toast.success("Permission denied successfully");
      await loadUserPermissions(selectedUser);
    } catch (err) {
      toast.error("Failed to deny permission");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isPermissionGranted = (permission: string): boolean => {
    const userPerm = userPermissions.find(p => p.permission === permission);
    return userPerm?.granted === "allow";
  };

  const isPermissionDenied = (permission: string): boolean => {
    const userPerm = userPermissions.find(p => p.permission === permission);
    return userPerm?.granted === "deny";
  };

  const hasRolePermission = (permission: string): boolean => {
    return rolePermissions.includes(permission);
  };

  if (!hasPermission("users:manage_roles")) {
    return (
      <Alert>
        <p>You don't have permission to manage user permissions.</p>
      </Alert>
    );
  }

  return (
    <WithPermission permission="users:manage_roles">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Permission Settings</h1>
          <div className="flex space-x-2">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
            >
              User Permissions
            </Button>
            <Button
              variant={activeTab === "roles" ? "default" : "outline"}
              onClick={() => setActiveTab("roles")}
            >
              Role Management
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <p>{error}</p>
          </Alert>
        )}

        {activeTab === "users" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Selection */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Select User</h2>
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedUser === user.id
                        ? "bg-blue-100 border-blue-300 border"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedUser(user.id)}
                  >
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Permission Management */}
            <div className="lg:col-span-2">
              {selectedUser ? (
                <Card className="p-4">
                  <h2 className="text-lg font-semibold mb-4">
                    Permissions for {users.find(u => u.id === selectedUser)?.name}
                  </h2>
                  
                  {loading && <p>Loading permissions...</p>}
                  
                  <div className="space-y-6">
                    {PERMISSION_CATEGORIES.map((category) => (
                      <div key={category.category}>
                        <h3 className="text-md font-medium text-gray-700 mb-3">
                          {category.category}
                        </h3>
                        <div className="space-y-2">
                          {category.permissions.map((permission) => {
                            const isGranted = isPermissionGranted(permission);
                            const isDenied = isPermissionDenied(permission);
                            const hasRole = hasRolePermission(permission);
                            const isEffective = effectivePermissions.includes(permission);
                            
                            return (
                              <div
                                key={permission}
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  isEffective ? "bg-green-50 border-green-200" : "bg-gray-50"
                                }`}
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{permission}</p>
                                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    {hasRole && (
                                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        Role
                                      </span>
                                    )}
                                    {isGranted && (
                                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                        Granted
                                      </span>
                                    )}
                                    {isDenied && (
                                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                        Denied
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant={isGranted ? "default" : "outline"}
                                    onClick={() => handlePermissionToggle(permission, isGranted)}
                                    disabled={loading}
                                  >
                                    {isGranted ? "Revoke" : "Grant"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={isDenied ? "destructive" : "outline"}
                                    onClick={() => handlePermissionDeny(permission)}
                                    disabled={loading}
                                  >
                                    {isDenied ? "Allow" : "Deny"}
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Select a user to manage their permissions</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Role-Based Permissions</h2>
            <p className="text-gray-600 mb-4">
              This section shows the default permissions for each role. Role permissions are managed through the system configuration.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries({
                Admin: ["users:create", "users:read", "users:update", "users:delete", "users:manage_roles", "projects:create", "projects:read", "projects:update", "projects:delete", "projects:assign_members", "milestones:create", "milestones:read", "milestones:update", "milestones:delete", "activity_logs:read", "activity_logs:manage", "system:admin", "system:settings"],
                "Lead Mentor": ["users:read", "users:update", "projects:create", "projects:read", "projects:update", "projects:assign_members", "milestones:create", "milestones:read", "milestones:update", "milestones:delete", "activity_logs:read"],
                "Project Mentor": ["users:read", "projects:read", "projects:update", "milestones:create", "milestones:read", "milestones:update", "milestones:delete", "activity_logs:read"],
                "External Partner": ["projects:read", "milestones:read", "activity_logs:read"],
                Student: ["projects:read", "milestones:read"]
              }).map(([role, permissions]) => (
                <Card key={role} className="p-4">
                  <h3 className="font-semibold text-lg mb-3">{role}</h3>
                  <div className="space-y-1">
                    {permissions.map((permission) => (
                      <div key={permission} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {permission}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </WithPermission>
  );
};
