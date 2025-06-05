import React, { useState } from 'react';

type UserRole = 'Partner' | 'Mentor' | 'Lead Mentor' | 'Designer' | 'Coordinator' | 'Student';
type UserStatus = 'Active' | 'Inactive';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  project: string;
  status: UserStatus;
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'Lead Mentor',
    project: 'Project Alpha',
    status: 'Active',
    lastLogin: '06-10-2023'
  }
];

export const UserManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);


  const filteredUsers = mockUsers.filter((user) => {
    return (
      (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.project.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === '' || user.role === roleFilter) &&
      (statusFilter === '' || user.status === statusFilter)
    );
  });

  const allSelected = filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.includes(user.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers(selectedUsers.filter(id => !filteredUsers.some(user => user.id === id)));
    } else {
      setSelectedUsers([
        ...selectedUsers,
        ...filteredUsers.filter(user => !selectedUsers.includes(user.id)).map(user => user.id)
      ]);
    }
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers(selectedUsers.includes(id)
      ? selectedUsers.filter(uid => uid !== id)
      : [...selectedUsers, id]);
  };

  return (
    <div className="bg-gray-100 p-6 max-w-7xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search and Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border rounded px-3 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="border rounded px-3 mr-8 py-2" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as UserRole)}>
          <option value="">All Roles</option>
          <option value="partner">Partner</option>
          <option value="mentor">Mentor</option>
          <option value="lead_mentor">Lead Mentor</option>
          <option value="designer">Designer</option>
          <option value="coordinator">Coordinator</option>
          <option value="student">Student</option>
        </select>
        <select className="border rounded px-3 mr-8 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as UserStatus)}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
                <th className="w-12 px-5 py-3 bg-gray-200 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all users"
                />
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project</th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Login</th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b">
                  <td className="w-12 px-5 py-5 text-sm text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    aria-label={`Select user ${user.name}`}
                  />
                </td>
                <td className="px-5 py-5 text-sm">{user.name}</td>
                <td className="px-5 py-5 text-sm">{user.email}</td>
                <td className="px-5 py-5 text-sm">{user.role}</td>
                <td className="px-5 py-5 text-sm">{user.project}</td>
                <td className="px-5 py-5 text-sm text-green-600 font-medium">{user.status}</td>
                <td className="px-5 py-5 text-sm">{user.lastLogin}</td>
                <td className="px-5 py-5 text-sm">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions and Add User */}
      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
                 <button
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={selectedUsers.length === 0}
          title="Activate"
        >
          Activate
        </button>
        <button
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          disabled={selectedUsers.length === 0}
          title="Deactivate"
        >
          Deactivate
        </button>
      </div>
    </div>
  );
};

export default UserManagementPage;