import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { usePermissions, WithPermission } from "../../contexts/permission-context";

/**
 * Demo component showing how to use the permission system
 * This component demonstrates various permission patterns
 */
export const PermissionDemo: React.FC = () => {
  const { 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions, 
    userRole, 
    effectivePermissions 
  } = usePermissions();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Permission System Demo</h1>
      
      {/* User Info */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Current User Info</h2>
        <div className="space-y-2">
          <p><strong>Role:</strong> {userRole || "Not assigned"}</p>
          <p><strong>Total Permissions:</strong> {effectivePermissions.length}</p>
          <div>
            <strong>Effective Permissions:</strong>
            <div className="mt-2 flex flex-wrap gap-1">
              {effectivePermissions.map((permission) => (
                <span 
                  key={permission} 
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Permission Checks */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Permission Check Examples</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="w-48">Can create users:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              hasPermission("users:create") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {hasPermission("users:create") ? "Yes" : "No"}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-48">Can manage projects:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              hasAnyPermission(["projects:create", "projects:update", "projects:delete"]) 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {hasAnyPermission(["projects:create", "projects:update", "projects:delete"]) ? "Yes" : "No"}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-48">Can fully manage milestones:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              hasAllPermissions(["milestones:create", "milestones:read", "milestones:update", "milestones:delete"]) 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {hasAllPermissions(["milestones:create", "milestones:read", "milestones:update", "milestones:delete"]) ? "Yes" : "No"}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-48">Is system admin:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              hasPermission("system:admin") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {hasPermission("system:admin") ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </Card>

      {/* Conditional Rendering Examples */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Conditional Rendering Examples</h2>
        <div className="space-y-3">
          
          {/* Single permission check */}
          <WithPermission permission="users:create">
            <Button className="mr-2">Create User</Button>
          </WithPermission>
          
          {/* Multiple permissions (any) */}
          <WithPermission permission={["projects:create", "projects:update"]}>
            <Button variant="outline" className="mr-2">Manage Projects</Button>
          </WithPermission>
          
          {/* Multiple permissions (all required) */}
          <WithPermission 
            permission={["milestones:create", "milestones:delete"]} 
            requireAll={true}
          >
            <Button variant="destructive" className="mr-2">Full Milestone Control</Button>
          </WithPermission>
          
          {/* With fallback content */}
          <WithPermission 
            permission="system:admin"
            fallback={<span className="text-gray-500 italic">Admin access required</span>}
          >
            <Button variant="secondary">System Settings</Button>
          </WithPermission>
        </div>
      </Card>

      {/* Role-based Examples */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Role-based Content</h2>
        <div className="space-y-3">
          {userRole === "Admin" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800 font-semibold">Admin Panel</p>
              <p className="text-red-600 text-sm">You have full system access</p>
            </div>
          )}
          
          {userRole === "Lead Mentor" && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-800 font-semibold">Lead Mentor Dashboard</p>
              <p className="text-blue-600 text-sm">You can manage projects and mentor other users</p>
            </div>
          )}
          
          {userRole === "Project Mentor" && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800 font-semibold">Project Mentor Tools</p>
              <p className="text-green-600 text-sm">You can manage milestones and view project details</p>
            </div>
          )}
          
          {userRole === "Student" && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 font-semibold">Student View</p>
              <p className="text-yellow-600 text-sm">You can view your assigned projects and milestones</p>
            </div>
          )}
          
          {userRole === "External Partner" && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <p className="text-purple-800 font-semibold">Partner Portal</p>
              <p className="text-purple-600 text-sm">You can view project progress and milestones</p>
            </div>
          )}
        </div>
      </Card>

      {/* Permission Categories */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Permissions by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { category: "User Management", permissions: effectivePermissions.filter(p => p.startsWith("users:")) },
            { category: "Project Management", permissions: effectivePermissions.filter(p => p.startsWith("projects:")) },
            { category: "Milestones", permissions: effectivePermissions.filter(p => p.startsWith("milestones:")) },
            { category: "Activity Logs", permissions: effectivePermissions.filter(p => p.startsWith("activity_logs:")) },
            { category: "System", permissions: effectivePermissions.filter(p => p.startsWith("system:")) },
          ].map(({ category, permissions }) => (
            <div key={category} className="p-3 bg-gray-50 rounded">
              <h3 className="font-medium text-gray-800 mb-2">{category}</h3>
              {permissions.length > 0 ? (
                <div className="space-y-1">
                  {permissions.map((permission) => (
                    <div key={permission} className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                      {permission}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No permissions in this category</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

