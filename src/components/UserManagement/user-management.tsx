import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions, WithPermission } from "@/contexts/permission-context";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Project Mentor" | "Lead Mentor" | "External Partner" | "Student";
  active: boolean;
  assignedProjectId?: string[]; // for students
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // Simulate API call
      const mockUsers: User[] = [
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", active: true },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Project Mentor", active: false },
        {
          id: "3",
          name: "Charlie Kim",
          email: "charlie@example.com",
          role: "Student",
          active: true,
          assignedProjectId: ["1"],
        },
        { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Lead Mentor", active: true },
        { id: "5", name: "Ethan Hunt", email: "ethan@example.com", role: "External Partner", active: true },
      ];
      setUsers(mockUsers);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = (
    id: string,
    role: User["role"],
    assignedProjectId: User["assignedProjectId"]
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              role,
              // if no longer Student, clear assignedProjectId
              assignedProjectId: role === "Student" ? assignedProjectId ?? [] : [],
            }
          : user
      )
    );
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    );
  };

  const { currentUser } = useAuth({});
  const { hasPermission } = usePermissions();

  return (
    <WithPermission permission="users:read">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <WithPermission permission="system:settings">
            <Button
              onClick={() => (window.location.href = "/admin/permissions")}
              variant="outline"
            >
              Permission Settings
            </Button>
          </WithPermission>
        </div>

        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300"
        />

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
            >
              <div className="flex-1">
                <p className="font-medium text-lg text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-blue-600 font-medium">{user.role}</p>
              </div>

              <div className="flex items-center space-x-4">
                <WithPermission permission="users:manage_roles" fallback={<span className="text-sm text-gray-500">{user.role}</span>}>
                  <Select
                    value={user.role}
                    onValueChange={(role) =>
                      handleRoleChange(user.id, role as User["role"], user.assignedProjectId ?? [])
                    }
                  >
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Lead Mentor">Lead Mentor</SelectItem>
                      <SelectItem value="Project Mentor">Project Mentor</SelectItem>
                      <SelectItem value="External Partner">External Partner</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </WithPermission>

                <WithPermission
                  permission="users:update"
                  fallback={<span className="text-sm text-gray-500">{user.active ? "Active" : "Inactive"}</span>}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Active</span>
                    <Switch
                      checked={user.active}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                      disabled={!hasPermission("users:update")}
                    />
                  </div>
                </WithPermission>

                <WithPermission permission="users:manage_roles">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedUser(user.id)}
                  >
                    Manage Permissions
                  </Button>
                </WithPermission>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </div>
    </WithPermission>
  );
}
