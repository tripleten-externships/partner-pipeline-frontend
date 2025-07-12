import React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectItem } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "mentor" | "student";
  active: boolean;
  assignedProjectId?: string; //for students
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      // Simulate API call
      const mockUsers: User[] = [
        { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", active: true },
        { id: "2", name: "Bob Smith", email: "bob@example.com", role: "mentor", active: false },
        {
          id: "3",
          name: "Charlie Kim",
          email: "charlie@example.com",
          role: "student",
          active: true,
          assignedProjectId: "1",
        },
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

  const handleRoleChange = (id: string, role: User["role"], assignedProjectId: User["assignedProjectId"] ) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role, assignedProjectId: role === "student" ? assignedProjectId: "" } : user)));
  };

  // updated above function to adresses change from student role to prevent hanging assigned projectId 

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    );
  };

  const { currentUser } = useAuth({});

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white-800">User Management</h1>

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
            <div>
              <p className="font-medium text-lg text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-center space-x-4">
              {currentUser?.role === 'admin' ? (
  <Select
    value={user.role}
    onValueChange={(role) => handleRoleChange(user.id, role as User["role"], user.assignedProjectId ?? "" )}
  >
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="mentor">Mentor</SelectItem>
    <SelectItem value="student">Student</SelectItem>
  </Select>
) : (
  <p className="text-sm text-gray-500">{user.role}</p> // just displays the role for non-admins admins can move roles around
)}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Active</span>
                <Switch checked={user.active} onCheckedChange={() => toggleUserStatus(user.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
